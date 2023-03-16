"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_generator_typescript_exports = {};
__export(query_generator_typescript_exports, {
  AbstractQueryGeneratorTypeScript: () => AbstractQueryGeneratorTypeScript,
  REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS: () => REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS
});
module.exports = __toCommonJS(query_generator_typescript_exports);
var import_node_util = __toESM(require("node:util"));
var import_isObject = __toESM(require("lodash/isObject"));
var import_association_path = require("../../expression-builders/association-path.js");
var import_attribute = require("../../expression-builders/attribute.js");
var import_base_sql_expression = require("../../expression-builders/base-sql-expression.js");
var import_cast = require("../../expression-builders/cast.js");
var import_col = require("../../expression-builders/col.js");
var import_dialect_aware_fn = require("../../expression-builders/dialect-aware-fn.js");
var import_fn = require("../../expression-builders/fn.js");
var import_identifier = require("../../expression-builders/identifier.js");
var import_json_path = require("../../expression-builders/json-path.js");
var import_list = require("../../expression-builders/list.js");
var import_literal = require("../../expression-builders/literal.js");
var import_value = require("../../expression-builders/value.js");
var import_where = require("../../expression-builders/where.js");
var import_operators = require("../../operators.js");
var import_sql_string = require("../../sql-string.js");
var import_check = require("../../utils/check.js");
var import_deprecations = require("../../utils/deprecations.js");
var import_dialect = require("../../utils/dialect.js");
var import_model_utils = require("../../utils/model-utils.js");
var import_object = require("../../utils/object.js");
var import_sql = require("../../utils/sql.js");
var import_data_types_utils = require("./data-types-utils.js");
var import_data_types = require("./data-types.js");
var import_where_sql_builder = require("./where-sql-builder.js");
const REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS = /* @__PURE__ */ new Set(["concurrently", "ifExists", "cascade"]);
class AbstractQueryGeneratorTypeScript {
  whereSqlBuilder;
  dialect;
  sequelize;
  constructor(options) {
    if (!options.sequelize) {
      throw new Error("QueryGenerator initialized without options.sequelize");
    }
    if (!options.dialect) {
      throw new Error("QueryGenerator initialized without options.dialect");
    }
    this.sequelize = options.sequelize;
    this.dialect = options.dialect;
    this.whereSqlBuilder = new import_where_sql_builder.WhereSqlBuilder(this);
  }
  get options() {
    return this.sequelize.options;
  }
  describeTableQuery(tableName) {
    return `DESCRIBE ${this.quoteTable(tableName)};`;
  }
  showIndexesQuery(_tableName) {
    throw new Error(`showIndexesQuery has not been implemented in ${this.dialect.name}.`);
  }
  removeIndexQuery(_tableName, _indexNameOrAttributes, _options) {
    throw new Error(`removeIndexQuery has not been implemented in ${this.dialect.name}.`);
  }
  // TODO: rename to "normalizeTable" & move to sequelize class
  extractTableDetails(tableNameOrModel, options) {
    const tableNameObject = (0, import_model_utils.isModelStatic)(tableNameOrModel) ? tableNameOrModel.getTableName() : (0, import_check.isString)(tableNameOrModel) ? { tableName: tableNameOrModel } : tableNameOrModel;
    if (!(0, import_check.isPlainObject)(tableNameObject)) {
      throw new Error(`Invalid input received, got ${import_node_util.default.inspect(tableNameOrModel)}, expected a Model Class, a TableNameWithSchema object, or a table name string`);
    }
    delete tableNameObject.toString;
    return {
      ...tableNameObject,
      schema: (options == null ? void 0 : options.schema) || tableNameObject.schema || this.options.schema || this.dialect.getDefaultSchema(),
      delimiter: (options == null ? void 0 : options.delimiter) || tableNameObject.delimiter || "."
    };
  }
  /**
   * Quote table name with optional alias and schema attribution
   *
   * @param param table string or object
   * @param alias alias name
   */
  quoteTable(param, alias = false) {
    if ((0, import_model_utils.isModelStatic)(param)) {
      param = param.getTableName();
    }
    const tableName = this.extractTableDetails(param);
    if ((0, import_isObject.default)(param) && ("as" in param || "name" in param)) {
      throw new Error('parameters "as" and "name" are not allowed in the first parameter of quoteTable, pass them as the second parameter.');
    }
    if (alias === true) {
      alias = tableName.tableName;
    }
    let sql = "";
    if (this.dialect.supports.schemas) {
      if (tableName.schema && tableName.schema !== this.dialect.getDefaultSchema()) {
        sql += `${this.quoteIdentifier(tableName.schema)}.`;
      }
      sql += this.quoteIdentifier(tableName.tableName);
    } else {
      const fakeSchemaPrefix = tableName.schema && tableName.schema !== this.dialect.getDefaultSchema() ? tableName.schema + (tableName.delimiter || ".") : "";
      sql += this.quoteIdentifier(fakeSchemaPrefix + tableName.tableName);
    }
    if (alias) {
      sql += ` AS ${this.quoteIdentifier(alias)}`;
    }
    return sql;
  }
  /**
   * Adds quotes to identifier
   *
   * @param identifier
   * @param _force
   */
  // TODO: memoize last result
  quoteIdentifier(identifier, _force) {
    return (0, import_dialect.quoteIdentifier)(identifier, this.dialect.TICK_CHAR_LEFT, this.dialect.TICK_CHAR_RIGHT);
  }
  isSameTable(tableA, tableB) {
    if (tableA === tableB) {
      return true;
    }
    tableA = this.extractTableDetails(tableA);
    tableB = this.extractTableDetails(tableB);
    return tableA.tableName === tableB.tableName && tableA.schema === tableB.schema;
  }
  whereQuery(where, options) {
    const query = this.whereItemsQuery(where, options);
    if (query && query.length > 0) {
      return `WHERE ${query}`;
    }
    return "";
  }
  whereItemsQuery(where, options) {
    return this.whereSqlBuilder.formatWhereOptions(where, options);
  }
  formatSqlExpression(piece, options) {
    if (piece instanceof import_literal.Literal) {
      return this.formatLiteral(piece, options);
    }
    if (piece instanceof import_fn.Fn) {
      return this.formatFn(piece, options);
    }
    if (piece instanceof import_list.List) {
      return this.escapeList(piece.values, options);
    }
    if (piece instanceof import_value.Value) {
      return this.escape(piece.value, options);
    }
    if (piece instanceof import_identifier.Identifier) {
      return this.quoteIdentifier(piece.value);
    }
    if (piece instanceof import_cast.Cast) {
      return this.formatCast(piece, options);
    }
    if (piece instanceof import_col.Col) {
      return this.formatCol(piece, options);
    }
    if (piece instanceof import_attribute.Attribute) {
      return this.formatAttribute(piece, options);
    }
    if (piece instanceof import_where.Where) {
      if (piece.where instanceof import_where_sql_builder.PojoWhere) {
        return this.whereSqlBuilder.formatPojoWhere(piece.where, options);
      }
      return this.whereSqlBuilder.formatWhereOptions(piece.where, options);
    }
    if (piece instanceof import_json_path.JsonPath) {
      return this.formatJsonPath(piece, options);
    }
    if (piece instanceof import_association_path.AssociationPath) {
      return this.formatAssociationPath(piece);
    }
    if (piece instanceof import_dialect_aware_fn.DialectAwareFn) {
      return this.formatDialectAwareFn(piece, options);
    }
    throw new Error(`Unknown sequelize method ${piece.constructor.name}`);
  }
  formatAssociationPath(associationPath) {
    return `${this.quoteIdentifier(associationPath.associationPath.join("->"))}.${this.quoteIdentifier(associationPath.attributeName)}`;
  }
  formatJsonPath(jsonPathVal, options) {
    const value = this.escape(jsonPathVal.expression, options);
    if (jsonPathVal.path.length === 0) {
      return value;
    }
    return this.jsonPathExtractionQuery(value, jsonPathVal.path, false);
  }
  /**
   * The goal of this method is to execute the equivalent of json_unquote for the current dialect.
   *
   * @param _arg
   * @param _options
   */
  formatUnquoteJson(_arg, _options) {
    if (!this.dialect.supports.jsonOperations) {
      throw new Error(`Unquoting JSON is not supported by ${this.dialect.name} dialect.`);
    }
    throw new Error(`formatUnquoteJson has not been implemented in ${this.dialect.name}.`);
  }
  /**
   * @param _sqlExpression ⚠️ This is not an identifier, it's a raw SQL expression. It will be inlined in the query.
   * @param _path The JSON path, where each item is one level of the path
   * @param _unquote Whether the result should be unquoted (depending on dialect: ->> and #>> operators, json_unquote function). Defaults to `false`.
   */
  jsonPathExtractionQuery(_sqlExpression, _path, _unquote) {
    if (!this.dialect.supports.jsonOperations) {
      throw new Error(`JSON Paths are not supported in ${this.dialect.name}.`);
    }
    throw new Error(`jsonPathExtractionQuery has not been implemented in ${this.dialect.name}.`);
  }
  formatLiteral(piece, options) {
    const sql = piece.val.map((part) => {
      if (part instanceof import_base_sql_expression.BaseSqlExpression) {
        return this.formatSqlExpression(part, options);
      }
      return part;
    }).join("");
    if (options == null ? void 0 : options.replacements) {
      return (0, import_sql.injectReplacements)(sql, this.dialect, options.replacements, {
        onPositionalReplacement: () => {
          throw new TypeError(`The following literal includes positional replacements (?).
Only named replacements (:name) are allowed in literal() because we cannot guarantee the order in which they will be evaluated:
\u279C literal(${JSON.stringify(sql)})`);
        }
      });
    }
    return sql;
  }
  formatAttribute(piece, options) {
    const model = options == null ? void 0 : options.model;
    const columnName = (model == null ? void 0 : model.modelDefinition.getColumnNameLoose(piece.attributeName)) ?? piece.attributeName;
    if (options == null ? void 0 : options.mainAlias) {
      return `${this.quoteIdentifier(options.mainAlias)}.${this.quoteIdentifier(columnName)}`;
    }
    return this.quoteIdentifier(columnName);
  }
  formatFn(piece, options) {
    const argEscapeOptions = piece.args.length > 0 && (options == null ? void 0 : options.type) ? { ...options, type: void 0 } : options;
    const args = piece.args.map((arg) => {
      return this.escape(arg, argEscapeOptions);
    }).join(", ");
    return `${piece.fn}(${args})`;
  }
  formatDialectAwareFn(piece, options) {
    const argEscapeOptions = piece.args.length > 0 && (options == null ? void 0 : options.type) ? { ...options, type: void 0 } : options;
    return piece.apply(this.dialect, argEscapeOptions);
  }
  formatCast(cast, options) {
    const type = this.sequelize.normalizeDataType(cast.type);
    const castSql = (0, import_where_sql_builder.wrapAmbiguousWhere)(cast.expression, this.escape(cast.expression, { ...options, type }));
    const targetSql = (0, import_data_types_utils.attributeTypeToSql)(type).toUpperCase();
    return `CAST(${castSql} AS ${targetSql})`;
  }
  formatCol(piece, options) {
    if (piece.identifiers.length === 1 && piece.identifiers[0].startsWith("*")) {
      return "*";
    }
    const identifiers = piece.identifiers.length === 1 ? piece.identifiers[0] : piece.identifiers;
    return this.quote(identifiers, options == null ? void 0 : options.model, void 0, options);
  }
  /**
   * Escapes a value (e.g. a string, number or date) as an SQL value (as opposed to an identifier).
   *
   * @param value The value to escape
   * @param options The options to use when escaping the value
   */
  escape(value, options = import_object.EMPTY_OBJECT) {
    if ((0, import_check.isDictionary)(value) && import_operators.Op.col in value) {
      (0, import_deprecations.noOpCol)();
      value = new import_col.Col(value[import_operators.Op.col]);
    }
    if (value instanceof import_base_sql_expression.BaseSqlExpression) {
      return this.formatSqlExpression(value, options);
    }
    if (value === void 0) {
      throw new TypeError('"undefined" cannot be escaped');
    }
    let { type } = options;
    if (type != null) {
      type = this.sequelize.normalizeDataType(type);
    }
    if (value === null && (!(type instanceof import_data_types.AbstractDataType) || !type.acceptsNull())) {
      if (options.bindParam) {
        return options.bindParam(null);
      }
      return "NULL";
    }
    if (type == null || typeof type === "string") {
      type = (0, import_sql_string.bestGuessDataTypeOfVal)(value, this.dialect);
    } else {
      type = this.sequelize.normalizeDataType(type);
    }
    this.validate(value, type);
    if (options.bindParam) {
      return type.getBindParamSql(value, options);
    }
    return type.escape(value);
  }
  /**
   * Validate a value against a field specification
   *
   * @param value The value to validate
   * @param type The DataType to validate against
   */
  validate(value, type) {
    if (this.sequelize.options.noTypeValidation || (0, import_check.isNullish)(value)) {
      return;
    }
    if ((0, import_check.isString)(type)) {
      return;
    }
    type = this.sequelize.normalizeDataType(type);
    const error = (0, import_data_types_utils.validateDataType)(value, type);
    if (error) {
      throw error;
    }
  }
  /**
   * Escapes an array of values (e.g. strings, numbers or dates) as an SQL List of values.
   *
   * @param values The list of values to escape
   * @param options
   *
   * @example
   * ```ts
   * const values = [1, 2, 3];
   * queryGenerator.escapeList([1, 2, 3]); // '(1, 2, 3)'
   */
  escapeList(values, options) {
    return `(${values.map((value) => this.escape(value, options)).join(", ")})`;
  }
}
//# sourceMappingURL=query-generator-typescript.js.map
