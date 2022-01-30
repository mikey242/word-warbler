/* eslint-disable react/forbid-prop-types */
import { React } from 'react';
import PropTypes from 'prop-types';
import CurrentRow from './CurrentRow';
import Row from './Row';

function Grid({ current, guesses, rowError }) {
  // Generate blank rows
  const blanks = guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <div id="grid" className="grid grid-rows-4 gap-2 px-3 max-w-md mx-auto w-full text-2xl text-center">
      {/* Previously guessed */}
      {guesses.map((guess, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={i} letters={guess} />
      ))}
      {/* Current guess */}
      {guesses.length < 6 && <CurrentRow rowError={rowError} letters={current.split('')} />}
      {/* Remaining blank rows */}
      {blanks.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={i} />
      ))}
    </div>
  );
}

Grid.propTypes = {
  current: PropTypes.string,
  guesses: PropTypes.array,
  rowError: PropTypes.bool,
};

Grid.defaultProps = {
  current: '',
  guesses: [],
  rowError: null,
};

export default Grid;
