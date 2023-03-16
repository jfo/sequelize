import type { Expression } from '../../sequelize.js';
import { AbstractQueryGenerator } from '../abstract/query-generator';
import type { RemoveIndexQueryOptions, TableNameOrModel, QueryGeneratorOptions, EscapeOptions } from '../abstract/query-generator-typescript';
/**
 * Temporary class to ease the TypeScript migration
 */
export declare class MySqlQueryGeneratorTypeScript extends AbstractQueryGenerator {
    #private;
    constructor(options: QueryGeneratorOptions);
    describeTableQuery(tableName: TableNameOrModel): string;
    showIndexesQuery(tableName: TableNameOrModel): string;
    removeIndexQuery(tableName: TableNameOrModel, indexNameOrAttributes: string | string[], options?: RemoveIndexQueryOptions): string;
    jsonPathExtractionQuery(sqlExpression: string, path: ReadonlyArray<number | string>, unquote: boolean): string;
    formatUnquoteJson(arg: Expression, options?: EscapeOptions): string;
}
