# Loopback Search Endpoint
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