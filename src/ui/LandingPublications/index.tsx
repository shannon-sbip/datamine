import { FC } from "react";
const publications = [
  {
    title: "eDental: Managing Your Dental Care in Diet Diaries",
    subtitle: "K. Zheng, T. Nguyen, C. Liu, C. E. Goh, B. C. Ooi. CIKM, 2022.",
    link: "https://dl.acm.org/doi/pdf/10.1145/3511808.3557215]"
  },
  {
    title: "Convolutional neural networks for food image recognition: An experimental study",
    subtitle: "Y. S. Ng, W. Xue, W. Wang, P. Qi. MADiMa, 2019.",
    link: "https://dl.acm.org/doi/abs/10.1145/3347448.3357168"
  },
  {
    title: "Resolving the Bias in Electronic Medical Records",
    subtitle: "K. Zheng, J. Gao, K. Y. Ngiam, B. C. Ooi and W. L. J. Yip. ACM KDD, 2017.",
    link: "https://dl.acm.org/doi/pdf/10.1145/3097983.3098149"
  },
  {
    title: "Capturing Feature-Level Irregularity in Disease Progression Modeling",
    subtitle: "K. Zheng, W. Wang, J. Gao, K. Y. Ngiam, B. C. Ooi and W. L. J. Yip. CIKM, 2017.",
    link: "https://dl.acm.org/doi/pdf/10.1145/3132847.3132944"
  }
];
const LandingPublications: FC = () => (
  <div className="flex flex-col w-full p-6 mt-6 justify-center items-center">
    <div className="text-3xl font-bold leading-none mb-3">
      Publications
    </div>
    <ul>
      {publications.map(({ title, subtitle, link }) => (
        <li key={title} className="pt-4 italic">
          <div>
            <div>
              {title}
              {" "}
              [
              <a href={link} className="underline">Link</a>
              ]
            </div>
            <div>
              {subtitle}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
export default LandingPublications;
