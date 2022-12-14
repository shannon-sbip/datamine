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
  APP_MANAGE_USERS_VIEW,
  APP_UPDATE_USERS_VIEW
} from "../constants";
import LoginForm from "../ui/LoginForm";
import ManageUser from "../ui/ManageUser";
import Modal from "../ui/Modal";
import LandingPublications from "../ui/LandingPublications";
import UpdateUsers from "../ui/UpdateUsers";
const Home = () => {
  const router = useRouter();
  const [view, setView] = useState<APP_VIEW_TYPE>(APP_LOGIN_VIEW);
  const [seal, setSeal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  useEffect(() => {
    if (!router.query.seal) {
      return;
    }
    setSeal(String(router.query.seal || ""));
    setView(APP_PROFILE_VIEW);
    setShowModal(true);
  }, [router.query.seal]);
  return (
    <div
      className={clsx(styles.gradient, "leading-normal tracking-normal text-white overflow-x-hidden text-lg")}
    >
      <LandingHero openModal={handleModalOpen} />
      <LandingBannerTop />
      <LandingSection />
      <LandingBannerBottom />
      <LandingCallToAction openModal={handleModalOpen} />
      <LandingPublications />
      {showModal && (
      <Modal onOutsideClick={handleModalClose}>
        <div className={styles.container}>
          {view && {
            [APP_MAGIC_LINK_VIEW]: (
              <span>
                Your magic link has been sent to your inbox, by
                {" "}
                <span className="font-bold underline">
                  {process.env.NEXT_PUBLIC_EMAIL_SOURCE}
                </span>
                .
              </span>
            ),
            [APP_INVALID_EMAIL_VIEW]: <span>The email you entered does not exist in our database.</span>,
            [APP_PROFILE_VIEW]: <UserProfile seal={seal} setView={setView} />,
            [APP_MANAGE_USERS_VIEW]: <ManageUser seal={seal} setView={setView} />,
            [APP_UPDATE_USERS_VIEW]: <UpdateUsers seal={seal} setView={setView} />,
            [APP_LOGIN_VIEW]: <LoginForm setView={setView} />
          }[view]}
        </div>
      </Modal>
      )}
    </div>
  );
};
export default Home;
