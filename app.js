const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Replay = require('./models/replay');
const User = require('./models/user');

const app = express();

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

      type User {
        _id: ID!
        email: String!
        password: String
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
      }

      type RootMutation {
        createReplay(replayInput: ReplayInput): Replay
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      replays: () =>
        Replay.find()
          .then(replays => replays.map(replay => ({ ...replay._doc })))
          .catch(err => {
            throw err;
          }),
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
          avgRating: args.replayInput.avgRating,
          submitter: '5c45be68faa221039006adc2'
        });
        let createdReplay;
        return replay
          .save()
          .then(result => {
            createdReplay = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById('5c45be68faa221039006adc2');
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.submittedReplay.push(replay);
            return user.save();
          })
          .then(result => createdReplay)
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args =>
        User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error('User exists already.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => ({ ...result._doc, password: null, _id: result.id }))
          .catch(err => {
            throw err;
          })
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
