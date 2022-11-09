import { unsealData } from "iron-session";
const getUnsealedData = async (userSeal: string) => {
  const { userId, eventId } = (
        await unsealData(userSeal, { password: process.env.SEAL_PASSWORD || "" }) || {}
      ) as { userId: string, eventId: string};
  return { userId, eventId };
};
export default getUnsealedData;
