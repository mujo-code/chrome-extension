# Coding Style Guide

## Contributions

The standards in this repo are all enforced via CI/CD with [Github Actions](https://help.github.com/en/articles/about-github-actions). Testing and linting is primarily what is checked and to get code merged into this repo.

## Tests

We ask that all contribution have test associated with them. There are of course exceptions but you should attempt to test the new code being added to this repo.

### Technology

We use [Jest](https://jestjs.io/en/) to test this application.
There is a few end to end test in the repo that use [puppeteer](https://github.com/GoogleChrome/puppeteer) to load the extension and make sure it is still functioning properly on a blank install. You can see the current e2e test [here](../src/e2e.test.js).

### Coverage

We use coverage gate to block PR that dip the code coverage too low. There should be zero reason to lower the coverage gates, but bumping up the coverage gates is highly encouraged.

[Current Coverage Gates](../package.json#L102-L103)

## Linting

We ask that all contribution follow the current linting and formatting rules of the repo. There are a few exceptions to that you will see in the repo and if you have one please make sure reviewer know you intention of adding the ignore rules.

### Technology

To Lint the code we use [eslint](http://eslint.org) and to format the code we use [prettier](https://prettier.io/). The configs can be found in the root of the repository. All standards are enforce as is, but can be up for debate in an issues ticket.
