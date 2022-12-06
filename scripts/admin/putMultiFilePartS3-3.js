/* eslint-disable max-len */
const { execSync } = require("child_process");
const PROFILE = "foodsg";
const BUCKET_NAME = "foodsg233";
const DATASET_NAME = "foodsg-233.zip";
const PART_FILE = "file://partfiles.json";
const UPLOAD_ID = "TM9bpgIZ3GbmXXnWtSQ1b7N_D7D49MDxU18mkSeOTYDY.7TJAJa8SPXtEP01VOvxQTiAQ3Y8oKxHRCvhFJtTSWPBBnnZY5ZTDyMX37LL2sn8SRfYLfb24l8F5BgbbBc5dH80M0_Ozf6z0gX.F.sQdw--";
try {
  execSync(
    `aws --profile ${PROFILE} s3api complete-multipart-upload --multipart-upload ${PART_FILE} --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --upload-id ${UPLOAD_ID}`,
    { stdio: "inherit" }
  );
} catch (e) {
  console.log(e);
}
