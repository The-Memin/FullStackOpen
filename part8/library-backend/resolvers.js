const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre) {
        return await Book.find({ })
      }
      if(args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        if(!author) {
          return []
        }
        return await Book.find({ author: author._id })
      }
      if(!args.author && args.genre) {
        return await Book.find({ genres: args.genre })
      }
      return await Book.find({ genres: args.genre, author: args.author })
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.flatMap(book => book.genres)
      return [...new Set(genres)]
    },
    me: (root, args, context) => {
      return context.currentUser
    }
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

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

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
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
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

module.exports = resolvers