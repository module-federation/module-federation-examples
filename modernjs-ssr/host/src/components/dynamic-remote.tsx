import { createRemoteSSRComponent, loadRemote, registerRemotes } from '@modern-js/runtime/mf';

registerRemotes([
    {
        name: 'dynamic_provider',
        entry: 'http://localhost:3008/mf-manifest.json',
    }
])

export const DynamicRemoteSSRComponents = createRemoteSSRComponent({
    loader: () => loadRemote('dynamic_provider/Image'),
    loading: 'loading...',
    fallback: ({ error }) => {
        if (error instanceof Error && error.message.includes('not exist')) {
            return <div>fallback - not existed id</div>;
        }
        return <div>fallback</div>;
    },
});
