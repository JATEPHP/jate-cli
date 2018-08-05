#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var path = require('path');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var currentPath = process.cwd();
var fs = require('fs');
var rimraf = require('rimraf');

program
  .option('-p, --project <name>', 'create project with specific name')
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
    case 'modules': installModules();             break;
    case 'juice'  :
    case 'JUICE'  : installGitRepo('JUICE');      break;
    case 'jate'   :
    case 'JATE'   : installGitRepo('JATE');       break;
    case 'example':
      if(program.project !== undefined)
        installExampleWithProject(program.project);
      else
        installExample();
    break;
    case 'react':
      if(program.project !== undefined)
        installExternalExampleWithProject(program.project, 'jate-react');
      else
        installExternalExample('jate-react');
    break;
    case 'advance':
      if(program.project !== undefined)
        installExternalExampleWithProject(program.project, 'jate-advance');
      else
        installExternalExample('jate-advance');
    break;
    default: console.error(chalk.red('Packages not found!')); break;
  }
});


// FUNCTIONS
function installExampleWithProject(project) {
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

function installExample() {
  exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('STEP 1: Downloaded JATE'));
      ncp(currentPath+"/JATE/examples/01essential", currentPath, function (err) {
        if (err instanceof Error && err !== null) {
          console.error(chalk.red(err.message));
        } else {
          console.log(chalk.green('STEP 2: Init files'));
          console.log(chalk.green('Done!'));
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

function installExternalExampleWithProject(project, example) {
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
      exec('git clone https://github.com/XaBerr/'+example+'.git', function(err, out, code) {
        if (err instanceof Error && err !== null) {
          console.error(chalk.red(err.message));
        } else {
          console.log(chalk.green('STEP 3: Downloaded '+example));
          ncp(currentPath+"/"+project+"/"+example, currentPath+"/"+project, function (err) {
            if (err instanceof Error && err !== null) {
              console.error(chalk.red(err.message));
            } else {
              console.log(chalk.green('STEP 4: Init files'));
              rimraf(currentPath+"/"+project+"/"+example, function () {
                console.log(chalk.green('STEP 5: Removed unused folder'));
                exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
                  if (err instanceof Error && err !== null) {
                    console.error(chalk.red(err.message));
                  } else {
                    console.log(chalk.green('STEP 6: Downloaded JATE'));
                    console.log(chalk.green('Done!'));
                  }
                });
              });
            }
          });
        }
      });
    }
  });
}

function installExternalExample(example) {
  exec('git clone https://github.com/XaBerr/'+example+'t.git', function(err, out, code) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('STEP 1: Downloaded '+example));
      ncp(currentPath+"/jate-react", currentPath, function (err) {
        if (err instanceof Error && err !== null) {
          console.error(chalk.red(err.message));
        } else {
          console.log(chalk.green('STEP 2: Init files'));
          rimraf(currentPath+"/"+example, function () {
            console.log(chalk.green('STEP 3: Removed unused folder'));
            exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
              if (err instanceof Error && err !== null) {
                console.error(chalk.red(err.message));
              } else {
                console.log(chalk.green('STEP 4: Downloaded JATE'));
                console.log(chalk.green('Done!'));
              }
            });
          });
        }
      });
    }
  });
}
