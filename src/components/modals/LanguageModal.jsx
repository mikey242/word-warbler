import i18n from 'i18next';
import { React } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from './Modal';

function LanguageModal({ handleClose, changeLanguage, isOpen }) {
  const { t } = useTranslation();
  const currentLanguage = i18n?.language?.substring(0, 2);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
    handleClose();
  };

  return (

    <Modal
      isOpen={isOpen}
      header={t('Language')}
      buttonLabel={t('Cancel')}
      handleClose={handleClose}
    >
      <div className="grid gap-2">
        <button
          type="button"
          disabled={currentLanguage === 'nl'}
          className={classNames(
            currentLanguage === 'nl' && 'border',
            'border-gray-600 p-2',
          )}
          onClick={() => handleChangeLanguage('nl')}
        >
          {t('Dutch')}
        </button>
        <br />
        <button
          type="button"
          disabled={currentLanguage === 'en'}
          className={classNames(
            currentLanguage === 'en' && 'border',
            'border-gray-600 p-2',
          )}
          onClick={() => handleChangeLanguage('en')}
        >
          {t('English')}
        </button>
      </div>
    </Modal>
  );
}

LanguageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

LanguageModal.defaultProps = {
  isOpen: false,
};

export default LanguageModal;
