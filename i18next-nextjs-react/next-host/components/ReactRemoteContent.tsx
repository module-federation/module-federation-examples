import React, { type MouseEvent } from 'react';
import i18nService from 'i18next-shared-lib/lib/i18nService';

import useReactRemoteTranslation from '../i18n/useReactRemoteTranslation';

const ReactRemoteContent = () => {
  const { t } = useReactRemoteTranslation('react-remote-main');

  const switchLanguage = () => {
    i18nService.switchLanguage();
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    switchLanguage();
  };

  return (
    <div
      style={{
        border: 'dashed 5px blue',
      }}
    >
      <header>{t('remoteTitle')}</header>
      <aside>
        <button onClick={handleButtonClick}>{t('changeLanguageButtonLabel')}</button>
      </aside>
      <main>{t('remoteContent')}</main>
    </div>
  );
};

export default ReactRemoteContent;
