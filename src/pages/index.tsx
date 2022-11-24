import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import clsx from "clsx";
import submitEmail from "../lib/submitEmail";
import Button from "../ui/Button";
import FormInputField from "../ui/FormInputField";
import LandingHero from "../ui/LandingHero";
import styles from "./index.module.css";
import LandingCallToAction from "../ui/LandingCallToAction";
import LandingBannerTop from "../ui/LandingBannerTop";
import LandingBannerBottom from "../ui/LandingBannerBottom";
import LandingSection from "../ui/LandingSection";
const APP_LOGIN_VIEW = "APP_LOGIN_VIEW";
const APP_MAGIC_LINK_VIEW = "APP_MAGIC_LINK_VIEW";
const APP_INVALID_EMAIL_VIEW = "APP_INVALID_EMAIL_VIEW";
const APP_PROFILE_VIEW = "APP_PROFILE_VIEW";
const APP_MANAGE_USERS_VIEW = "APP_MANAGE_USERS_VIEW";
type APP_VIEW =
  typeof APP_LOGIN_VIEW
  | typeof APP_MAGIC_LINK_VIEW
  | typeof APP_INVALID_EMAIL_VIEW
  | typeof APP_PROFILE_VIEW
  | typeof APP_MANAGE_USERS_VIEW
const Home = () => {
  const [view, setView] = useState<APP_VIEW>(APP_LOGIN_VIEW);
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
    <div
      className={clsx(styles.gradient, "leading-normal tracking-normal text-white overflow-x-hidden text-lg")}
    >
      <LandingHero />
      <LandingBannerTop />
      <LandingSection />
      <LandingBannerBottom />
      <LandingCallToAction />
      <div className={styles.container}>
        {(() => {
          switch (view) {
            case APP_MAGIC_LINK_VIEW:
              return <span>Your magic link has been sent to your inbox.</span>;
            case APP_INVALID_EMAIL_VIEW:
              return <span>The email you entered does not exist in our database.</span>;
            case APP_PROFILE_VIEW:
              return null;
            case APP_MANAGE_USERS_VIEW:
              return null;
            case APP_LOGIN_VIEW:
            default:
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
          }
        })()}
      </div>
    </div>
  );
};
export default Home;
