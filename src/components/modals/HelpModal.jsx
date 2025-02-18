import { React } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Tile from '../grid/Tile';

function HelpModal({ handleClose, isOpen }) {
  const { t } = useTranslation();

  return (
    <Modal
      header={t('How to play')}
      buttonLabel={t('Got it!')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <>
        <p>
          {t('Your goal is to guess the 5 letter hidden word.')}
        </p>
        <br />
        <p>
          {t('You have a total of 6 tries to do this. After each guess the tiles will each turn one of three colours.')}
        </p>
        <br />
        <div className="grid grid-flow-col grid-cols-[1fr_5fr] md:grid-cols-[1fr_8fr] items-center mb-2">
          <div className="mr-2">
            <Tile letter="A" status={0} />
          </div>
          {t('letter is not in secret word')}
        </div>
        <div className="grid grid-flow-col grid-cols-[1fr_5fr] md:grid-cols-[1fr_8fr] items-center mb-2">
          <div className="mr-2">
            <Tile letter="B" status={1} />
          </div>
          {t('letter is in secret word but in another position')}
        </div>
        <div className="grid grid-flow-col grid-cols-[1fr_5fr] md:grid-cols-[1fr_8fr] items-center mb-2">
          <div className="mr-2">
            <Tile letter="C" status={2} />
          </div>
          {t('letter is in word and in correct position')}
        </div>
        <div className="text-center mt-3">
          <small>
            <Trans i18nKey="madeBy">
              Made by
              {' '}
              <a target="_blank" href="https://www.linkedin.com/in/michael-iseard/" rel="noreferrer">Michael Iseard</a>
            </Trans>
          </small>
          {' '}
          <span className="px-1 sm:px-3 text-gray-300 dark:text-gray-600">|</span>
          {' '}
          <small>
            <Trans i18nKey="sourceText">
              Available on
              {' '}
              <a target="_blank" href="https://gitlab.iseard.media/michael/word-game" rel="noreferrer">GitLab</a>
            </Trans>
          </small>
        </div>
      </>
    </Modal>
  );
}

HelpModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

HelpModal.defaultProps = {
  isOpen: false,
};

export default HelpModal;
