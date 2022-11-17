import { SendEmailCommand } from "@aws-sdk/client-ses";
import { AWS_CLIENTS } from "../config";
const sendEmailCommand = (toAddress: string, subject: string, body: string) => new SendEmailCommand({
  Destination: {
    CcAddresses: [],
    ToAddresses: [
      toAddress
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: body
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: subject
    }
  },
  Source: "datam1ne@outlook.com",
  ReplyToAddresses: []
});
type PostEmailArgs = {
  email: string
  subject: string
  body: string
}
const postEmail = async (args: PostEmailArgs) => {
  const { email, subject, body } = args;
  const { sesClient } = AWS_CLIENTS;
  return sesClient.send(sendEmailCommand(email, subject, body));
};
export default postEmail;
