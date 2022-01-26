import { TOP, MIDDLE, BOTTOM } from "../../constants/keys";
import { Key } from "./Key";

const Keyboard = ({ handleCharacter, handleSubmit, handleDelete }) => {
  return (
    <div id="keyboard" className="font-mono w-full mt-3">
      <div className="keyboard-row flex justify-center">
        {TOP.map((character, i) => {
          return (
            <Key key={i} onClick={handleCharacter} character={character} />
          );
        })}
      </div>
      <div className="keyboard-row flex justify-center">
        {MIDDLE.map((character, i) => {
          return (
            <Key key={i} onClick={handleCharacter} character={character} />
          );
        })}
      </div>
      <div className="keyboard-row flex justify-center">
        <Key
          key={"delete"}
          onClick={handleDelete}
          character={
            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M576 64H205.26A63.97 63.97 0 0 0 160 82.75L9.37 233.37c-12.5 12.5-12.5 32.76 0 45.25L160 429.25c12 12 28.28 18.75 45.25 18.75H576c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zm-84.69 254.06c6.25 6.25 6.25 16.38 0 22.63l-22.62 22.62c-6.25 6.25-16.38 6.25-22.63 0L384 301.25l-62.06 62.06c-6.25 6.25-16.38 6.25-22.63 0l-22.62-22.62c-6.25-6.25-6.25-16.38 0-22.63L338.75 256l-62.06-62.06c-6.25-6.25-6.25-16.38 0-22.63l22.62-22.62c6.25-6.25 16.38-6.25 22.63 0L384 210.75l62.06-62.06c6.25-6.25 16.38-6.25 22.63 0l22.62 22.62c6.25 6.25 6.25 16.38 0 22.63L429.25 256l62.06 62.06z"
              />
            </svg>
          }
        />
        {BOTTOM.map((character, i) => {
          return (
            <Key key={i} onClick={handleCharacter} character={character} />
          );
        })}
        <Key
          key={"enter"}
          onClick={handleSubmit}
          character={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90 w-5"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M313.553 392.331 209.587 504.334c-9.485 10.214-25.676 10.229-35.174 0L70.438 392.331C56.232 377.031 67.062 352 88.025 352H152V80H68.024a11.996 11.996 0 0 1-8.485-3.515l-56-56C-4.021 12.926 1.333 0 12.024 0H208c13.255 0 24 10.745 24 24v328h63.966c20.878 0 31.851 24.969 17.587 40.331z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export { Keyboard };
