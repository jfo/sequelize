import { BaseSqlExpression } from './base-sql-expression.js';
/**
 * Use {@link @sequelize/core.list} instead.
 */
export declare class List extends BaseSqlExpression {
    readonly values: unknown[];
    private readonly brand;
    constructor(values: unknown[]);
}
/**
 * Used to represent an SQL list of values, e.g. `WHERE id IN (1, 2, 3)`. This ensure that the array is interpreted
 * as an SQL list, and not as an SQL Array.
 *
 * @example
 * ```ts
 * sequelize.query(sql`SELECT * FROM users WHERE id IN ${list([1, 2, 3])}`);
 * ```
 *
 * Will generate:
 *
 * ```sql
 * SELECT * FROM users WHERE id IN (1, 2, 3)
 * ```
 *
 * @param values The members of the list.
 */
export declare function list(values: unknown[]): List;