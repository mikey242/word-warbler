import { React } from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';

function Stats({ gamesWon, gamesLost, guesses }) {
  return (
    <div className="mt-5">
      <div className="text-center mb-3">
        <Trans i18nKey="results">
          Wins:
          {' '}
          {{ gamesWon }}
          {' '}
          |
          Losses:
          {' '}
          {{ gamesLost }}
        </Trans>
      </div>
      {Object.entries(guesses).map(([key, value]) => (
        <div
          key={key}
          className="flex h-5 mb-3 font-mono items-center"
        >
          <div className="mr-2 font-bold">{key}</div>
          <div
            style={{
              flexBasis:
                          `${(value
                            / Object.values(guesses).reduce((a, b) => a + b))
                            * 100
                          }%`,
            }}
            className="h-full flex justify-end items-center bg-green-500 dark:bg-purple-600"
          >
            <div className="mx-2 text-xs">{value}</div>

          </div>

        </div>
      ))}
    </div>
  );
}

Stats.propTypes = {
  gamesWon: PropTypes.number,
  gamesLost: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  guesses: PropTypes.object,
};

Stats.defaultProps = {
  gamesWon: 0,
  gamesLost: 0,
  guesses: {},
};

export default Stats;
