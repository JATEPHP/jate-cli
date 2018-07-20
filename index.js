#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var path = require('path');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var currentPath = process.cwd();
var fs = require('fs');

program
.version('0.0.6', '-v, --version')
.option('-p, --project <project>', 'The project folder name')
.option('-m, --modules', 'Load modules from JATE.json')
.parse(process.argv);

if(program.project)      installWithProject(program.project);
else if(program.modules) installModules();
else                     installLocal();

function installWithProject(project) {
  console.log(chalk.green('PROJECT: '+currentPath+"/"+project));
  if (fs.existsSync(currentPath+"/"+project)) {
    console.error(chalk.red("Project already exist."));
    return;
  }
  mkdirp(currentPath+'/'+project, function (err) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('STEP 1: Created project folder'));
      process.chdir(currentPath+"/"+project);
      console.log(chalk.green('STEP 2: Changed dir'));
      exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
        if (err instanceof Error && err !== null) {
          console.error(chalk.red(err.message));
        } else {
          console.log(chalk.green('STEP 3: Downloaded JATE'));
          ncp(currentPath+"/"+project+"/JATE/examples/01essential", currentPath+"/"+project, function (err) {
            if (err instanceof Error && err !== null) {
              console.error(chalk.red(err.message));
            } else {
              console.log(chalk.green('STEP 4: Init files'));
              console.log(chalk.green('Done!'));
            }
          });
        }
      });
    }
  });
}

function installLocal() {
  exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('Done!'));
    }
  });
}

function installModules() {
  var module = 0;
  var JATE = JSON.parse(fs.readFileSync('JATE.json', 'utf8'));
  process.chdir(currentPath+"/modules");
  console.log(chalk.green('STEP 1: Changed dir'));
  for (var i = 0; i < JATE.modules.length; i++) {
    exec('git clone '+JATE.modules[i], function(err, out, code, i, JATE) {
      if (err instanceof Error && err !== null) {
        console.error(chalk.red(err.message));
      } else {
        module++;
        console.log(chalk.green('Downloaded module '+module));
      }
    });
  }
}
