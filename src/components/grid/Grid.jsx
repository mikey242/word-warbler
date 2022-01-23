import { CurrentRow } from "./CurrentRow";
import { Row } from "./Row";

const Grid = ({ current, guesses }) => {
  // Generate blank rows
  const blanks =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <div id="grid" className="grid grid-rows-4 gap-3 px-3 max-w-md mx-auto mb-auto w-full text-center">
      {/* Previously guessed */}
      {guesses.map((guess, i) => (
        <Row key={i} letters={guess} />
      ))}
      {/* Current guess */}
      {guesses.length < 6 && <CurrentRow letters={current.split("")} />}
      {/* Remaining blank rows */}
      {blanks.map((_, i) => (
        <Row key={i} />
      ))}
    </div>
  );
};

export { Grid };
