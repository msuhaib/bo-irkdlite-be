"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  myshares: async (ctx) => {
    const user = ctx.state.user;
    const results = await strapi.services.share.find({
      user: user.id,
      _sort: "updated_at:DESC",
    });
    return results.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.share })
    );
  },
};
