# Top level folders

This is a quick overview of what is in a top level folder.

## src

This is all of the compiled javascript code. It is the place where the source for background, content, and new tab page is. If you are adding new application code this is 99% of the time where the code will go.

## public

The other 1% of code will go here. This a place where static files will be place and will be included into the bundle

## build

This is not in source control but is where the compiled version of the code is.

## config

This is where the build configuration lives, this can be something like web-pack configuration or environment variables.

## scripts

This is where all build, test, and distribution script live. This is largely built from ejecting from `create-react-app`.

## **\_\_mocks\_\_**

This is just top level mocks for Jest
