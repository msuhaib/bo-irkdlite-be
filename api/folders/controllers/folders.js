"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  create: async (ctx) => {
    const user = ctx.state.user;

    const slug = await strapi.services.folders.generateSlug(ctx);
    const createFolder = await strapi.services.folders.create({
      ...ctx.request.body,
      owner: user,
      slug,
    });
    return sanitizeEntity(createFolder, { model: strapi.models.folders });
  },
  myfolders: async (ctx) => {
    const user = ctx.state.user;
    const results = await strapi.services.folders.find({
      owner: user.id,
      _sort: "updated_at:DESC",
    });
    return results.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.folders })
    );
  },
  // find: async (ctx) => {
  //   const user = ctx.state.user;
  //   const logEntry = await strapi.services.folders.getAuditActivity(ctx);
  //   // console.log(ctx.state);
  //   console.log(strapi.log);
  //   const results = await strapi.services.folders.find({ owner: user.id });

  //   return results.map((entity) =>
  //     sanitizeEntity(entity, { model: strapi.models.folders })
  //   );
  // },
};
