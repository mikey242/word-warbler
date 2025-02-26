import { useEffect, React } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

function Modal({
  header, children, buttonLabel, handleClose, isOpen,
}) {
  // Focus dismiss button on modal display.
  useEffect(() => {
    document.getElementById('modal')?.querySelector('button')?.focus();
  });

  return (
    <div className={isOpen ? 'fixed' : 'hidden'}>
      <div
        id="modal"
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto mx-auto max-w-3xl">
          {/* content */}
          <div className="p-2 xs:p-4 text-blueGray-500 dark:text-gray-300 border-0 shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
            {/* header */}
            <div className="flex justify-center p-3 xs:p-5 border-b border-solid border-gray-300 dark:border-gray-600 rounded-t">
              <h3 className="text-3xl font-semibold">{header}</h3>
            </div>
            {/* body */}
            <div className="relative p-4 xs:p-6 flex-auto">
              <div className="my-4 text-sm xs:text-lg leading-relaxed">{children}</div>
            </div>
            {/* footer */}
            {buttonLabel && (
              <div className="flex items-center justify-center p-4 xs:p-5 border-t border-solid border-gray-300 dark:border-gray-600 rounded-b">
                <Button
                  tabindex="0"
                  label={buttonLabel}
                  onClick={handleClose}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black" />
    </div>
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  buttonLabel: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  header: '',
  children: '',
  buttonLabel: '',
  isOpen: false,
};

export default Modal;
