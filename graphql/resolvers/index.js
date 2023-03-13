const headlineResolver = require("./headline");
const userResolver = require("./user");

const rootResolver = {
  ...headlineResolver,
  ...userResolver
};

module.exports = rootResolver;
