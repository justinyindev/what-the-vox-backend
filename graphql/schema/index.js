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

  type Comment {
    user: String!
    user_id: String!
    content: String!
    created_at: String!
  }
  
  type Headline {
    _id: ID!
    title: String!
    url: String!
    date: String!
    image: String!
    summary: String
    comments: [Comment]
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
    headlines(startDate: String, endDate: String, titles: [String], page: Int, limit: Int): HeadlinesResult!
    userInfo(userId: String): User
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    login(username: String!, password: String!): AuthData
    bookmark(title: String!): User
    createComment(headline: String!, userId: String!, content: String!, timestamp: String!): Headline
  }

  schema {
    query: RootQuery
    mutation: RootMutation
}
`);
