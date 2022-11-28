/* eslint-disable max-len */
const { execSync } = require("child_process");
const PROFILE = "foodsg";
const EMAIL_SOURCE = "shannon@nus.edu.sg";
try {
  execSync(`aws --profile ${PROFILE} ses verify-email-identity --email-address ${EMAIL_SOURCE}`);
} catch (e) {
  console.log(e);
}
