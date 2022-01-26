import { useEffect, useState } from "react";
import { TIMING } from "../../constants/settings";
import { Tile } from "./Tile";

const Row = ({ letters = [] }) => {
  const [animate, setAnimate] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    const len = letters.length;
    if (len === 5) {
      setAnimate(true);
      for (let i = 0; i <= len; i++) {
        setTimeout(() => {
          setStatus(i);
        }, (i * (TIMING * 100)) + (TIMING * 100) / 2);
      }
    }
  }, [letters]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {letters.length ? (
        letters.map((entry, i) => (
          <div
            style={{
              animation: animate && "rotate " + (TIMING * 100) + "ms linear " + i * (TIMING) + "00ms",
            }}
            key={i}
          >
            <Tile
              status={status >= i && entry.status}
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
};

export { Row };
