/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const { data } = require("../src/tests/data/userEvent.json");
const prisma = new PrismaClient();
const promises = data.map((datum) => prisma.userEvent.create({
  data: {
    ...datum,
    validFrom: new Date(datum.validFrom),
    validTo: new Date(datum.validTo)
  }
}));
const promiseChain = promises.slice(1).reduce((chain, promise) => chain.then(() => promise), promises[0]);
promiseChain
  .then(() => {
    console.log("Populated User Event table.");
  })
  .catch((error) => {
    console.error(error);
  });
