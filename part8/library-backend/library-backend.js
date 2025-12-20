const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ):Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre) {
        return await Book.find({ })
      }
      if(args.author && !args.genre) {
        return await Book.find({ author: args.author })
      }
      if(!args.author && args.genre) {
        return await Book.find({ genres: args.genre })
      }
      return await Book.find({ genres: args.genre, author: args.author })
    },
    allAuthors: async () => {
      return await Author.find({})
    },
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id})
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      requireAuth(context.currentUser)

      validateBookInput(args)

      let author = await Author.findOne({ name: args.author })
      if(!author){
        author = new Author({ name: args.author })
        try{
          await author.save()
        }catch(error){
          badUserInput('Creating author failed', args.author)
        }
      }

      const newBook = new Book({ ...args, author: author._id })
      try{
        await newBook.save()
      }catch(error){
        throw new GraphQLError('Creating book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          }
        }) 
      }
      return newBook
    },
    addAuthor: async(root, args) => {
      const newAuthor = new Author({ ...args })
      try{
        await newAuthor.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })  
      }
      return newAuthor
    },
    editAuthor: async (root, args, context) => {
      requireAuth(context.currentUser)
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }

      author.born = args.setBornTo
      
      try{
        return author.save()
      }catch(error){
        badUserInput('Updating author failed', args)
      }
    },
    createUser: async(root, args) => {
      const user = new User({ 
        username: args.username, 
        favoriteGenre: args.favoriteGenre, 
        passwordHash: await bcrypt.hash(args.password, 10) 
      })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            }
          })
        })
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)

      if(!(user && passwordCorrect)){
        throw new GraphQLError('Invalid username or password', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const requireAuth = (currentUser) => {
  if(!currentUser){
    throw new GraphQLError('Not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    })
  }
}

const validateBookInput = ({ title, author }) => {
  if(title.length < 2) {
    badUserInput('Title length must be at least 2 characters long', 'title')
  }
  if(author.length < 4) {
    badUserInput('Author name length must be at least 4 characters long', 'author')
  }
}

const badUserInput = (message, invalidArgs) => {
  throw new GraphQLError(message, {
    extensions: {
      code: 'BAD_USER_INPUT',
      invalidArgs: invalidArgs,
    }
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res}) => {
    const auth = req ? req.headers.authorization : null

    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = 
            await User.findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})