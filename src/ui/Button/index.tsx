import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./index.module.css";
type ButtonProps = {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    disabled?: boolean
    children?: ReactNode
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
    className?: string
}
const Button: FC<ButtonProps> = (props) => {
  const {
    type = "button", disabled, onClick, className, children
  } = props;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
