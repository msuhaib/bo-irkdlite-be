"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
module.exports = {
  create: async (ctx) => {
    const user = ctx.state.user;
    const slug = await strapi.services.documents.generateSlug(ctx);

    let createDocument;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      createDocument = await strapi.services.documents.create(
        { ...data, owner: user, slug },
        { files }
      );
      // console.log(files);
    } else {
      createDocument = await strapi.services.documents.create({
        ...ctx.request.body,
        owner: user,
        slug,
      });
    }
    return sanitizeEntity(createDocument, { model: strapi.models.documents });
  },
  mydocs: async (ctx) => {
    const user = ctx.state.user;
    const results = await strapi.services.documents.find({
      owner: user.id,
      _sort: "updated_at:DESC",
    });
    return results.map((entity) =>
      sanitizeEntity(
        { ...entity, belongsTo: entity.owner.email },
        { model: strapi.models.documents }
      )
    );
  },
  rootDocs: async (ctx) => {
    const user = ctx.state.user;
    // const knex = strapi.connections.default;
    // const results = await knex("documents")
    //   .select("*")
    //   .where("owner", user.id)
    //   .where("folder", null)
    //   .orderBy("updated_at", "desc")
    //   .join("content");
    const results = await strapi.services.documents.find({
      // _where: [{ folder_null: true }],
      owner: user.id,
      folder_null: false,
      // _sort: "updated_at:DESC",
    });
    return results.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.documents })
    );
  },
};
