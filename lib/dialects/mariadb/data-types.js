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
var data_types_exports = {};
__export(data_types_exports, {
  BIGINT: () => import_data_types.BIGINT,
  BOOLEAN: () => import_data_types.BOOLEAN,
  DATE: () => import_data_types.DATE,
  DECIMAL: () => import_data_types.DECIMAL,
  DOUBLE: () => import_data_types.DOUBLE,
  ENUM: () => import_data_types.ENUM,
  FLOAT: () => import_data_types.FLOAT,
  GEOMETRY: () => import_data_types.GEOMETRY,
  INTEGER: () => import_data_types.INTEGER,
  JSON: () => import_data_types2.JSON,
  MEDIUMINT: () => import_data_types.MEDIUMINT,
  REAL: () => import_data_types.REAL,
  SMALLINT: () => import_data_types.SMALLINT,
  TINYINT: () => import_data_types.TINYINT,
  UUID: () => import_data_types.UUID
});
module.exports = __toCommonJS(data_types_exports);
var import_data_types = require("../mysql/data-types.js");
var import_data_types2 = require("../abstract/data-types.js");
//# sourceMappingURL=data-types.js.map
