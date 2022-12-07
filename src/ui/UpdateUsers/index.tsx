import { FieldValues, useForm } from "react-hook-form";
import Papa from "papaparse";
import { FC, useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import useFileReader from "../../hooks/useFileReader";
import handleFileUploadTypeConversion from "../../lib/handleFileUploadTypeConversion";
import handleUploadDataValidation from "../../lib/handleUploadDataValidation";
import postUserUpload from "../../lib/postUserUpload";
import { APP_MANAGE_USERS_VIEW, APP_VIEW_TYPE } from "../../constants";
import UpdateUsersForm from "../UpdateUsersForm";
type UpdateUsersProps = {
  seal: string
  setView: (view: APP_VIEW_TYPE) => void
}
const UPLOAD_FIELD_NAME = "user_upload";
const UpdateUsers: FC<UpdateUsersProps> = (props) => {
  const { seal, setView } = props;
  const fileReader = useFileReader();
  const [isLoading, setIsLoading] = useState(false);
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
  const handleProfileNavigation = () => setView(APP_MANAGE_USERS_VIEW);
  return (
    <div className="flex flex-col justify-center items-center mt-[20px]">
      <span className="font-bold">Update Users</span>
      <div className="flex flex-col justify-center items-center gap-5">
        <Button
          className="m-8"
          type="button"
          onClick={handleProfileNavigation}
        >
          Manage Users
        </Button>
        <div className="p-8 pt-4 border">
          <div>
            <span className="font-semibold">Bulk update</span>
          </div>
          <form
            onSubmit={handleSubmit(handleFormFileUpload)}
            className="flex flex-row flex-wrap justify-center items-center"
          >
            <FormInputField
              name={UPLOAD_FIELD_NAME}
              type="file"
              accept=".csv"
              registerProps={register(UPLOAD_FIELD_NAME)}
            />
            <Button type="submit" disabled={isLoading || !watch(UPLOAD_FIELD_NAME)?.length}>Upload</Button>
          </form>
          <div className="flex flex-col pb-4">
            <span className="font-semibold pt-8 pb-8">- OR -</span>
            <span className="font-semibold">Update Single User</span>
          </div>
          <UpdateUsersForm seal={seal} setView={setView} />
        </div>
      </div>
    </div>
  );
};
export default UpdateUsers;
