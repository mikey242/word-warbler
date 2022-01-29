import classNames from 'classnames';
import { React } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Key({
  character, status, label, onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label ?? character}
      data-character={character}
      onClick={() => onClick(character)}
      className={
            classNames(
              status === 0 && 'bg-gray-300',
              status === 1 && 'bg-orange-400',
              status === 2 && 'bg-green-400',
              'key flex items-center justify-center cursor-pointer text-white mr-1 bg-gray-900 h-10 min-w-0 p-4 mb-1 rounded-md',
            )
}
    >
      <p className="select-none font-bold uppercase text-sm sm:text-xl">{character}</p>
    </button>
  );
}

Key.propTypes = {
  character: PropTypes.node.isRequired,
  status: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Key.defaultProps = {
  status: null,
  label: '',
};

export default Key;
