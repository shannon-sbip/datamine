/* eslint-disable max-len */
const { execSync } = require("child_process");
const PROFILE = "foodsg";
const BUCKET_NAME = "foodsg233";
const DATASET_NAME = "foodsg-233.zip";
/* How to get Metadata */
// execSync(
//   `openssl md5 -binary ${DATASET_NAME} | base64`,
//   { stdio: "inherit" }
// );
const METADATA = "etkcMt8mXou4TgL0YqhWZg==";
try {
  execSync(
    `split -b 4096m ${DATASET_NAME} ${DATASET_NAME}.part-`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api create-multipart-upload --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --metadata md5=${METADATA}`,
    { stdio: "inherit" }
  );
} catch (e) {
  console.log(e);
}
