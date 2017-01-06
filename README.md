# Overview

Architecture for OpenFLUID FluidHub services, based on Docker containers managed by docker-compose

# Usage

Use `fluidhub-ctl` script to control the services. It relies on docker-compose to manage the services containers:
```
fluidhub-ctl <docker-compose commands and options>
```

The root path to data must be set in the `FLUIDHUB_DATAPATH` environment variable before using `fluidhub-ctl`

```
export FLUIDHUB_DATAPATH=/path/to/data
```

To start the FluidHub services:
```
fluidhub-ctl up
```

To shut down the FluidHub services:
```
fluidhub-ctl down
```

To put the FluidHub services in development mode, you have to set the `FLUIDHUB_ENV` environment variable value to `dev`. In this case, the `FLUIDHUB_DATAPATH` variable is automatically set to a `_dev/data` directory located at the root of the source tree. You have to create this directory and subdirectories, and put here the data for development mode.

To start the FluidHub services in development mode:
```
FLUIDHUB_ENV=dev fluidhub-ctl up
```

To shut down the FluidHub services when in development mode:
```
FLUIDHUB_ENV=dev fluidhub-ctl down
```
