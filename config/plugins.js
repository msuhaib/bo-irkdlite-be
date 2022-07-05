const { sanitizeEntity } = require("strapi-utils");
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "msuhaib@bizobjek.com",
      defaultReplyTo: "msuhaib@bizobjek.com",
      testAddress: "msuhaib@bizobjek.com",
    },
  },
});
