const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
    headlines(startDate: String, endDate: String, page: Int, limit: Int): HeadlinesResult!
  }

  type RootMutation {
    updateHeadline(id: ID!, title: String, url: String, date: String, image: String, summary: String): Headline
    deleteHeadline(id: ID!): Headline
  }

  schema {
    query: RootQuery
    mutation: RootMutation
}
`);
