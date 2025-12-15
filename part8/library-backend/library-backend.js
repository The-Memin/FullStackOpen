const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')

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

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'Demons',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    addBook: async (root, args) => {
      if(args.title.length < 2){
        throw new GraphQLError('Title length must be at least 2 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          }
        })
      }
  
      if(args.author.length < 4){
        throw new GraphQLError('Author name length must be at least 4 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if(!author){
        author = new Author({ name: args.author })
        try{
          await author.save()
        }catch(error){
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            }
          })
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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }

      author.born = args.setBornTo
      
      try{
        return author.save()
      }catch(error){
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          }
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})