/* eslint-disable max-len */
const { execSync } = require("child_process");
const PROFILE = "foodsg";
const BUCKET_NAME = "foodsg233";
const DATASET_NAME = "foodsg-233.zip";
const UPLOAD_ID = "TM9bpgIZ3GbmXXnWtSQ1b7N_D7D49MDxU18mkSeOTYDY.7TJAJa8SPXtEP01VOvxQTiAQ3Y8oKxHRCvhFJtTSWPBBnnZY5ZTDyMX37LL2sn8SRfYLfb24l8F5BgbbBc5dH80M0_Ozf6z0gX.F.sQdw--";
try {
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 1 --body ${DATASET_NAME}.part-aa --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 2 --body ${DATASET_NAME}.part-ab --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 3 --body ${DATASET_NAME}.part-ac --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 4 --body ${DATASET_NAME}.part-ad --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 5 --body ${DATASET_NAME}.part-ae --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 6 --body ${DATASET_NAME}.part-af --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 7 --body ${DATASET_NAME}.part-ag --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 8 --body ${DATASET_NAME}.part-ah --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
  execSync(
    `aws --profile ${PROFILE} s3api upload-part --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --part-number 9 --body ${DATASET_NAME}.part-ai --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
} catch (e) {
  console.log(e);
}
