import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";
/* The following options are for Cookies. Currently the app is not using cookies, but may so in the future. */
export const IRON_OPTIONS = {
  cookieName: "datamine",
  password: process.env.SEAL_PASSWORD || "",
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV !== "development"
  }
};
/* AWS Constants */
const config = {
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.MY_AWS_DEFAULT_REGION || "",
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || ""
  },
  forcePathStyle: true
};
export const AWS_CLIENTS = {
  s3Client: new S3Client(config),
  sesClient: new SESClient(config)
};
export const DATASET_PARAMS = {
  Bucket: process.env.DATASET_BUCKET_NAME,
  Key: process.env.DATASET_NAME
};
