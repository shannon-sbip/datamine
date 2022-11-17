import { unsealData } from "iron-session";
const getUnsealedData = async (userSeal: string) => {
  const { email, eventId } = (
        await unsealData(userSeal, { password: process.env.SEAL_PASSWORD || "" }) || {}
      ) as { email: string, eventId: string};
  return { email, eventId };
};
export default getUnsealedData;
