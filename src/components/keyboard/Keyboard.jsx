import { React } from 'react';
import PropTypes from 'prop-types';
import { TOP, MIDDLE, BOTTOM } from '../../constants/keys';
import Key from './Key';
import { ReactComponent as Enter } from '../../images/enter.svg';
import { ReactComponent as Backspace } from '../../images/backspace.svg';

function Keyboard({ handleCharacter, handleSubmit, handleDelete }) {
  return (
    <div id="keyboard" className="font-mono w-full mt-3">
      <div className="keyboard-row flex justify-center">
        {TOP.map((character) => (
          <Key key={character} onClick={handleCharacter} character={character} />
        ))}
      </div>
      <div className="keyboard-row flex justify-center">
        {MIDDLE.map((character) => (
          <Key key={character} onClick={handleCharacter} character={character} />
        ))}
      </div>
      <div className="keyboard-row flex justify-center">
        <Key
          key="enter"
          onClick={handleSubmit}
          character={(
            <Enter className="rotate-90 w-3 md:w-5" width="1.25em" />
          )}
        />

        {BOTTOM.map((character) => (
          <Key key={character} onClick={handleCharacter} character={character} />
        ))}
        <Key
          key="delete"
          onClick={handleDelete}
          character={(
            <Backspace width="1.25em" />
          )}
        />
      </div>
    </div>
  );
}

Keyboard.propTypes = {
  handleCharacter: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Keyboard;
