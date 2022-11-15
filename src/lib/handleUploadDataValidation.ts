import { isPlainObject } from "lodash";
import { PropertiesNeededForCreate, User } from "../types/user";
const handleUploadDataValidation = (uploadData: unknown[]): Record<string, unknown>[] => {
  const uploadErrors = uploadData.filter((user) => {
    const typedUser = user as User;
    const hasProperties = PropertiesNeededForCreate.reduce((acc, key) => acc && key in typedUser, true);
    if (
      !isPlainObject(user)
      || "__parsed_extra" in (user as {__parsed_extra: unknown[]})
      || Object.keys(user as Record<string, unknown>).length !== PropertiesNeededForCreate.length
      || !hasProperties
    ) {
      return true;
    }
    return false;
  });
  if (uploadErrors.length > 0) {
    return [];
  }
  return uploadData as Record<string, unknown>[];
};
export default handleUploadDataValidation;
