const util = require("util");
const search = require("./src/index");

module.exports = util.deprecate(
  app => app.loopback.modelBuilder.mixins.define("Search", search),
  "DEPRECATED: Use mixinSources, see https://github.com/clarkbw/loopback-ds-timestamp-mixin#mixinsources"
);
