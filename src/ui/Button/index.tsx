import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./index.module.css";
type ButtonProps = {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    disabled?: boolean
    children?: ReactNode
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
}
const Button: FC<ButtonProps> = (props) => {
  const {
    type = "button", disabled, onClick, children
  } = props;
  // eslint-disable-next-line react/button-has-type
  return <button type={type} className={styles.button} disabled={disabled} onClick={onClick}>{children}</button>;
};
export default Button;
