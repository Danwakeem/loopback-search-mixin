const sandbox = require("sinon").createSandbox();
const index = require("./index");

describe("index", () => {
  let Model;
  beforeEach(() => {
    Model = {
      modelName: "TestModel",
      disableRemoteMethodByName: sandbox.spy(),
      remoteMethod: sandbox.spy(),
      count: sandbox.fake.returns(100),
      find: sandbox.fake.returns([{ test: true }])
    };
  });

  afterEach(() => sandbox.restore());

  it("should disable default find endpoint", () => {
    index(Model, {});

    sandbox.assert.calledOnce(Model.disableRemoteMethodByName);
    sandbox.assert.calledWith(Model.disableRemoteMethodByName, "find");
  });

  it("should set up new remote method", () => {
    index(Model, {});

    sandbox.assert.calledOnce(Model.remoteMethod);
    sandbox.assert.calledWith(
      Model.remoteMethod,
      "search",
      sandbox.match({
        description: sandbox.match.string,
        accepts: [
          {
            arg: sandbox.match.string,
            type: sandbox.match.string,
            description: sandbox.match.string
          }
        ],
        http: { path: "/search", verb: "get" },
        returns: {
          root: true,
          type: {
            total: "number",
            limit: "number",
            skip: "number",
            data: [Model.modelName]
          }
        }
      })
    );
  });

  it("should create member function setDefaultFilter", () => {
    index(Model, {});

    Model.setDefaultFilter.should.be.a.Function();
  });

  describe("setDefaultFilter", () => {
    beforeEach(() => index(Model, {}));

    it("should create filter if non exists", () => {
      const filter = Model.setDefaultFilter();
      filter.should.have.keys("limit", "offset");
    });

    it("should add default limit to filter if does not exist", () => {
      const filter = Model.setDefaultFilter({ offset: 5 });
      filter.limit.should.equal(10);
    });

    it("should add default offset to filter if does not exist", () => {
      const filter = Model.setDefaultFilter({ limit: 5 });
      filter.offset.should.equal(0);
    });

    it("should add not override offset or limit if they exist in the filter", () => {
      const filter = Model.setDefaultFilter({ limit: 100, offset: 100 });
      filter.offset.should.equal(100);
      filter.limit.should.equal(100);
    });

    it("should override default mixin limit", () => {
      index(Model, { limit: 20 });
      const filter = Model.setDefaultFilter();
      filter.limit.should.equal(20);
    });

    it("should override default mixin offset", () => {
      index(Model, { offset: 10 });
      const filter = Model.setDefaultFilter();
      filter.offset.should.equal(10);
    });
  });

  describe("search", () => {
    let filterSpy;
    beforeEach(() => {
      index(Model, {});
      filterSpy = sandbox.spy(Model, "setDefaultFilter");
    });

    it("should set default filter", () => {
      Model.search();
      sandbox.assert.calledOnce(filterSpy);
    });

    it("should return payload", async () => {
      const res = await Model.search();
      res.should.deepEqual({
        total: 100,
        limit: 10,
        offset: 0,
        data: [{ test: true }]
      });
    });
  });
});
