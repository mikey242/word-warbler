import { React, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  InformationCircleIcon, MoonIcon, SunIcon, TranslateIcon,
} from '@heroicons/react/solid';
import useLocalStorage from '../util/storage';
import { ReactComponent as Logo } from '../images/logo.svg';

function Header({ setGameState, setShowLanguage }) {
  const { t } = useTranslation();
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

  return (
    <nav className="border-gray-300 dark:border-gray-600 border-b text-gray-600 dark:text-gray-300 mb-5 px-4 sm:px-4 py-2.5 w-full">
      <div className="container flex flex-wrap justify-center items-center mx-auto">
        <div className="mr-auto flex items-center">
          <Logo width="1.5em" />
          <h1 className="block ml-2 py-2 text-md md:text-xl">Word Warbler</h1>
        </div>
        <div className="ml-auto flex justify-end items-center">
          <button
            type="button"
            className="mr-3"
            aria-label={t('Show help')}
            onClick={() => setGameState((prev) => ({ ...prev, showIntro: true }))}
          >
            <InformationCircleIcon width="1.5em" />
          </button>
          <button
            type="button"
            aria-label={t('Toggle dark mode')}
            className="mr-3"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <MoonIcon width="1.5em" />
            ) : (
              <SunIcon width="1.5em" />
            )}
          </button>
          <button
            type="button"
            aria-label={t('Change language')}
            onClick={() => setShowLanguage(true)}
          >
            <TranslateIcon width="1.5em" />
          </button>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  setGameState: PropTypes.func.isRequired,
  setShowLanguage: PropTypes.func.isRequired,
};

export default Header;
