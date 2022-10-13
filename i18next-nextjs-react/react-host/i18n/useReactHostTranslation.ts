import useInstanceTranslation from 'i18next-shared-lib/lib/useInstanceTranslation';
import TranslationsEN from './en';
import TranslationsFR from './fr';

export const useReactHostTranslation = useInstanceTranslation("react-host", {
    en: TranslationsEN,
    fr: TranslationsFR,
});

export default useReactHostTranslation;
