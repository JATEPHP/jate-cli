# jate-cli
Command line interface for [JATE](https://github.com/XaBerr/JATE)

## Install
1. Install [npm](https://docs.npmjs.com/getting-started/installing-node)
2. Execute the command
```
npm install jate-cli -g
```

## Commands
1. `jate`<br>
To install JATE directly in `./`

2. `jate -p project_name`<br>
To install JATE in `./project_name/JATE`

3. `jate -m`<br>
To install modules in `./modules` from __JATE.json__

```json
{
  "name": "mediaTraining",
  "modules": [
    "ssh://user@server/opt/git/Project1.git",
    "ssh://user@server/opt/git/Project2.git"
  ]
}

```
