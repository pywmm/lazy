module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
  },
  'extends': ['airbnb-base', 'plugin:vue/recommended'],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
      // don't require .vue extension when importing
      'import/extensions': ['error', 'always', {
        'js': 'never',
        'vue': 'never'
      }],
      // allow optionalDependencies
      'import/no-extraneous-dependencies': ['error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-param-reassign': 0,
      'consistent-return': 0,
      'no-mixed-operators': 0,
      'import/prefer-default-export': 0,
      'max-len': ['error', 120, 4],
      'no-continue': 0,
      'vue/no-dupe-keys': 'error',
      'vue/no-reserved-keys': [2, {
        reserved: ['foo', 'foo2'],
        groups: ['asyncComputed']
      }],
      'vue/no-shared-component-data': 'error',
      'vue/no-template-key': 'error',
      'vue/require-render-return': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-computed-property': 'error',
      // 'vue/html-end-tags': 'error',
      'vue/html-quotes': 'error',
      // 'html-self-closing': ['error', {
      //     'html': {
      //         'normal': 'never',
      //         'void': 'never',
      //         'component': 'always'
      //     },
      //     'svg': 'always',
      //     'math': 'always'
      // }],
      'vue/max-attributes-per-line': [2, {
        'singleline': 2,
        'multiline': {
          max: 1,
          allowFirstLine: false
        }
      }],
      'vue/mustache-interpolation-spacing': [2, 'always'],
      'vue/name-property-casing': [2, 'kebab-case'],
      'vue/no-multi-spaces': 'error',
      'vue/v-bind-style': 'error',
      'vue/v-on-style': 'error',
      'vue/valid-v-model': 0,
  }
};