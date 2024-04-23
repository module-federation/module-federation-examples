
    export type RemoteKeys = 'app2/Button' | 'app2/ModernComponent' | 'app2/newReact' | 'app2/newReactDOM';
    type PackageType<T> = T extends 'app2/newReactDOM' ? typeof import('app2/newReactDOM') :T extends 'app2/newReact' ? typeof import('app2/newReact') :T extends 'app2/ModernComponent' ? typeof import('app2/ModernComponent') :T extends 'app2/Button' ? typeof import('app2/Button') :any;