import React, { type MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import useReactHostTranslation from '../i18n/useReactHostTranslation';
import i18nService from 'i18next-shared-lib/lib/i18nService';

const ReactRemoteContent = React.lazy(() => import('reactRemote/Content'));

const App = () => {
  const { t } = useReactHostTranslation('react-main');
  const switchLanguage = () => {
    i18nService.switchLanguage();
  };

  const handleSectionClick = () => {
    switchLanguage();
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    switchLanguage();
  };
  return (
    <main
      style={{
        border: 'dashed 5px red',
        padding: 20,
      }}
    >
      <header
        style={{
          marginBottom: 10,
        }}
      >
        <h1>React Host</h1>
      </header>
      <section
        onClick={handleSectionClick}
        style={{
          marginBottom: 10,
          cursor: 'pointer',
        }}
      >
        <p>{t('mainText')}</p>
        <button onClick={handleButtonClick}>{t('changeLanguageButtonLabel')}</button>
        <div
          style={{
            marginTop: 10,
          }}
        >
          <h2>{`${t('remoteChildTitle')} :`}</h2>
          <ReactRemoteContent />
        </div>
      </section>
    </main>
  );
};
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
