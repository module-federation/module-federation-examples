import { LoaderFunctionArgs } from '@modern-js/runtime/router';

export type DataLoaderRes = {
    providerList: Array<{
        name: string,
        entry: string,
        id: string;
    }>
}

const fetchProviderList = async () => {
    const res = await new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    name: 'dynamic_provider',
                    entry: 'http://localhost:3008/mf-manifest.json',
                    id: 'dynamic_provider/Image'
                }
            ])
        }, 1000);
    });

    return res as DataLoaderRes['providerList']
}

export const loader = async ({ request }: LoaderFunctionArgs): Promise<DataLoaderRes> => {
    console.log('request params', request);
    const providerList = await fetchProviderList();
    return {
        providerList
    }
};