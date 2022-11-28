/* eslint-disable max-len */
const { execSync } = require("child_process");
const PROFILE = "foodsg";
const BUCKET_NAME = "foodsg233";
const DATASET_NAME = "foodsg-233.zip";
try {
  execSync(`aws --profile ${PROFILE} s3api create-bucket --bucket ${BUCKET_NAME} --create-bucket-configuration LocationConstraint=ap-southeast-1`);
  execSync(`aws --profile ${PROFILE} s3api put-object --bucket ${BUCKET_NAME} --key ${DATASET_NAME} --body ./scripts/${DATASET_NAME}`);
  execSync(`aws --profile ${PROFILE} s3api put-bucket-cors --bucket ${BUCKET_NAME} --cors-configuration "{\\"CORSRules\\":[{\\"AllowedOrigins\\":[\\"https://datam1ne.vercel.app/\\",\\"https://datam2ne.vercel.app/\\",\\"https://datam3ne.vercel.app/\\"],\\"AllowedMethods\\":[\\"GET\\"]}]}"`);
} catch (e) {
  console.log(e);
}
