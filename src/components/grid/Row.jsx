import { useEffect, useState } from "react";
import { Tile } from "./Tile";

const Row = ({ letters = [] }) => {
  const [animate, setAnimate] = useState(false);
  const [animateRow, setAnimateRow] = useState(0)

  useEffect(() => {
    const len = letters.length;
    if (len === 5) {
      setAnimate(true);
      for (let i = 0; i <= len; i++) {
        setTimeout(() => {
          setAnimateRow(i)
        },( i * 100) + 100);
      }
    }
  }, [letters]);

  return (
    <div className="grid grid-cols-5 gap-3">
      {letters.length ? (
        letters.map((entry, i) => (
          <div
            style={{
              animation: animate && "rotate 200ms ease-in " + (i * 1) + "00ms",
            }}
            key={i}
          >
            <Tile status={(animateRow >= i) && entry.status} letter={entry.letter} />
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
