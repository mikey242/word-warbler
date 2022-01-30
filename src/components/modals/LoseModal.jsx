import { React } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Stats from '../Stats';

function LoseModal({
  hiddenWord, stats, handleClose, isOpen,
}) {
  const { t } = useTranslation();
  const { gamesWon, gamesLost, guesses } = stats;

  return (
    <Modal
      header={t('Game over')}
      isOpen={isOpen}
      buttonLabel={t('Try again')}
      handleClose={handleClose}
    >
      <div className="text-center">
        <Trans i18nKey="loseMessage">
          <p>
            The hidden word was
            {' '}
            <strong className="bg-green-400 mx-1 p-1 rounded text-gray-800">{{ hiddenWord }}</strong>
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

LoseModal.propTypes = {
  hiddenWord: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  stats: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default LoseModal;
