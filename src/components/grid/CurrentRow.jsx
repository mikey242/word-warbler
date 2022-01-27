/* eslint-disable react/forbid-prop-types */
import { React } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

function CurrentRow({ letters }) {
  const blanks = letters.length < 5 ? Array.from(Array(5 - letters.length)) : [];
  const merged = [...letters, ...blanks];

  return (
    <div className="grid grid-cols-5 gap-2">
      {merged.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tile key={i} letter={item} />
      ))}
    </div>
  );
}

CurrentRow.propTypes = {
  letters: PropTypes.array,
};

CurrentRow.defaultProps = {
  letters: [],
};

export default CurrentRow;
