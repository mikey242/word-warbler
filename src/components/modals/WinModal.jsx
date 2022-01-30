import { React } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Stats from '../Stats';

function WinModal({
  hiddenWord, stats, count, handleClose, isOpen,
}) {
  const { t } = useTranslation();
  const { gamesWon, gamesLost, guesses } = stats;

  return (
    <Modal
      isOpen={isOpen}
      header={t('You win!')}
      buttonLabel={t('New game')}
      handleClose={handleClose}
    >
      <div className="text-center">
        <Trans i18nKey="winMessage" count={count}>
          <p>
            You guessed the hidden word
            {' '}
            <strong className="bg-green-400 mx-1 p-1 rounded text-gray-800">{{ hiddenWord }}</strong>
            {' '}
            in
            {' '}
            <strong className="underline">{{ count }}</strong>
            {' '}
            guesses.
          </p>
        </Trans>
        <Stats
          gamesWon={gamesWon}
          gamesLost={gamesLost}
          guesses={guesses}
        />
      </div>
    </Modal>
  );
}

WinModal.propTypes = {
  hiddenWord: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  stats: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default WinModal;
