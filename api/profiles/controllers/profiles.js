"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async updateMe(ctx) {
    let entity;
    // get authenticated user details
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorized header found" }] },
      ]);
    }
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data["user"] = user;
      entity = await strapi.services.profiles.update({ user: user.id }, data, {
        files,
      });
    } else {
      const data = ctx.request.body;
      data["user"] = user;
      entity = await strapi.services.profiles.update({ user: user.id }, data);
    }

    return sanitizeEntity(entity, { model: strapi.models.profiles });
  },

  async findMe(ctx) {
    let entities;
    //get authenticated user details
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorized header was found" }] },
      ]);
    }
    entities = await strapi.query("profiles").find({ user: user.id });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.profiles })
    );
  },
  async createMe(ctx) {
    let entity;
    // get authanticated user details
    const user = ctx.state.user;
    if (!user) {
      return ctx.request(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data["user"] = user;
      entity = await strapi.services.profiles.create(data, { files });
    } else {
      const data = ctx.request.body;
      data["user"] = user;
      entity = await strapi.services.profiles.create(data);
    }
    return sanitizeEntity(entity, { model: strapi.models.profiles });
  },
};
