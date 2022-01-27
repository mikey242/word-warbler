import { React } from 'react';
import PropTypes from 'prop-types';

function Button({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 dark:bg-purple-900 focus:ring-2 focus:ring-blue-300 dark:focus:ring-purple-600 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
