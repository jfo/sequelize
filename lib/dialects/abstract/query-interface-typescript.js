"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_interface_typescript_exports = {};
__export(query_interface_typescript_exports, {
  AbstractQueryInterfaceTypeScript: () => AbstractQueryInterfaceTypeScript
});
module.exports = __toCommonJS(query_interface_typescript_exports);
class AbstractQueryInterfaceTypeScript {
  sequelize;
  queryGenerator;
  constructor(options) {
    this.sequelize = options.sequelize;
    this.queryGenerator = options.queryGenerator;
  }
  /**
   * Creates a new database schema.
   *
   * **Note:** this is a schema in the [postgres sense of the word](http://www.postgresql.org/docs/9.1/static/ddl-schemas.html),
   * not a database table. In mysql and sqlite, this command will do nothing.
   *
   * @param schema
   * @param options
   */
  async createSchema(schema, options) {
    const sql = this.queryGenerator.createSchemaQuery(schema, options);
    await this.sequelize.queryRaw(sql, options);
  }
}
//# sourceMappingURL=query-interface-typescript.js.map
