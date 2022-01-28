import { React } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Stats from '../Stats';

function LoseModal({
  hiddenWord, stats, reset,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      header={t('Game over')}
      body={(
        <>
          <Trans i18nKey="loseMessage">
            <p>
              The hidden word was
              {' '}
              <strong className="bg-green-400 mx-1 p-1 rounded text-gray-800">{{ hiddenWord }}</strong>
            </p>
          </Trans>
          <Stats
            stats={stats}
          />
        </>
          )}
      buttonLabel={t('Try again')}
      onClickButton={reset}
    />
  );
}

LoseModal.propTypes = {
  hiddenWord: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  stats: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};

export default LoseModal;
