import React from "react";
import useReactRemoteTranslation from "./i18n/useReactRemoteTranslation";
import i18nService from "i18next-shared-lib/lib/i18nService";

export const Content = () => {
    const {t} = useReactRemoteTranslation('react-remote-main');

    const switchLanguage = () => {
        i18nService.switchLanguage();
    };

    return (
        <div style={
            {
                border: 'dashed 5px blue',
            }
        }>
            <header>{t('remoteTitle')}</header>
            <aside>
                <button onClick={() => switchLanguage()}>{t('changeLanguageButtonLabel')}</button>
            </aside>
            <main>{t('remoteContent')}</main>
        </div>
    );
}
export default Content;
