import { User } from "../types/user";
const handleFileUploadTypeConversion = (usersToUpload: Record<string, unknown>[]) => usersToUpload.map((user) => ({
  email: user.email as string,
  name: user.name as string,
  affilation: user.affilation as string,
  maxDownloadCount: Number.isNaN(Number(user.maxDownloadCount)) ? 0 : Number(user.maxDownloadCount),
  validFrom: Number(user.validFrom),
  validTo: Number(user.validTo),
  isActive: String(user.isActive).toLowerCase() === "true",
  isAdmin: String(user.isAdmin).toLowerCase() === "true"
}) as User);
export default handleFileUploadTypeConversion;
