const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Replay = require('./models/replay');

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
        const replay = new Replay({
          title: args.replayInput.title,
          team1: args.replayInput.team1,
          team2: args.replayInput.team2,
          releaseDate: new Date(args.replayInput.releaseDate),
          map: args.replayInput.map,
          category: args.replayInput.category,
          tournament: args.replayInput.tournament,
          gameLength: args.replayInput.gameLength,
          version: args.replayInput.version,
          downloads: args.replayInput.downloads,
          winner: args.replayInput.winner,
          avgRating: args.replayInput.avgRating
        });
        return replay
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@projects-rmvjp.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
    console.log(`Connected to MongoDB + Server Started`);
  })
  .catch(err => {
    console.log(err);
  });
