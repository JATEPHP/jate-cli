# jate-cli
Command line interface for [JATE](https://github.com/XaBerr/JATE)

## Install
1. Install [npm](https://docs.npmjs.com/getting-started/installing-node)
2. Execute the command
```
npm install jate-cli -g
```

## Commands
1. `jate install jate`<br>
To install JATE directly in `./`

2. `jate install juice`<br>
To install JUICE directly in `./`

3. `jate install example`<br>
To install JATE example in `./`

3. `jate install example -p projectName`<br>
To install JATE example in `./projectName`

4. `jate install modules`<br>
To install modules in `./modules` from __JATE.json__

```json
{
  "name": "projectName",
  "tags": [
    "tag1",
    "tag2"
  ],
  "modules": [
    "ssh://user@server/opt/git/Project1.git",
    "ssh://user@server/opt/git/Project2.git"
  ]
}

```
