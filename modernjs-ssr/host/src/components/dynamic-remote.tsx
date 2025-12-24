import { getInstance, loadRemote, registerRemotes } from '@module-federation/modern-js/runtime';
import { createLazyComponent } from '@module-federation/modern-js/react';

registerRemotes([
    {
        name: 'dynamic_provider',
        entry: 'http://localhost:3008/mf-manifest.json',
    }
]);

const instance = getInstance();

export const DynamicRemoteSSRComponents = createLazyComponent({
    loader: () => loadRemote('dynamic_provider/Image'),
    loading: <div>loading...</div>,
    instance: instance!,
    fallback: ({ error }: { error: Error }) => {
        if (error instanceof Error && error.message.includes('not exist')) {
            return <div>fallback - not existed id</div>;
        }
        return <div>fallback</div>;
    },
});
