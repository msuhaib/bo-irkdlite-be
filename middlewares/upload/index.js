module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();
        // console.log(ctx.state);

        if (ctx.request.url.includes("uploads")) {
          console.log(ctx);
          // console.log(ctx.state);
          // if (ctx.state && ctx.state.user) {
          //log trails from API
          // if (!ctx._matchedRoute.includes("admin") && ctx.state.user.provider) {
          //   await strapi.services.trails.create(
          //     strapi.config.functions.trailUtils.createTrailEntry(false, ctx)
          //   );
          // console.log(
          //   strapi.config.functions.trailUtils.createTrailEntry(false, ctx)
          // );
          // }
          // return await next();
          // } else {
          //   ctx.unauthorized(`You're not logged in!`);
          // }
        }
      });
    },
  };
};
