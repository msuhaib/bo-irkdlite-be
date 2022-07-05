"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const { parseMultipartData } = require("strapi-utils");
module.exports = {
  async generateSlug(ctx) {
    let reqData = {};
    if (ctx.is("multipart")) {
      const { data } = parseMultipartData(ctx);
      reqData = data;
    } else {
      reqData = ctx.request.body;
    }
    const slug = await strapi.plugins[
      "content-manager"
    ].services.uid.generateUIDField({
      contentTypeUID: "application::documents.documents",
      field: "slug",
      data: reqData,
    });
    // console.log("services :: documents :: generateSlug ", slug);
    return slug;
  },
};
