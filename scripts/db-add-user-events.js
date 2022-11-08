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
Promise.all(promises)
  .then(() => {
    console.log("Populated User Event table.");
  })
  .catch((error) => {
    console.error(error);
  });
