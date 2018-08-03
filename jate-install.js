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
  // .option('-d, --dir <folder>', 'create in subfolder')
  // .option('-f, --force', 'force installation')
  .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
  console.error(chalk.red('Packages required!'));
  process.exit(1);
}

// if (program.force)
//   console.log('force: install');

pkgs.forEach(function(pkg) {
  console.log(chalk.green('Installing : %s'), pkg);
  switch (pkg) {
    case 'modules': installModules(); break;
    case 'juice'  :
    case 'JUICE'  : installGitRepo('JUICE');   break;
    case 'jate'   :
    case 'JATE'   : installGitRepo('JATE');    break;
    default: console.error(chalk.red('Packages not found!')); break;

  }
});


// FUNCTIONS

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

function installModules() {
  var module = 0;
  var file = null;
  var JATE = null;
  try {
    file = fs.readFileSync('JATE.json', 'utf8');
  } catch (e) {
    console.error(chalk.red('File JATE.json not found!'));
    process.exit(1);
  }
  try {
    JATE = JSON.parse(file);
  } catch (e) {
    console.error(chalk.red('Bad json format for JATE.json!'));
    process.exit(1);
  }
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

function installGitRepo( _repo ) {
  exec('git clone https://github.com/XaBerr/'+_repo+'.git', function(err, out, code) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('Done!'));
    }
  });
}
