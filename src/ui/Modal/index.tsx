/* eslint-disable max-len */
import clsx from "clsx";
import { FC, ReactNode } from "react";
type ModalProps = {
    children: ReactNode
    onOutsideClick: () => void
}
const Modal: FC<ModalProps> = (props) => {
  const { children, onOutsideClick } = props;
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto text-black"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={clsx(
        "flex",
        "items-end",
        "justify-center",
        "min-h-screen",
        "px-4",
        "pt-4",
        "pb-20",
        "text-center",
        "sm:block",
        "sm:p-0"
      )}
      >
        <div
          className="absolute top-0 left-0 h-full w-full"
          role="presentation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onOutsideClick();
            }
          }}
          onClick={onOutsideClick}
        />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className={clsx(
          "relative",
          "inline-block",
          "px-4",
          "pt-5",
          "pb-4",
          "overflow-hidden",
          "text-left",
          "align-bottom",
          "transition-all",
          "transform",
          "bg-white",
          "rounded-lg",
          "shadow-xl",
          "rtl:text-right",
          "dark:bg-gray-900",
          "sm:my-8",
          "sm:align-middle",
          "sm:max-w-7xl",
          "sm:w-full",
          "sm:p-6"
        )}
        >
          <div>
            <div className="flex items-center justify-center">
              {/* Hero */}
            </div>
            <div className="mt-2 text-center">
              <h3
                className={clsx(
                  "text-lg",
                  "font-medium",
                  "leading-6",
                  "text-gray-800",
                  "capitalize",
                  "dark:text-white"
                )}
                id="modal-title"
              >
                {/* Title */}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {/* Content */}
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
