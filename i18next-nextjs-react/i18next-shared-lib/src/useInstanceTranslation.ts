import {useTranslation} from "react-i18next";
import i18nService from "./i18nService";
import {Resource} from "i18next";

export const useInstanceTranslation =
    (instanceName: string, resources: Resource) =>
        (filename: string) => {
            const i18nInstance = i18nService.getOrCreateI18nInstance(instanceName, {resources});
            return useTranslation(filename, {i18n: i18nInstance});
        }

export default useInstanceTranslation;