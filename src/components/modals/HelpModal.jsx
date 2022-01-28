import { React } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Tile from '../grid/Tile';

function HelpModal({ onClickButton }) {
  const { t } = useTranslation();

  return (
    <Modal
      header={t('How to play')}
      body={(
        <>
          <p>
            {t('Your goal is to guess the 5 letter hidden word.')}
          </p>
          <br />
          <p>
            {t('You have a total of 6 tries to do this. After each guess the tiles will each turn one of three colours.')}
          </p>
          <br />
          <div className="grid grid-flow-col grid-cols-[1fr_8fr] items-center mb-2">
            <div className="mr-2">
              <Tile letter="A" status={0} />
            </div>
            {t('letter is not in secret word')}
          </div>
          <div className="grid grid-flow-col grid-cols-[1fr_8fr] items-center mb-2">
            <div className="mr-2">
              <Tile letter="B" status={1} />
            </div>
            {t('letter is in secret word but in another position')}
          </div>
          <div className="grid grid-flow-col grid-cols-[1fr_8fr] items-center mb-2">
            <div className="mr-2">
              <Tile letter="C" status={2} />
            </div>
            {t('letter is in word and in correct position')}
          </div>
        </>
          )}
      buttonLabel={t('Got it!')}
      onClickButton={onClickButton}
    />
  );
}

HelpModal.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default HelpModal;
