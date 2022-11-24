const getAllUsersProfile = async (seal: string) => {
  const endpoint = new URL(`${
    process.env.NEXT_PUBLIC_APP_URL
  }/api/v1/user?${new URLSearchParams({
    all: String(true)
  })}`);
  const response = await fetch(endpoint, {
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
export default getAllUsersProfile;
