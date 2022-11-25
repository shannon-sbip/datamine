/* eslint-disable max-len */
import { FC } from "react";
import Image from "next/image";
import LandingFeaure from "../LandingFeature";
import LandingSectionItem from "../LandingSectionItem";
import Image1 from "../../assets/1.png";
import Image2 from "../../assets/2.png";
import Image3 from "../../assets/3.png";
const sectionContent = [
  {
    title: "Importance of food intake data",
    items: [
      "Large-scale food intake data plays a significant role in revealing the dietary information and knowledge of patients, posing a profound impact on humans’ health and well-being. For instance, long-term consumption of unhealthy foods increases the risk of developing diseases such as diabetes, hypertension, and hyperlipidemia.",
      "In this sense, such food data is an essential data source for facilitating different healthcare analytic applications such as disease diagnosis, chronic disease progression modeling, etc. Therefore, there is an increasing demand for food data for diet assessment and disease management, and further for well-being."
    ],
    node: <Image src={Image1} alt="1" />
  },
  {
    title: "Food(lg)",
    items: [
      "We build Food(lg) to calculate daily nutrient estimates with the journaled entries for achieving a well-balanced diet. Powered by a deep-learning framework, and based on standard nutritional guidelines, Food(lg) has been used successfully in Ng Teng Fong General Hospital to help patients with prediabetes. It can be downloaded on the APP Store [link: https://apps.apple.com/us/app/food-lg/id1213299378] or Google Play [link: https://play.google.com/store/apps/details?id=com.nusidmi.foodlg&hl=en_SG]. Alternatively, you can view on Desktop [link: https://foodlgweb.nusidmi.com/tabs/home]. Watch this video [link: https://www.youtube.com/watch?v=MHp-saJiP-0] of Food(lg) if you want to know more details."
    ],
    node: <iframe
      className="w-full h-full max-h-[277px]"
      src="https://www.youtube.com/embed/MHp-saJiP-0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />,
    opposite: true
  },
  {
    title: "Record & monitor with ease",
    items: [
      "Food(lg) provides a quick and easy way for recording dietary intake, daily and weekly reports of progress, as well as remote monitoring by healthcare professionals for timely and meaningful feedback."
    ],
    node: <Image src={Image2} alt="2" />
  },
  {
    title: "Healthy eating lifestyles",
    items: [
      "Food(lg) helps users to develop healthy eating lifestyles, with attracting functions, such as surfing food photos, reviewing eating habits, recording food, and planning healthy meals. For more details on Food(lg), please refer to Food(lg) website [link: http://foodlg.com/]."
    ],
    node: <Image src={Image3} alt="3" />,
    opposite: true
  }
];
const LandingSection: FC = () => (
  <section className="flex flex-col bg-white border-b p-8 justify-center items-center">
    <div className="max-w-[1080px]">
      {sectionContent.map(({
        title, items, node, opposite
      }) => <LandingSectionItem key={title} title={title} items={items} node={node} opposite={opposite} />)}
      <LandingFeaure />
    </div>
  </section>
);
export default LandingSection;
