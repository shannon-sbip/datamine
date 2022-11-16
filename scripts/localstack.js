const { execSync } = require("child_process");
execSync("pip install awscli");
execSync("pip install awscli-local");
execSync(`awslocal s3api create-bucket --bucket ${process.env.DATASET_BUCKET_NAME}`);
if (process.env.NODE_ENV !== "production") {
  /* For production environments, the datasets are uploaded in an out-of-band manner. */
  // eslint-disable-next-line max-len
  execSync(`awslocal s3api put-object --bucket ${process.env.DATASET_BUCKET_NAME} --key ${process.env.DATASET_NAME} --body ./scripts/${process.env.DATASET_NAME}`);
}
// eslint-disable-next-line max-len
execSync(`awslocal s3api put-bucket-cors --bucket ${process.env.DATASET_BUCKET_NAME} --cors-configuration "{\\"CORSRules\\":[{\\"AllowedOrigins\\":[\\"${process.env.NEXT_PUBLIC_APP_URL}\\"],\\"AllowedMethods\\":[\\"GET\\",\\"PUT\\"]}]}"`);
