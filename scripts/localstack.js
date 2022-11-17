/* This is script is only used for local development */
const { execSync } = require("child_process");
try {
  execSync("pip install awscli");
  execSync("pip install awscli-local");
  execSync(`awslocal s3api create-bucket --bucket ${process.env.DATASET_BUCKET_NAME}`);
  // eslint-disable-next-line max-len
  execSync(`awslocal s3api put-object --bucket ${process.env.DATASET_BUCKET_NAME} --key ${process.env.DATASET_NAME} --body ./scripts/${process.env.DATASET_NAME}`);
  // eslint-disable-next-line max-len
  execSync(`awslocal s3api put-bucket-cors --bucket ${process.env.DATASET_BUCKET_NAME} --cors-configuration "{\\"CORSRules\\":[{\\"AllowedOrigins\\":[\\"${process.env.NEXT_PUBLIC_APP_URL}\\"],\\"AllowedMethods\\":[\\"GET\\",\\"PUT\\"]}]}"`);
  execSync(`awslocal ses verify-email-identity --email-address ${process.env.EMAIL_SOURCE}`);
} catch (e) {
  console.log(e);
}
