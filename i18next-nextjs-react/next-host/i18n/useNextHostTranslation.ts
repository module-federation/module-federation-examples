import useInstanceTranslation from 'i18next-shared-lib/lib/useInstanceTranslation';
import TranslationsEN from './en';
import TranslationsFR from './fr';

const NEXT_HOST_I18N_INSTANCE_NAME = "next-host";
export const useNextHostTranslation = useInstanceTranslation(NEXT_HOST_I18N_INSTANCE_NAME, {
    en: TranslationsEN,
    fr: TranslationsFR,
});

export default useNextHostTranslation;
