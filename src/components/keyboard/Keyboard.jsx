import { TOP, MIDDLE, BOTTOM } from "../../constants/keys";
import { Key } from "./Key";

const Keyboard = ({ handleCharacter, handleSubmit, handleDelete }) => {
  return (
    <div className="mt-5 max-w-lg mx-auto" id="keyboard">
      <div className="flex w-full items-center justify-center">
        {TOP.map((character, i) => {
          return (
            <Key
              key={i}
              onClick={handleCharacter}
              character={character}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        {MIDDLE.map((character, i) => {
          return (
            <Key
              key={i}
              onClick={handleCharacter}
              character={character}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        <Key key={'enter'} onClick={handleSubmit} character={"Enter"} />
        {BOTTOM.map((character, i) => {
          return (
            <Key
              key={i}
              onClick={handleCharacter}
              character={character}
            />
          );
        })}
        <Key key={'delete'} onClick={handleDelete} character={"Backspace"} />
      </div>
    </div>
  );
};

export { Keyboard };
