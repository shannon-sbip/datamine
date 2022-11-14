import Head from "next/head";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import submitEmail from "../lib/submitEmail";
import Button from "../ui/Button";
import FormInputField from "../ui/FormInputField";
import styles from "./index.module.css";
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
    <div className={styles.container}>
      <Head>
        <title>Datamine</title>
        <meta name="description" content="Distributing datasets through magic links." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  );
};
export default Home;
