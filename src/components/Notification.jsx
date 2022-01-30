import { React } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Notification({ message, isShown }) {
  return (
    <div className={classNames(isShown ? 'visible' : 'invisible', 'relative')}>
      <div
        className="absolute text-center right-0 translate-x-1/2 min-w-max bg-blue-500 dark:bg-purple-900 text-white py-2 px-4 rounded"
      >
        {message}
      </div>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default Notification;
