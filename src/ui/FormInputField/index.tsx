import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.css";
const FormInputField = (props: {
    name: string,
    label?: string,
    ariaLabel?: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    accept?: string,
    registerProps: UseFormRegisterReturn
  }) => {
  const {
    name, label, ariaLabel, placeholder, registerProps, type, accept
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
    <div>
      <label htmlFor={name} className={styles.field}>
        {label}
        <input
          id={name}
          type={type}
          aria-label={ariaLabel}
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
          accept={accept}
        />
      </label>
    </div>
  );
};
export default FormInputField;
