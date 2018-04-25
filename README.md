# Chatr Web

## Overview

This repository holds the web interface for Chartr. The web interface is built on the [Angular](https://angular.io/)
framework. Currently, the web interface supports the following actions:
* Creating new users
* Posting new trips
* Searching trips
* Requesting to join trips
* Accepting/rejecting interested riders from trips
* Viewing past trips

## Contributors

* Brian Kurek
* Alex Chang

## Contributing

The contribution guide can be found [here](CONTRIBUTING.md).

## Project Documentation

The final project documentation can be found [here](project_documentation.pdf). In addition, API documentation can be generated
by running `npm run docs` after completing the installation instructions found below.

## Installation

To install Chartr Web (for development or deployment), use the following instructions:
1. Install `npm` and `node` on your system
2. Install the [Angular CLI](https://github.com/angular/angular-cli) with `npm install -g @angular/cli`
3. Clone the Chartr Web repository with git
4. Run `npm install` from the root project directory

Once you have completed the above steps, you can use the following commands:
* `ng serve` starts a development server at `http://localhost:4200`. The app will automatically reload if any of the source
  files change
* `ng build` builds the project and stores the build artifacts in the `dist/` directory. The `-prod` flag can be used to
  generate a production build
* `ng test` runs the project unit tests. The `-cc` flag will generate a code coverage report in the `coverage/` directory
* `ng e2e` runs the end-to-end tests via [Protractor](http://www.protractortest.org/)
