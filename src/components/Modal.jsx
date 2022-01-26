import { Button } from "./Button";
import { useEffect } from "react";

const Modal = ({ header, body, buttonLabel, onClickButton }) => {

  // Focus dismiss button on modal display.
  useEffect(() => {
    document.getElementById("modal").querySelector("button").focus()
  });

  return (
    <>
      <div id="modal" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="text-blueGray-500 dark:text-gray-300 border-0 shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-center p-5 border-b border-solid border-gray-300 dark:border-gray-600 rounded-t">
              <h3 className="text-3xl font-semibold">{header}</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-lg leading-relaxed">
                {body}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 dark:border-gray-600 rounded-b">
              <Button
                tabindex="0"
                label={buttonLabel}
                onClick={onClickButton}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export { Modal };
