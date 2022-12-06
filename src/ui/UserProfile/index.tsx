import { FC, useEffect, useState } from "react";
import type { User } from "../../types/user";
import Button from "../Button";
import getDatasetUrl from "../../lib/getDatasetUrl";
import getUserProfile from "../../lib/getUserProfile";
import { APP_MANAGE_USERS_VIEW, APP_VIEW_TYPE } from "../../constants";
type UserProfileProps = {
  seal: string
  setView: (view: APP_VIEW_TYPE) => void
}
const UserProfile: FC<UserProfileProps> = (props) => {
  const { seal, setView } = props;
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [userProfile, setUserProfile] = useState<User | null | undefined>(null);
  useEffect(() => {
    if (!seal) {
      return;
    }
    (async () => {
      setUserProfile(await getUserProfile(seal));
    })();
  }, [seal, downloadUrl]);
  if (userProfile === undefined) {
    return (
      <div>
        This link is no longer valid, please generate a new Magic Link.
      </div>
    );
  }
  if (userProfile === null) {
    return <span>Loading...</span>;
  }
  const {
    email,
    name,
    affilation,
    downloadCount,
    maxDownloadCount,
    validFrom,
    validTo,
    isAdmin
  } = userProfile;
  const handleDownloadDataset = async () => {
    if (!seal) {
      return;
    }
    setDownloadLoading(true);
    const url = await getDatasetUrl(seal);
    setDownloadUrl(url);
  };
  const handleManageUsersNavigation = () => setView(APP_MANAGE_USERS_VIEW);
  return (
    <div className="flex flex-col justify-center items-center mt-[20px]">
      <span className="font-bold mb-5">
        Welcome
        {" "}
        {name.toUpperCase()}
        !
      </span>
      <table className="mb-5">
        <tbody>
          <tr>
            <td>Email: </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Affilation: </td>
            <td>{affilation}</td>
          </tr>
          <tr>
            <td>Downloads: </td>
            <td>{downloadCount}</td>
          </tr>
          <tr>
            <td>Max Download Count: </td>
            <td>{maxDownloadCount}</td>
          </tr>
          <tr>
            <td>Valid From: </td>
            <td>{(new Date(validFrom)).toISOString()}</td>
          </tr>
          <tr>
            <td>Valid To: </td>
            <td>{(new Date(validTo)).toISOString()}</td>
          </tr>
          <tr>
            <td>Is Admin: </td>
            <td>{isAdmin ? "TRUE" : "FALSE"}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row justify-between">
        {!downloadUrl && (
        <Button
          type="button"
          onClick={handleDownloadDataset}
          disabled={downloadLoading || downloadCount >= maxDownloadCount}
          className="m-2"
        >
          Get Dataset Url
        </Button>
        )}
        {downloadUrl && (
        <Button
          type="button"
          className="m-2"
        >
          <a href={downloadUrl}>Download Now</a>
        </Button>
        )}
        {isAdmin && (
        <Button
          type="button"
          className="m-2"
          onClick={handleManageUsersNavigation}
        >
          Manage Users
        </Button>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
