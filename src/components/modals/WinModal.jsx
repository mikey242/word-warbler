import { React } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Stats from '../Stats';

function WinModal({
  hiddenWord, count, stats, reset,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      header={t('You win!')}
      body={(
        <>
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
            stats={stats}
          />
        </>
          )}
      buttonLabel={t('New game')}
      onClickButton={reset}
    />
  );
}

WinModal.propTypes = {
  hiddenWord: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  stats: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};

export default WinModal;
