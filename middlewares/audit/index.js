module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();

        if (ctx.state && ctx.state.user) {
          //log trails from API
          if (!ctx._matchedRoute.includes("admin") && ctx.state.user.provider) {
            await strapi.services.trails.create(
              strapi.config.functions.trailUtils.createTrailEntry(false, ctx)
            );
            // console.log(
            //   strapi.config.functions.trailUtils.createTrailEntry(false, ctx)
            // );
          }
        }
        if (
          // !ctx._matchedRoute.includes("admin") &&
          // ctx._matchedRoute.includes("auth")
          !ctx.request.url.includes("admin") &&
          ctx.request.url.includes("auth")
        ) {
          await strapi.services.trails.create(
            strapi.config.functions.trailUtils.createTrailEntry(true, ctx)
          );

          // console.log(
          //   strapi.config.functions.trailUtils.createTrailEntry(true, ctx)
          // );
        }
      });
    },
  };
};
