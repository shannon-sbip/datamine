import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { APP_MANAGE_USERS_VIEW, APP_VIEW_TYPE } from "../../constants";
import handleFileUploadTypeConversion from "../../lib/handleFileUploadTypeConversion";
import postUserUpload from "../../lib/postUserUpload";
import Button from "../Button";
import FormInputField from "../FormInputField";
const FORM_EMAIL = "email";
const FORM_NAME = "name";
const FORM_AFFILATION = "affilation";
const FORM_MAX_DOWNLOADS = "maxDownloadCount";
const FORM_VALID_FROM = "validFrom";
const FORM_VALID_TO = "validTo";
const FORM_IS_ACTIVE = "isActive";
const FORM_IS_ADMIN = "isAdmin";
const formFields = [
  {
    name: FORM_EMAIL,
    required: true,
    label: "Email",
    type: "email"
  },
  {
    name: FORM_NAME,
    required: true,
    label: "Name"
  },
  {
    name: FORM_AFFILATION,
    required: true,
    label: "Affilation"
  },
  {
    name: FORM_MAX_DOWNLOADS,
    required: true,
    label: "Max Downloads",
    ariaLabel: "Max Downloads",
    type: "number"
  },
  {
    name: FORM_VALID_FROM,
    required: true,
    label: "Valid From",
    ariaLabel: "Valid From",
    type: "datetime-local"
  },
  {
    name: FORM_VALID_TO,
    required: true,
    label: "Valid To",
    ariaLabel: "Valid To",
    type: "datetime-local"
  },
  {
    name: FORM_IS_ACTIVE,
    required: false,
    label: "Is Active",
    type: "checkbox"
  },
  {
    name: FORM_IS_ADMIN,
    required: false,
    label: "Is Admin",
    type: "checkbox"
  }
];
type UpdateUsersFormProps = {
  seal: string
  setView: (view: APP_VIEW_TYPE) => void
}
const UpdateUsersForm: FC<UpdateUsersFormProps> = (props) => {
  const { seal, setView } = props;
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid }
  } = useForm();
  const handleFormSubmit = async (fields: FieldValues) => {
    const userToUpload = handleFileUploadTypeConversion([{
      ...fields,
      validFrom: (new Date(fields[FORM_VALID_FROM])).getTime(),
      validTo: (new Date(fields[FORM_VALID_TO])).getTime()
    }]);
    await postUserUpload(seal, userToUpload);
    setView(APP_MANAGE_USERS_VIEW);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col justify-center items-center">
      <div className="flex flex-row flex-wrap max-w-[700px] justify-center items-center gap-5">
        {formFields.map(({
          name, label, type, required, ariaLabel
        }) => (
          <FormInputField
            key={name}
            name={name}
            label={label}
            ariaLabel={ariaLabel}
            type={type}
            registerProps={register(name, { required })}
          />
        ))}
      </div>
      <Button type="submit" disabled={isSubmitting || !isValid}>Update</Button>
    </form>
  );
};
export default UpdateUsersForm;
