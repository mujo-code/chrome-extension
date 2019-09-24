# Releases

For the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions) all you have to upload is a zip file of the build. This is somewhat automated using the dist script.

```shell
npm run dist
```

Running `dist` should output a file like **`Mujo-1.3.0.zip`** which is `${shortname}-${version}.zip`. This is the zip file you would upload to the store.

### BETA

To build the dist for BETA run.

```shell
npm run dist:beta
```

Running `dist:beta` has some additional logic to change the icon, and name to be different then production, and also produces a zip file like `BETAMujo-1.3.0.0001.zip` so that way a BETA zip is not accidentally uploaded to production.
