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
const Home = () => {
  const [magicLinkRequestStatusCode, setMagicLinkRequestStatusCode] = useState<number | null>(null);
  const {
    handleSubmit, register, watch
  } = useForm();
  const onSubmit = async (event: FieldValues) => {
    const response = await submitEmail(event.email);
    setMagicLinkRequestStatusCode(response.status);
  };
  return (
    <div
      className={clsx(styles.gradient, "leading-normal tracking-normal text-white overflow-x-hidden")}
    >
      <LandingHero />
      <LandingBannerTop />
      <LandingSection />
      <LandingBannerBottom />
      <LandingCallToAction />
      <div className={styles.container}>
        {(() => {
          switch (magicLinkRequestStatusCode) {
            case 201:
              return <span>Your magic link has been sent to your inbox.</span>;
            case 404:
              return <span>The email you entered does not exist in our database.</span>;
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
