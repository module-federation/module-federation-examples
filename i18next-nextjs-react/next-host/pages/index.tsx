import type {NextPage} from 'next';
import useNextHostTranslation from "../i18n/useNextHostTranslation";
import dynamic from "next/dynamic";
const ReactRemoteContent = dynamic(() => import("reactRemote/Content"), {ssr: false});
import i18nService from "i18next-shared-lib/lib/i18nService";

console.log(__webpack_share_scopes__);
setTimeout(() => console.log(__webpack_share_scopes__), 1000);

const Home: NextPage = () => {
    const { t } = useNextHostTranslation('next-main');
    const switchLanguage = () => {
        i18nService.switchLanguage();
    }
    return (
        <main style={
            {
                border: 'dashed 5px red',
                padding: 20
            }
        }>
            <header style={
                {
                    marginBottom: 10
                }
            }>
                <h1>Next Host</h1>
            </header>
            <section style={
                {
                    marginBottom: 10
                }
            }>
                <p>{t('mainText')}</p>
                <button onClick={switchLanguage}>{t('changeLanguageButtonLabel')}</button>
            </section>
            <section>
                <h2>{`${t('remoteChildTitle')} :`}</h2>
                <ReactRemoteContent/>
            </section>
        </main>
    );
}

export default Home
