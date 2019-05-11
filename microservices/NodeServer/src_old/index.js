"use strict";

// Change this to "import Hapi from "hapi""
const Hapi = require("hapi");

const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi")

const schema = require('./graphql/schema')

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8005
});

// Start the server
const start = async function () {
  try {

    await server.register({
      plugin: graphiqlHapi,
      options: {
        path: '/ordersiql',
        graphiqlOptions: {
          endpointURL: '/orders'
        },
        route: {
          cors: true
        }
      }
    })

    await server.register({
      plugin: graphqlHapi,
      options: {
        path: '/orders',
        graphqlOptions: { schema },
        route: { cors: true }
      }
    })

    console.log("Starting server...");
    await server.start();
  } catch (err) {

    await connection.end();
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at: ", server.info.uri);
};

start();
