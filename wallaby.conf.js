module.exports = function (wallaby) {
    return {
        bootstrap: function() {
            // var fetch = require('node-fetch');
            // global.fetch = global.fetch || fetch;
            // global.Request = global.Request || fetch.Request;
            // global.Response = global.Response || fetch.Response;
        },
        files: [
            'src/**/*.ts',
            { "pattern": "src/**/*.test.js", "ignore": true }
        ],
        tests: [
            'src/**/*.test.ts'
        ],
        env: {
            type: 'node'
        },
        testFramework: 'mocha'
    };
};
