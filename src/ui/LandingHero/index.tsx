import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import Flora10 from "../../assets/flora-10.svg";
type LandingHeroProps = {
  openModal: () => void
}
const LandingHero: FC<LandingHeroProps> = (props) => {
  const { openModal } = props;
  return (
    <div className="">
      <div className="container px-5 pt-8 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 px-8 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Food(lg) for food intake monitoring and disease management
          </h1>
          <button
            type="button"
            onClick={() => openModal()}
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
            Request access to the dataset
          </button>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <Image src={Flora10} alt="flora-10" className="mx-auto" priority />
        </div>
      </div>
    </div>
  );
};
export default LandingHero;
