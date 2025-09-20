import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState, type MouseEvent } from 'react';
import i18nService from 'i18next-shared-lib/lib/i18nService';

import useNextHostTranslation from '../i18n/useNextHostTranslation';

const ReactRemoteContent = dynamic(() => import('../components/ReactRemoteContent'), { ssr: false });

const Home: NextPage = () => {
  const { t } = useNextHostTranslation('next-main');
  const [isRemoteVisible, setIsRemoteVisible] = useState(false);

  useEffect(() => {
    setIsRemoteVisible(true);
  }, []);

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
        <h1>Next Host</h1>
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
        {isRemoteVisible && (
          <div
            style={{
              marginTop: 10,
            }}
          >
            <h2>{`${t('remoteChildTitle')} :`}</h2>
            <ReactRemoteContent />
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
