const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    user_id: String!
    username: String!
    password: String
    bookmarks: [String]
  }

  type AuthData {
    user_id: String!
    token: String!
    tokenExpiration: Int!
    username: String
    bookmarks: [String]
  }

  input UserInput {
    username: String!
    password: String!
  }
  
  type Headline {
    _id: ID!
    title: String!
    url: String!
    date: String!
    image: String!
    summary: String
  }

  type PageInfo {
    currentPage: Int!
    totalPages: Int!
  }

  type HeadlinesResult {
    headlines: [Headline!]!
    pageInfo: PageInfo
  }

  type RootQuery {
    headlines(startDate: String, endDate: String, bookmarks: [String], page: Int, limit: Int): HeadlinesResult!
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    login(username: String!, password: String!): AuthData
    bookmark(title: String!): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
}
`);
