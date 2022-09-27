export const displayName: string;
export const preset: string;
export const globals: {
    'ts-jest': {
        tsconfig: string;
    };
};
export const testEnvironment: string;
export const transform: {
    '^.+\\.[tj]s$': string;
};
export const moduleFileExtensions: string[];
export const coverageDirectory: string;
