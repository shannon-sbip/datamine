import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  APP_MAGIC_LINK_VIEW,
  APP_INVALID_EMAIL_VIEW,
  APP_LOGIN_VIEW,
  APP_VIEW_TYPE
} from "../../constants";
import submitEmail from "../../lib/submitEmail";
import Button from "../Button";
import FormInputField from "../FormInputField";
import styles from "./index.module.css";
type LoginFormProps = {
    setView: (view: APP_VIEW_TYPE) => void
}
const LoginForm: FC<LoginFormProps> = (props) => {
  const { setView } = props;
  const {
    handleSubmit, register, watch
  } = useForm();
  const onSubmit = async (event: FieldValues) => {
    const response = await submitEmail(event.email);
    switch (response.status) {
      case 201:
        return setView(APP_MAGIC_LINK_VIEW);
      case 404:
        return setView(APP_INVALID_EMAIL_VIEW);
      default:
        return setView(APP_LOGIN_VIEW);
    }
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        name="email"
        type="email"
        label="Enter your email to recieve your magic link."
        placeholder="Email..."
        registerProps={register("email")}
      />
      <Button type="submit" disabled={!watch("email")}>Submit</Button>
    </form>
  );
};
export default LoginForm;
