# Overview

Engine for OpenFLUID FluidHub services, based on node.js


# Architecture

## Main dependencies

See file [package.json](package.json) for dependencies.


## Source tree

* `fluidhub-cmd.js` : command line tool for fluidhub services management
* `lib/defaultconfig.json` : default configuration settings
* `lib/api-service.js` : main file of the api service
* `lib/webui-service.js` : main file of the web UI service
* `lib/wareshub-gitserver.js` : main file of the git server for wares


## Configuration file

By default, the `defaultconfig.json` file is loaded from the `lib` directory. It is overriden by a `config.json` file if present in the instance data directory

See file [lib/defaultconfig.json](lib/defaultconfig.json) for content.


## Command-line tool

See help for more details :
```
node fluidhub-cmd --help
```
