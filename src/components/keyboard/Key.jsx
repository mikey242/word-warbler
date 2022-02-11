import classNames from 'classnames';
import { React } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Key({
  character, incorrect, label, onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label ?? character}
      data-character={character}
      onClick={() => onClick(character)}
      className={
            classNames(
              incorrect ? 'dark:bg-gray-600 dark:text-white bg-gray-300 text-gray-600' : 'bg-gray-900',
              'key flex items-center justify-center cursor-pointer text-white mr-1 h-10 min-w-0 p-3 xs:p-4 mb-1 rounded-md',
            )
}
    >
      <p className="select-none font-bold uppercase text-xs xs:text-xl">{character}</p>
    </button>
  );
}

Key.propTypes = {
  character: PropTypes.node.isRequired,
  incorrect: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Key.defaultProps = {
  incorrect: false,
  label: '',
};

export default Key;
