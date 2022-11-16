import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_CLIENTS, DATASET_PARAMS } from "../config";
const getS3Url = async () => {
  const { s3Client } = AWS_CLIENTS;
  const { Bucket, Key } = DATASET_PARAMS;
  const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket, Key }), {
    expiresIn: 3
  });
  return signedUrl;
};
export default getS3Url;
