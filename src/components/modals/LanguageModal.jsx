import i18n from 'i18next';
import { React } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../Modal';

function LanguageModal({ onClickButton }) {
  const { t } = useTranslation();
  const currentLanguage = i18n?.language?.substring(0, 2);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    onClickButton();
  };

  return (

    <Modal
      header={t('Language')}
      body={(
        <div className="grid gap-2">
          <button
            type="button"
            disabled={currentLanguage === 'nl'}
            className={classNames(
              currentLanguage === 'nl' && 'border',
              'border-gray-600 p-2',
            )}
            onClick={() => changeLanguage('nl')}
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
            onClick={() => changeLanguage('en')}
          >
            {t('English')}
          </button>
        </div>
          )}
      buttonLabel={t('Cancel')}
      onClickButton={onClickButton}
    />
  );
}

LanguageModal.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default LanguageModal;
