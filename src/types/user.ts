export type User = {
    email: string
    name: string
    affilation: string
    downloadCount: number
    maxDownloadCount: number
    validFrom: number
    validTo: number
    isActive?: boolean | null
    isAdmin?: boolean | null
};
export const PropertiesNeededForCreate = [
  "name",
  "email",
  "affilation",
  "maxDownloadCount",
  "validFrom",
  "validTo",
  "isActive",
  "isAdmin"
];
