import i18n from 'i18next';
import { React, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from './Modal';
import useLocalStorage from '../util/storage';
import { ReactComponent as Language } from '../images/language.svg';
import { ReactComponent as Light } from '../images/light.svg';
import { ReactComponent as Dark } from '../images/dark.svg';
import { ReactComponent as Help } from '../images/help.svg';

function Bar({ changeLanguage, setGameState }) {
  const { t } = useTranslation();
  const [showLanguage, setShowLanguage] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme');

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle('dark');
    setTheme(htmlTag.classList.contains('dark') ? 'dark' : 'light');
  };

  const toggleLanguage = (lang) => {
    changeLanguage(lang);
    setShowLanguage(false);
  };

  return (
    <>
      <nav className="border-gray-300 dark:border-gray-600 border-b text-gray-600 dark:text-gray-300 mb-5 px-4 sm:px-4 py-2.5 w-full">
        <div className="container flex flex-wrap justify-center items-center mx-auto">
          <div className="mr-auto flex-1">
            <button
              type="button"
              onClick={() => setGameState((prev) => ({ ...prev, showIntro: true }))}
            >
              <Help width="1.25em" />
            </button>
          </div>
          <h1 className="block py-2 px-3 text-xl">Word Warbler</h1>
          <div className="ml-auto flex-1 flex justify-end items-center text-right">
            <button type="button" className="mr-2" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Dark width="1.25em" />
              ) : (
                <Light width="1.25em" />
              )}
            </button>
            <button type="button" onClick={() => setShowLanguage(true)}>
              <Language width="1.25em" />
            </button>
          </div>
        </div>
      </nav>
      {showLanguage && (
        <Modal
          header={t('Language')}
          body={(
            <div className="grid gap-2">
              <button
                type="button"
                className={classNames(
                  i18n.language.substring(0, 2) === 'nl' && 'border',
                  'border-gray-600 p-2',
                )}
                onClick={() => toggleLanguage('nl')}
              >
                {t('Dutch')}
              </button>
              <br />
              <button
                type="button"
                className={classNames(
                  i18n.language.substring(0, 2) === 'en' && 'border',
                  'border-gray-600 p-2',
                )}
                onClick={() => toggleLanguage('en')}
              >
                {t('English')}
              </button>
            </div>
          )}
          onClickButton={() => setShowLanguage(false)}
        />
      )}
    </>
  );
}

Bar.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default Bar;
