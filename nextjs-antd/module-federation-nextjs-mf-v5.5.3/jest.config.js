"use strict";
/* eslint-disable */
module.exports = {
    displayName: 'nextjs-mf-js',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/nextjs-mf-js',
};
//# sourceMappingURL=jest.config.js.map