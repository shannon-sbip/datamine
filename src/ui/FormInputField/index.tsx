import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.css";
const FormInputField = (props: {
    name: string,
    label: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    registerProps: UseFormRegisterReturn
  }) => {
  const {
    name, label, placeholder, registerProps, type
  } = props;
  const {
    ref,
    onChange,
    onBlur,
    name: formName,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
    disabled
  } = registerProps;
  return (
    <label htmlFor={name} className={styles.field}>
      {label}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={formName}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
export default FormInputField;
