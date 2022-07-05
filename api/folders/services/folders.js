"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async generateSlug(ctx) {
    const slug = await strapi.plugins[
      "content-manager"
    ].services.uid.generateUIDField({
      contentTypeUID: "application::folders.folders",
      field: "slug",
      data: ctx.request.body,
    });
    // console.log("services :: folder :: generateSlug ", slug);
    return slug;
  },
};
