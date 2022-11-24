import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import LandingHero from "../ui/LandingHero";
import styles from "./index.module.css";
import LandingCallToAction from "../ui/LandingCallToAction";
import LandingBannerTop from "../ui/LandingBannerTop";
import LandingBannerBottom from "../ui/LandingBannerBottom";
import LandingSection from "../ui/LandingSection";
import UserProfile from "../ui/UserProfile";
import {
  APP_VIEW_TYPE,
  APP_LOGIN_VIEW,
  APP_MAGIC_LINK_VIEW,
  APP_INVALID_EMAIL_VIEW,
  APP_PROFILE_VIEW,
  APP_MANAGE_USERS_VIEW
} from "../constants";
import LoginForm from "../ui/LoginForm";
import ManageUser from "../ui/ManageUser";
const Home = () => {
  const router = useRouter();
  const [view, setView] = useState<APP_VIEW_TYPE>(APP_LOGIN_VIEW);
  const [seal, setSeal] = useState("");
  useEffect(() => {
    if (!router.query.seal) {
      return;
    }
    setSeal(String(router.query.seal || ""));
    setView(APP_PROFILE_VIEW);
  }, [router.query.seal]);
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
              return <UserProfile seal={seal} setView={setView} />;
            case APP_MANAGE_USERS_VIEW:
              return <ManageUser seal={seal} setView={setView} />;
            case APP_LOGIN_VIEW:
              return <LoginForm setView={setView} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};
export default Home;
