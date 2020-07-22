'use strict'

const isTest = process.env.NODE_ENV === 'test'

const testConfig = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'element',
        pragmaFrag: 'fragment',
        throwIfNamespace: false
      }
    ]
  ]
}

const buildConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '62',
          edge: '16',
          firefox: '56',
          // ios_saf: "11",
          safari: '11'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
}

module.exports = isTest ? testConfig : buildConfig
