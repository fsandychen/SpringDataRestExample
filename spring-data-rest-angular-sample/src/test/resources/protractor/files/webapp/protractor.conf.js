var config, env, fs;
fs = require('fs');

config = {
    // ---------------------------------------------------------------------------
    // ----- Browser Drivers -----------------------------------------------------
    // ---------------------------------------------------------------------------

    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    // ---------------------------------------------------------------------------
    // ----- What tests to run ---------------------------------------------------
    // ---------------------------------------------------------------------------
    
    specs: [
        'features/taskManager.feature'
    ],
    suites: {
        taskManager: 'features/taskManager.feature',

    },

    // ---------------------------------------------------------------------------
    // ----- How to set up browsers ----------------------------------------------
    // ---------------------------------------------------------------------------

    capabilities: {
        browserName: 'chrome'
    },
    multiCapabilities: [],

    // ---------------------------------------------------------------------------
    // ----- Global test information ---------------------------------------------
    // ---------------------------------------------------------------------------

    beforeLaunch: function() {
        var resultPath = 'result', screenShotsPath = 'screenShots', failure = 'egg/failure.json';
        if (!fs.existsSync(resultPath)) fs.mkdirSync(resultPath);
        if (!fs.existsSync(screenShotsPath)) fs.mkdirSync(screenShotsPath);

        if (env.clearResult == 'on') {
            //unlink exist results
            fs.readdirSync(resultPath).forEach(
                function(result) {
                    var path = resultPath + '/' + result;
                    if (fs.lstatSync(path).isDirectory() || !fs.existsSync(path)) return;
                    fs.unlinkSync(path);
                }
            );
            //unlink screenshots
            fs.readdirSync(screenShotsPath).forEach(
                function(result) {
                    var path = screenShotsPath + '/' + result;
                    if (fs.lstatSync(path).isDirectory() || !fs.existsSync(path)) return;
                    fs.unlinkSync(path);
                }
            );
            //unlink failure
            if (fs.existsSync(failure)) fs.unlinkSync(failure);
        }//end if
    },
    onPrepare: function() {
        var chai, chaiAsPromised;
        browser.ignoreSynchronization = false;

        chai = require('chai');
        chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);

        global.__base = __dirname;
        global.expect = chai.expect;
        global.common = require(__base + '/lib/common.js');
        //global.constants = require(__base + '/lib/constants.js');
        //global.PageObject = require(__base + '/lib/pages/pageObject.js');
    },
    onComplete: function() {
    },
    onCleanUp: function() {
    },
    afterLaunch: function() {
    },
    params: {
        loginId: '',
        forceRefresh: false
    },

    // ---------------------------------------------------------------------------
    // ----- The test framework --------------------------------------------------
    // ---------------------------------------------------------------------------
    
    // set to "custom" instead of cucumber.
	framework: 'custom',

	// path relative to the current config file
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	
    cucumberOpts: {
        require: 'features/**/*.js',
        tags: [
            process.env.tags || '@E2E,@SMOKE,@REGRESSION,@FUNCTIONALITY',
            '~@X'
        ],
        format: ['pretty', 'json:result/cucumber.json'],
    }
};

// environment variables
env = {
    browserName: process.env.browserName || 'chrome', // chrome || firefox || internet explorer
    tags: process.env.tags || '@E2E,@SMOKE,@REGRESSION,@FUNCTIONALITY',
    parallel: process.env.parallel || 'off',
    clearResult: process.env.clearResult || 'on',
    excludeMode: process.env.excludeMode || 'off'
};
for (var i in env) env[i] = env[i].trim();

config.capabilities.browserName = env.browserName;
config.cucumberOpts.tags = [env.tags, '~@X'];

exports.config = config;