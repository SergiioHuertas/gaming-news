module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb-base'
    ],
    plugins: [
        'react'
    ],
    rules: {
        // Your custom rules
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};