import { AssociationPath } from '../../expression-builders/association-path.js';
import { Attribute } from '../../expression-builders/attribute.js';
import { BaseSqlExpression } from '../../expression-builders/base-sql-expression.js';
import { Cast } from '../../expression-builders/cast.js';
import { Col } from '../../expression-builders/col.js';
import { DialectAwareFn } from '../../expression-builders/dialect-aware-fn.js';
import { Fn } from '../../expression-builders/fn.js';
import { JsonPath } from '../../expression-builders/json-path.js';
import { Literal } from '../../expression-builders/literal.js';
import type { ModelStatic, Attributes, Model } from '../../model.js';
import type { BindOrReplacements, Sequelize, Expression } from '../../sequelize.js';
import type { DataType } from './data-types.js';
import type { TableName, TableNameWithSchema } from './query-interface.js';
import type { WhereOptions } from './where-sql-builder-types.js';
import { WhereSqlBuilder } from './where-sql-builder.js';
import type { AbstractDialect } from './index.js';
export type TableNameOrModel = TableName | ModelStatic;
export interface RemoveIndexQueryOptions {
    concurrently?: boolean;
    ifExists?: boolean;
    cascade?: boolean;
}
export declare const REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS: Set<keyof RemoveIndexQueryOptions>;
export interface QueryGeneratorOptions {
    sequelize: Sequelize;
    dialect: AbstractDialect;
}
/**
 * Options accepted by {@link AbstractQueryGeneratorTypeScript#escape}
 */
export interface EscapeOptions extends FormatWhereOptions {
    readonly type?: DataType | undefined;
}
export interface FormatWhereOptions extends Bindable {
    /**
     * These are used to inline replacements into the query, when one is found inside of a {@link Literal}.
     */
    readonly replacements?: BindOrReplacements | undefined;
    /**
     * The model of the main alias. Used to determine the type & column name of attributes referenced in the where clause.
     */
    readonly model?: ModelStatic | undefined;
    /**
     * The alias of the main table corresponding to {@link FormatWhereOptions.model}.
     * Used as the prefix for attributes that do not reference an association, e.g.
     *
     * ```ts
     * const where = { name: 'foo' };
     * ```
     *
     * will produce
     *
     * ```sql
     * WHERE "<mainAlias>"."name" = 'foo'
     * ```
     */
    readonly mainAlias?: string | undefined;
}
/**
 * Methods that support this option are functions that add values to the query.
 * If {@link Bindable.bindParam} is specified, the value will be added to the query as a bind parameter.
 * If it is not specified, the value will be added to the query as a literal.
 */
export interface Bindable {
    bindParam?(value: unknown): string;
}
/**
 * This is a temporary class used to progressively migrate the AbstractQueryGenerator class to TypeScript by slowly moving its functions here.
 * Always use {@link AbstractQueryGenerator} instead.
 */
export declare class AbstractQueryGeneratorTypeScript {
    protected readonly whereSqlBuilder: WhereSqlBuilder;
    readonly dialect: AbstractDialect;
    protected readonly sequelize: Sequelize;
    constructor(options: QueryGeneratorOptions);
    protected get options(): import("../../sequelize.js").NormalizedOptions;
    describeTableQuery(tableName: TableNameOrModel): string;
    showIndexesQuery(_tableName: TableNameOrModel): string;
    removeIndexQuery(_tableName: TableNameOrModel, _indexNameOrAttributes: string | string[], _options?: RemoveIndexQueryOptions): string;
    extractTableDetails(tableNameOrModel: TableNameOrModel, options?: {
        schema?: string;
        delimiter?: string;
    }): TableNameWithSchema;
    /**
     * Quote table name with optional alias and schema attribution
     *
     * @param param table string or object
     * @param alias alias name
     */
    quoteTable(param: TableNameOrModel, alias?: boolean | string): string;
    /**
     * Adds quotes to identifier
     *
     * @param identifier
     * @param _force
     */
    quoteIdentifier(identifier: string, _force?: boolean): string;
    isSameTable(tableA: TableNameOrModel, tableB: TableNameOrModel): boolean;
    whereQuery<M extends Model>(where: WhereOptions<Attributes<M>>, options?: FormatWhereOptions): string;
    whereItemsQuery<M extends Model>(where: WhereOptions<Attributes<M>> | undefined, options?: FormatWhereOptions): string;
    formatSqlExpression(piece: BaseSqlExpression, options?: EscapeOptions): string;
    protected formatAssociationPath(associationPath: AssociationPath): string;
    protected formatJsonPath(jsonPathVal: JsonPath, options?: EscapeOptions): string;
    /**
     * The goal of this method is to execute the equivalent of json_unquote for the current dialect.
     *
     * @param _arg
     * @param _options
     */
    formatUnquoteJson(_arg: Expression, _options: EscapeOptions | undefined): string;
    /**
     * @param _sqlExpression ⚠️ This is not an identifier, it's a raw SQL expression. It will be inlined in the query.
     * @param _path The JSON path, where each item is one level of the path
     * @param _unquote Whether the result should be unquoted (depending on dialect: ->> and #>> operators, json_unquote function). Defaults to `false`.
     */
    jsonPathExtractionQuery(_sqlExpression: string, _path: ReadonlyArray<number | string>, _unquote: boolean): string;
    protected formatLiteral(piece: Literal, options?: EscapeOptions): string;
    protected formatAttribute(piece: Attribute, options?: EscapeOptions): string;
    protected formatFn(piece: Fn, options?: EscapeOptions): string;
    protected formatDialectAwareFn(piece: DialectAwareFn, options?: EscapeOptions): string;
    protected formatCast(cast: Cast, options?: EscapeOptions): string;
    protected formatCol(piece: Col, options?: EscapeOptions): any;
    /**
     * Escapes a value (e.g. a string, number or date) as an SQL value (as opposed to an identifier).
     *
     * @param value The value to escape
     * @param options The options to use when escaping the value
     */
    escape(value: unknown, options?: EscapeOptions): string;
    /**
     * Validate a value against a field specification
     *
     * @param value The value to validate
     * @param type The DataType to validate against
     */
    validate(value: unknown, type: DataType): void;
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
    escapeList(values: unknown[], options?: EscapeOptions): string;
}
