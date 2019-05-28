module.exports = (Model, options) => {
  // Disable the default find endpoint
  Model.disableRemoteMethodByName("find");
  const searchPayload = {
    total: "number",
    limit: "number",
    skip: "number",
    data: [Model.modelName]
  };
  const defaultLimit = options && options.limit ? options.limit : 10;
  const defaultOffset = options && options.offset ? options.offset : 0;

  Model.remoteMethod("search", {
    description:
      "Find all instances of the model matched by filter from the data source. The default limit is 10 and the default offset is 0.", // eslint-disable-line max-len
    accepts: [
      {
        arg: "filter",
        type: "object",
        description:
          'Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (`{"where":{"something":"value"}}`). See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.' // eslint-disable-line max-len
      }
    ],
    http: { path: "/search", verb: "get" },
    returns: { root: true, type: searchPayload }
  });

  Model.setDefaultFilter = filter => {
    if (!filter) return { limit: defaultLimit, offset: defaultOffset };
    if (!("limit" in filter)) filter.limit = defaultLimit;
    if (!("offset" in filter)) filter.offset = defaultOffset;
    return filter;
  };

  Model.search = async filter => {
    filter = Model.setDefaultFilter(filter);

    return {
      total: await Model.count(filter.where),
      limit: filter.limit,
      offset: filter.offset,
      data: await Model.find(filter)
    };
  };
};
