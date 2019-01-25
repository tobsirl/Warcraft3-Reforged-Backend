const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Upload {
  _id: ID!
  replay: Replay!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Replay {
  _id: ID!
  title: String!
  team1: String!
  team2: String!
  releaseDate: String!
  map: String!
  category: String
  tournament: String
  gameLength: Float
  version: String
  downloads: Float
  winner: String
  avgRating: Float
  submitter: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  submittedReplay: [Replay!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input ReplayInput {
  title: String!
  team1: String!
  team2: String!
  releaseDate: String!
  map: String!
  category: String
  tournament: String
  gameLength: Float
  version: String
  downloads: Float
  winner: String
  avgRating: Float
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
  replays: [Replay!]!
  uploads: [Upload!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createReplay(replayInput: ReplayInput): Replay
  createUser(userInput: UserInput): User
  uploadReplay(replayId: ID!): Upload!
  deleteUpload(uploadId: ID!): Replay!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
