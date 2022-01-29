import { React, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useLocalStorage from '../util/storage';
import { ReactComponent as Language } from '../images/language.svg';
import { ReactComponent as Light } from '../images/light.svg';
import { ReactComponent as Dark } from '../images/dark.svg';
import { ReactComponent as Help } from '../images/help.svg';

function Bar({ setGameState }) {
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
        <div className="mr-auto flex-1">
          <button
            type="button"
            aria-label={t('Show help')}
            onClick={() => setGameState((prev) => ({ ...prev, showIntro: true }))}
          >
            <Help width="1.5em" />
          </button>
        </div>
        <h1 className="block py-2 px-3 text-xl">Word Warbler</h1>
        <div className="ml-auto flex-1 flex justify-end items-center text-right">
          <button
            type="button"
            aria-label={t('Toggle dark mode')}
            className="mr-3"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Dark width="1.5em" />
            ) : (
              <Light width="1.5em" />
            )}
          </button>
          <button
            type="button"
            aria-label={t('Change language')}
            onClick={() => setGameState((prev) => ({ ...prev, showLanguage: true }))}
          >
            <Language width="1.5em" />
          </button>
        </div>
      </div>
    </nav>
  );
}

Bar.propTypes = {
  setGameState: PropTypes.func.isRequired,
};

export default Bar;
