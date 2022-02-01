'use strict';

var elegantSpinner = require('elegant-spinner');
var logUpdate      = require('log-update');
var chalk          = require('chalk');
var OS             = require('os-family');

module.exports = function createElegantStatus (text) {
    var frame     = elegantSpinner();
    var animation = setInterval(function () {
        logUpdate(chalk.yellow(frame()) + ' ' + text);
    }, 50);

    animation.unref();

    function done (success) {
        var status = success ?
                     chalk.green(OS.win ? '√' : '✓') :
                     chalk.red(OS.win ? '×' : '✖');

        clearInterval(animation);
        logUpdate(status + ' ' + text);
        console.log();
    }

    done.updateText = function (newText) {
        text = newText;
    };

    return done;
};
