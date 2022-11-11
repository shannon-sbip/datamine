/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fetch = (...args) => import("node-fetch").then(({ default: defaultFetch }) => defaultFetch(...args));
const userEvents = require("../src/tests/data/userEvent.json");
const adminUser = userEvents.data[0];
fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: adminUser.email
  })
}).then((response) => console.log("Status Code: ", response.status));
