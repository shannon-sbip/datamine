const getDatasetUrl = async (seal: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/dataset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      seal
    })
  }) || {};
  const { data } = await response?.json() || {};
  const { url } = data || {};
  return url;
};
export default getDatasetUrl;
