import { React } from 'react';
import PropTypes from 'prop-types';

function Notification({ message }) {
  return (
    <div
      className="absolute text-center right-0 translate-x-1/2 w-[200px] bg-blue-500 dark:bg-purple-900 text-white py-2 px-4 rounded"
    >
      {message}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
