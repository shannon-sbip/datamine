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
    <>
      <div className="border p-8 pt-4 text-left">
        <div className="font-bold">Terms of access</div>
        <ul className="list-decimal">
          <li>
            Researcher shall register for dataset application.
          </li>
          <li>
            Researcher shall only use the dataset for non-commercial research and educational purposes.
          </li>
          <li>
            Researcher is not permitted to distribute copies of the dataset or grant access
            to the datasets to any other parties.
          </li>
          <li>
            Access to the dataset will only be granted on an individual basis.
            Each researcher working on a scientific project and/or publication using the dataset
            must submit a separate application.
          </li>
        </ul>
        <div className="font-bold pt-4">Citation</div>
        <div>Kindly cite the following paper if you use the dataset:</div>
        <ul className="list-none italic pt-2">
          <li>
            A Dietary Nutrition-aided Healthcare Platform via Effective Food Recognition on a
            Localized Singaporean Food Dataset
          </li>
          <li>
            Kaiping Zheng, Thao Nguyen, Jesslyn Hwei Sing Chong, Charlene Enhui Goh, Melanie Herschel,
            Hee Hoon Lee, Beng Chin Ooi, Wei Wang, James Yip
          </li>
        </ul>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          name="email"
          type="email"
          label="If you are already registered, enter your email to recieve your magic link."
          placeholder="Email..."
          registerProps={register("email")}
        />
        <Button type="submit" disabled={!watch("email")}>Submit</Button>
      </form>
    </>
  );
};
export default LoginForm;
