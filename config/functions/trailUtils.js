"use strict";
module.exports = {
  removePasswords(reqParam) {
    const { password, ...restReq } = reqParam;
    return restReq;
  },
  getContentType(path) {
    if (path.includes("auth")) {
      return "authentication";
    }
    if (path.includes("users")) {
      return "users";
    }
    //error during forgot password
    if (path.includes(":id")) {
      return path.substring(1).replace("/:id", "");
    }
    return path.substring(1);
  },
  getActionType(method, path, param) {
    if (method.toLowerCase() === "get" && path.includes("users")) {
      return "profile view";
    }
    if (method.toLowerCase() === "post" && path.includes("auth")) {
      return "login";
    }
    if (method.toLowerCase() === "post") {
      return `created new`;
    }
    if (method.toLowerCase() === "get") {
      return `list all`;
    }
    if (method.toLowerCase() === "get" && path.includes(":id")) {
      if (param.id) {
        // return `get specific ${path.substring(1).replace("/:id", "")} id: ${
        //   param.id
        // }`;
        return `view`;
      } else {
        // return `count list ${path.substring(1).replace("/:id", "")}`;
        return `count`;
      }
    }
    if (method.toLowerCase() === "delete" && path.includes(":id")) {
      if (param.id) {
        // return `delete specific ${path.substring(1).replace("/:id", "")} id: ${
        //   param.id
        // }`;
        return `delete`;
      }
    }
    if (method.toLowerCase() === "put" && path.includes(":id")) {
      if (param.id) {
        // return `delete specific ${path.substring(1).replace("/:id", "")} id: ${
        //   param.id
        // }`;
        return `update`;
      }
    }
  },
  getExactRoute(koaRoute, param) {
    if (koaRoute.includes(":id")) {
      return param.id || param["0"];
    }
    return koaRoute;
  },
  createTrailEntry(isAuth, ctx) {
    let entry = {
      contentType: this.getContentType(ctx._matchedRoute),
      action: this.getActionType(
        ctx.request.method,
        ctx._matchedRoute,
        ctx.params
      ),
      statusCode: ctx.response.status,
      author: {
        id: isAuth ? ctx.response.body.user.id : ctx.state.user.id,
        email: isAuth ? ctx.response.body.user.email : ctx.state.user.email,
        ip: ctx.request.ip,
      },
      method: ctx.request.method,
      route: this.getExactRoute(ctx._matchedRoute, ctx.params),
      params: this.removePasswords(ctx.params),
      request: ctx.request.body,
    };
    return entry;
  },
};
