# Loopback Search Endpoint

[![Build Status](https://travis-ci.com/Danwakeem/loopback-search-mixin.svg?branch=master)](https://travis-ci.com/Danwakeem/loopback-search-mixin)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/loopback-search-mixin/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/loopback-search-mixin?branch=master)

This loopback middleware replaces the default `GET /` endpoint with something that is a little more search friendly.

## Useage

## Install
`npm i loopback-search-mixin --save`

## Integrate with Loopback
Include the mixin in your `model-config.json` file

```json
{
  "mixins": [
    "../node_modules/loopback-search-mixin"
  ]
}
```

Then add the mix in to your `model.json` file
```json
"mixins": {
  "Search": true
},
```

## Options
The default behavior of this mixin will set a limit of 10 and offset of 0.
You can override these defaults through the mixin options
```json
"mixins": {
  "Search": {
    "offset": 100,
    "limit": 20,
  }
},
```
