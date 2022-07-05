"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const _ = require("lodash");
const slugify = require("@sindresorhus/slugify");
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  meilisearch: {
    indexName: "records",
    transformEntry({ entry, model }) {
      // strapi.log.debug(entry.created_by);
      return sanitizeEntity(
        {
          ...entry,
          recordType: "folder",
          belongsTo: entry.owner?.id,
          documents: entry.documents.length
            ? entry.documents.map((doc) => doc.title)
            : null,
        },
        { model }
      );
    },
    settings: {
      filterableAttributes: ["belongsTo"],
      searchableAttributes: ["title"],
    },
  },
  lifecycles: {
    // async beforeCreate(data) {
    //   //   const { contentTypeUID, field, obj } = data;
    //   return data;
    // },
    // async beforeUpdate(params, data) {
    // strapi.log.debug("before update");
    // strapi.log.debug(data.title);
    //   if (data.title) {
    //     data.slug = slugify(data.title, {lower: true});
    //   }
    // },
  },
};
