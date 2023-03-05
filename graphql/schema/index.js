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

  type RootQuery {
    headlines(startDate: String, endDate: String): [Headline!]!
    summary(title: String, url: String): Headline!
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
