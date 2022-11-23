import { FC } from "react";
import clsx from "clsx";
const LandingCallToAction: FC = () => (
  <section className="container mx-auto text-center py-6">
    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
      Download FoodSG-233 dataset
    </h1>
    <div className="w-full mb-4">
      <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
    </div>
    <p className="text-gray-100 mb-8 max-w-[480px] mx-auto">
      We incorporate 233 popular ready-to-eat Singaporean dishes from 13 main food groups and then crawl
      candidate images from different search engines. After curation and cleaning, we end up with 209,
      861 images as the FoodSG-233 dataset.
    </p>
    <button
      type="button"
      className={clsx(
        "mx-auto",
        "lg:mx-0",
        "hover:underline",
        "bg-white",
        "text-gray-800",
        "font-bold",
        "rounded-full",
        "my-6",
        "py-4",
        "px-8",
        "shadow-lg",
        "focus:outline-none",
        "focus:shadow-outline",
        "transform",
        "transition",
        "hover:scale-105",
        "duration-300",
        "ease-in-out"
      )}
    >
      Download now
    </button>
  </section>
);
export default LandingCallToAction;
