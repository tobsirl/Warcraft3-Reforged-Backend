const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphQLHttp({
    schema: buildSchema(`
      type RootQuery {
        replays: [String!]!
      }

      type RootMutation {
        createReplay(name: String): String

      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      replays: () => ['Map', 'Ladder', 'Host'],
      createReplay: args => {
        const replayName = args.name;
        return replayName;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
