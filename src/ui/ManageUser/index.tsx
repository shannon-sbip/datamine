import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import Papa from "papaparse";
import { FC, useEffect, useState } from "react";
import { User } from "../../types/user";
import Button from "../Button";
import FormInputField from "../FormInputField";
import useFileReader from "../../hooks/useFileReader";
import handleFileUploadTypeConversion from "../../lib/handleFileUploadTypeConversion";
import handleUploadDataValidation from "../../lib/handleUploadDataValidation";
import postUserUpload from "../../lib/postUserUpload";
import { APP_PROFILE_VIEW, APP_VIEW_TYPE } from "../../constants";
import getAllUsersProfile from "../../lib/getAllUsersProfile";
type ManageUserProps = {
  seal: string
  setView: (view: APP_VIEW_TYPE) => void
}
const UPLOAD_FIELD_NAME = "user_upload";
const ManageUser: FC<ManageUserProps> = (props) => {
  const { seal, setView } = props;
  const fileReader = useFileReader();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Partial<User>[] | null>(null);
  const {
    handleSubmit, register, watch
  } = useForm();
  const handleFormFileUpload = (fields: FieldValues) => {
    setIsLoading(true);
    const file = fields[UPLOAD_FIELD_NAME][0];
    if (!fileReader || !file) {
      return;
    }
    fileReader.onload = async (fileReaderEvent: ProgressEvent<FileReader>) => {
      const csvOutput = fileReaderEvent?.target?.result;
      const { data: uploadData } = Papa.parse(String(csvOutput), { header: true });
      const usersFromFile = handleFileUploadTypeConversion(handleUploadDataValidation(uploadData));
      await postUserUpload(seal, usersFromFile);
      window.location.reload();
    };
    fileReader.readAsText(file);
  };
  const handleProfileNavigation = () => setView(APP_PROFILE_VIEW);
  useEffect(() => {
    if (!seal) {
      return;
    }
    (async () => {
      setUsers(await getAllUsersProfile(seal));
    })();
  }, [seal]);
  if (!users) {
    return <span>Loading ...</span>;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-[20px]">
      <span className="font-bold">User Management</span>
      <div className="flex flex-row justify-center items-center">
        <Button
          type="button"
          onClick={handleProfileNavigation}
        >
          My Profile
        </Button>
        <form onSubmit={handleSubmit(handleFormFileUpload)} className="flex flex-row justify-center items-center">
          <FormInputField
            name={UPLOAD_FIELD_NAME}
            type="file"
            accept=".csv"
            registerProps={register(UPLOAD_FIELD_NAME)}
          />
          <Button type="submit" disabled={isLoading || !watch(UPLOAD_FIELD_NAME)?.length}>Upload</Button>
        </form>
      </div>
      <div className="overflow-x-auto w-full max-w-7xl flex flex-col">
        <table className="table-auto border-separate border-spacing-2  border border-slate-400">
          <thead>
            <tr className="font-bold">
              <th className="border border-slate-300 px-1">EMAIL</th>
              <th className="border border-slate-300 px-1">NAME</th>
              <th className="border border-slate-300 px-1">AFFILATION</th>
              <th className="border border-slate-300 px-1">IS ADMIN</th>
              <th className="border border-slate-300 px-1">VALID FROM</th>
              <th className="border border-slate-300 px-1">VALID TO</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({
              email, name, affilation, isAdmin, validFrom, validTo
            }) => (
              <tr key={email}>
                <td className="border border-slate-300">{email}</td>
                <td className="border border-slate-300">{name}</td>
                <td className="border border-slate-300">{affilation}</td>
                <td className="border border-slate-300">{isAdmin ? "TRUE" : "FALSE"}</td>
                {validFrom && <td className="border border-slate-300">{(new Date(validFrom)).toISOString()}</td>}
                {validTo && <td className="border border-slate-300">{(new Date(validTo)).toISOString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUser;
