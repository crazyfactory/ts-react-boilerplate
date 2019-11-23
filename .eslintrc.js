const tslintRules = {
  "align": [
    true,
    "parameters",
    "arguments",
    "statements"
  ],
  "chai-vague-errors": true,
  "comment-format": [
    true,
    "check-space"
  ],
  "create-async-actions": true,
  "enum-sort-keys": true,
  "export-name": true,
  "function-constructor": true,
  "function-name": [
    true,
    {
      "method-regex": "^[a-z][\\w\\d]+$",
      "private-method-regex": "^[a-z][\\w\\d]+$",
      "static-method-regex": "^[a-z][\\w\\d]+$",
      "function-regex": "^[a-z][\\w\\d]+$"
    }
  ],
  "hex-format": true,
  "import-spacing": true,
  "interface-sort-keys": false,
  "increment-decrement": true,
  "jquery-deferred-must-complete": true,
  "jsdoc-format": true,
  "jsx-boolean-value": true,
  "jsx-curly-spacing": [
    true,
    "never"
  ],
  "jsx-equals-spacing": [
    true,
    "never"
  ],
  "jsx-key": true,
  "jsx-no-bind": true,
  "jsx-no-lambda": true,
  "jsx-no-multiline-js": true,
  "jsx-no-string-ref": true,
  "jsx-self-close": true,
  "jsx-space-before-closing-tag": [
    true,
    "never"
  ],
  "jsx-wrap-multiline": true,
  "max-func-body-length": [
    true,
    150,
    {
      "ignore-parameters-to-function-regex": "describe"
    }
  ],
  "max-line-length": [
    true,
    120
  ],
  "member-ordering": [
    true,
    {
      "order": [
        "public-static-field",
        "public-instance-field",
        "private-static-field",
        "private-instance-field",
        "public-constructor",
        "private-constructor",
        "public-instance-method",
        "protected-instance-method",
        "private-instance-method"
      ],
      "alphabetize": true
    }
  ],
  "mocha-avoid-only": true,
  "no-backbone-get-set-outside-model": true,
  "no-cookies": true,
  "no-delete-expression": true,
  "no-disable-auto-sanitization": true,
  "no-document-domain": true,
  "no-document-write": true,
  "no-dup-actions": true,
  "no-duplicate-imports": true,
  "no-duplicate-variable": true,
  "no-exec-script": true,
  "no-for-in": true,
  "no-function-expression": true,
  "no-http-string": true,
  "no-implicit-dependencies": [
    true,
    "dev"
  ],
  "no-inner-html": true,
  "no-jquery-raw-elements": true,
  "no-reference-import": true,
  "no-shadowed-variable": true,
  "no-string-based-set-immediate": true,
  "no-string-based-set-interval": true,
  "no-string-based-set-timeout": true,
  "no-trailing-whitespace": true,
  "no-unnecessary-local-variable": true,
  "no-unnecessary-override": true,
  "no-unused-expression": true,
  "no-with-statement": true,
  "object-literal-sort-keys": true,
  "one-line": [
    true,
    "check-open-brace",
    "check-catch",
    "check-else",
    "check-whitespace"
  ],
  "only-arrow-functions": [
    true,
    "allow-declarations",
    "allow-named-functions"
  ],
  "ordered-imports": [
    true,
    {
      "import-sources-order": "case-insensitive",
      "module-source-path": "full",
      "named-imports-order": "case-insensitive"
    }
  ],
  "prefer-array-literal": true,
  "prefer-conditional-expression": true,
  "promise-must-complete": true,
  "quotemark": [
    true,
    "double"
  ],
   // todo: Specifying excluded files as an option used to work until updating eslint and it's parsers.
  "react-no-dangerous-html": true,
  "react-this-binding-issue": true,
  "semicolon": [
    true,
    "always"
  ],
  "space-within-parens": [
    true,
    0
  ],
  "trailing-comma": [
    true,
    {
      "singleline": "never",
      "multiline": "never"
    }
  ],
  "triple-equals": [
    true,
    "allow-null-check"
  ],
  "typedef": [
    true,
    "call-signature",
    "parameter",
    "property-declaration",
    "member-variable-declaration"
  ],
  "unnecessary-bind": true,
  "use-named-parameter": true,
  "variable-name": [
    true,
    "ban-keywords",
    "check-format",
    "allow-leading-underscore",
    "allow-pascal-case"
  ],
  "whitespace": [
    true,
    "check-branch",
    "check-decl",
    "check-operator",
    "check-separator",
    "check-type"
  ]
};

module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "overrides": [
    {
      "files": ["*.stories.tsx"],
      "rules": {
        "@typescript-eslint/tslint/config": [
          "error",
          {
            "rulesDirectory": [
              "node_modules/tslint-react/rules",
              "node_modules/tslint-microsoft-contrib",
              "node_modules/@crazyfactory/tslint-rules/lib"
            ],
            "rules": {
              ...tslintRules,
              "export-name": false,
              "jsx-no-lambda": false,
              "react-this-binding-issue": false,
            }
          }
        ]
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "@typescript-eslint/tslint"
  ],
  "rules": {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "overrides": {
          "constructors": "off"
        }
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        "prefixWithI": "always"
      }
    ],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-use-before-declare": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-parens": [
      "error",
      "always"
    ],
    "complexity": "off",
    "constructor-super": "error",
    "curly": "error",
    "default-case": "error",
    "dot-notation": "error",
    "eol-last": "off",
    "guard-for-in": "error",
    "max-classes-per-file": [
      "error",
      1
    ],
    "member-ordering": "off",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": [
      "error",
      {
        "allow": [
          "error",
          "debug",
          "info",
          "time",
          "timeEnd",
          "trace",
          "warn"
        ]
      }
    ],
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-function": "off",
    "no-eval": "error",
    "no-extra-bind": "error",
    "no-extra-semi": "error",
    "no-fallthrough": "off",
    "no-invalid-regexp": "error",
    "no-invalid-this": "error",
    "no-multi-str": "off",
    "no-multiple-empty-lines": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-regex-spaces": "error",
    "no-return-await": "error",
    "no-sequences": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": "off",
    "prefer-const": "error",
    "prefer-object-spread": "error",
    "quote-props": [
      "error",
      "consistent-as-needed"
    ],
    "radix": "error",
    "space-before-function-paren": ["error", "never"],
    "use-isnan": "error",
    "valid-typeof": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rulesDirectory": [
          "node_modules/tslint-react/rules",
          "node_modules/tslint-microsoft-contrib",
          "node_modules/@crazyfactory/tslint-rules/lib"
        ],
        "rules": tslintRules
      }
    ]
  }
};
