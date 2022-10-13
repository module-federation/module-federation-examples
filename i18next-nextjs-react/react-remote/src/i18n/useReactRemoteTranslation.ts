import useInstanceTranslation from 'i18next-shared-lib/lib/useInstanceTranslation';
import TranslationsEN from './en';
import TranslationsFR from './fr';

export const useReactRemoteTranslation = useInstanceTranslation("react-remote", {
    en: TranslationsEN,
    fr: TranslationsFR,
});

export default useReactRemoteTranslation;
