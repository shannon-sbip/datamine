import { User } from "../types/user";
const getUserProfile = async (seal: string): Promise<User> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      seal
    })
  }) || {};
  const { data } = await response?.json() || {};
  return data;
};
export default getUserProfile;
