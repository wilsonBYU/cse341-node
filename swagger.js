const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE341 Contacts API - Wilson Romero"
  }
}

const outputFile= `./swaggerfiles/swagger-${process.argv[2]}.json`
const routes = [`./src/routes/${process.argv[2]}.js`]

swaggerAutogen(outputFile, routes, doc)