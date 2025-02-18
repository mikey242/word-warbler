import { React } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BackspaceIcon } from '@heroicons/react/solid';
import {
  KEYS,
} from '../../constants/keys';
import Key from './Key';
import { ReactComponent as Enter } from '../../images/enter.svg';

function Keyboard({
  handleCharacter, handleSubmit, handleDelete, wrongLetters,
}) {
  const { t } = useTranslation();
  const { TOP, MIDDLE, BOTTOM } = KEYS;

  return (
    <div id="keyboard" className="font-mono w-full mt-3">
      <div className="keyboard-row flex justify-center">
        {TOP.map((character) => (
          <Key
            key={character}
            incorrect={wrongLetters.includes(character)}
            onClick={handleCharacter}
            character={character}
          />
        ))}
      </div>
      <div className="keyboard-row flex justify-center">
        {MIDDLE.map((character) => (
          <Key
            key={character}
            incorrect={wrongLetters.includes(character)}
            onClick={handleCharacter}
            character={character}
          />
        ))}
      </div>
      <div className="keyboard-row flex justify-center">
        <Key
          key="enter"
          label={t('Enter')}
          onClick={handleSubmit}
          character={(
            <Enter className="rotate-90 w-3 md:w-5" width="1.25em" />
          )}
        />

        {BOTTOM.map((character) => (
          <Key
            key={character}
            incorrect={wrongLetters.includes(character)}
            onClick={handleCharacter}
            character={character}
          />
        ))}
        <Key
          key="delete"
          label={t('Backspace')}
          onClick={handleDelete}
          character={(
            <BackspaceIcon width="1.25em" />
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
  // eslint-disable-next-line react/forbid-prop-types
  wrongLetters: PropTypes.array,
};

Keyboard.defaultProps = {
  wrongLetters: [],
};

export default Keyboard;
