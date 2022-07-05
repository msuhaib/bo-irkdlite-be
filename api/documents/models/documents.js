"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  meilisearch: {
    indexName: "records",
    transformEntry({ entry, model }) {
      return sanitizeEntity(
        {
          ...entry,
          recordType: "document",
          belongsTo: entry.owner?.id,
          folder: entry.folder
            ? { id: entry.folder.id, title: entry.folder.title }
            : null,
          share: entry.share ? entry.share.id : null,
        },
        { model }
      );
    },
    settings: {
      filterableAttributes: ["belongsTo"],
      searchableAttributes: ["title"],
    },
  },
};
