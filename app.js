const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const replays = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphQLHttp({
    schema: buildSchema(`
      type Replay {
        _id: ID!
        title: String!
        team1: String!
        team2: String!
        realeaseDate: String!
        map: String!
        category: String
        tournament: String
        gameLength: Float
        version: String
        downloads: Float
        winner: String
        avgRating: Float
      }

      input ReplayInput {
        title: String!
        team1: String!
        team2: String!
        realeaseDate: String!
        map: String!
        category: String
        tournament: String
        gameLength: Float
        version: String
        downloads: Float
        winner: String
        avgRating: Float
      }

      type RootQuery {
        replays: [Replay!]!
      }

      type RootMutation {
        createReplay(replayInput: ReplayInput): Replay

      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      replays: () => replays,

      createReplay: args => {
        const replay = {
          _id: Math.random().toString(),
          title: args.replayInput.title,
          team1: args.replayInput.team1,
          team2: args.replayInput.team2,
          realeaseDate: args.replayInput.date,
          map: args.replayInput.map,
          category: args.replayInput.category,
          tournament: args.replayInput.tournament,
          gameLength: args.replayInput.gameLength,
          version: args.replayInput.version,
          downloads: args.replayInput.downloads,
          winner: args.replayInput.winner,
          avgRating: args.replayInput.avgRating
        };
        replays.push(replay);
        return replay;
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@projects-rmvjp.gcp.mongodb.net/test?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
    console.log(`Connected to MongoDB + Server Started`);
  })
  .catch(err => {
    console.log(err);
  });
