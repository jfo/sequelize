import type { DataType } from '../dialects/abstract/data-types.js';
import type { Expression } from '../sequelize.js';
import { BaseSqlExpression } from './base-sql-expression.js';
/**
 * Do not use me directly. Use {@link cast}
 */
export declare class Cast extends BaseSqlExpression {
    readonly expression: Expression;
    readonly type: DataType;
    private readonly brand;
    constructor(expression: Expression, type: DataType);
}
/**
 * Creates an object representing a call to the cast function.
 *
 * @param val The value to cast
 * @param type The type to cast it to
 */
export declare function cast(val: unknown, type: DataType): Cast;
