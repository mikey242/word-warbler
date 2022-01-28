import classNames from 'classnames';
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TIMING } from '../../constants/settings';

function Tile({ letter, status }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (letter && status === undefined) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, TIMING * 100);
      return () => clearTimeout(timer);
    }
    return false;
  }, [letter, status]);

  return (
    <div
      className={classNames(
        status
          ? 'text-gray-800 dark:text-gray-700'
          : 'text-gray-600 dark:text-gray-300',
        status === 0 && 'bg-gray-300 dark:bg-gray-500',
        status === 1 && 'bg-orange-400',
        status === 2 && 'bg-green-400',
        animate && 'animate-press',
        'relative border border-gray-600 dark:border-gray-400 border-solid rounded',
      )}
    >
      <div className="aspect-square flex justify-center items-center">
        <p className="font-bold select-none">{letter}</p>
      </div>
    </div>
  );
}

Tile.propTypes = {
  letter: PropTypes.string,
  status: PropTypes.number,
};

Tile.defaultProps = {
  letter: '',
  status: undefined,
};

export default Tile;
