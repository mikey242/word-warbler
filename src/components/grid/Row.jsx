/* eslint-disable react/forbid-prop-types */
import { useEffect, useState, React } from 'react';
import PropTypes from 'prop-types';
import { TIMING } from '../../constants/settings';
import Tile from './Tile';

function Row({ letters }) {
  const [animate, setAnimate] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    let timer = null;
    const len = letters.length;
    if (len === 5) {
      setAnimate(true);
      for (let i = 0; i <= len; i += 1) {
        timer = setTimeout(() => {
          setStatus(i);
        }, (i * TIMING) + TIMING / 2);
      }
    }
    return clearTimeout(timer);
  }, [letters]);

  return (
    <div className="grid grid-cols-5 gap-1 xs:gap-2">
      {letters?.length ? (
        letters.map((entry, i) => (
          <div
            style={{
              animation: animate && `rotate ${TIMING}ms linear ${i * (TIMING)}ms`,
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            <Tile
              status={status >= i ? Number(entry.status) : null}
              letter={entry.letter}
            />
          </div>
        ))
      ) : (
        <>
          <Tile>{letters[0]}</Tile>
          <Tile>{letters[1]}</Tile>
          <Tile>{letters[2]}</Tile>
          <Tile>{letters[3]}</Tile>
          <Tile>{letters[4]}</Tile>
        </>
      )}
    </div>
  );
}

Row.propTypes = {
  letters: PropTypes.array,
};

Row.defaultProps = {
  letters: [],
};

export default Row;
