import useInstanceTranslation from 'i18next-shared-lib/lib/useInstanceTranslation';

import TranslationsEN from './react-remote/en';
import TranslationsFR from './react-remote/fr';

const useReactRemoteTranslation = useInstanceTranslation('react-remote', {
  en: TranslationsEN,
  fr: TranslationsFR,
});

export default useReactRemoteTranslation;
