const fs = require("fs");
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedVersion = packageJsonProps.version
  .split(".")
  .slice(0, 2)
  .concat(Date.now())
  .toString()
  .replaceAll(",", ".");
const updatedPackageJsonProps = {
  ...packageJsonProps,
  version: updatedVersion
};
fs.writeFileSync("package.json", JSON.stringify(updatedPackageJsonProps, null, 2));
