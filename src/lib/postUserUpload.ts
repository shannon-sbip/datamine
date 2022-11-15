import { User } from "../types/user";
const postUserUpload = async (seal: string, users: User[]) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      seal,
      users
    })
  });
  return response;
};
export default postUserUpload;
