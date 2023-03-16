/// <reference types="node" />
import { Where } from '../expression-builders/where.js';
export declare function isNullish(val: unknown): val is null | undefined;
export declare function isNodeError(val: unknown): val is NodeJS.ErrnoException;
/**
 * Some dialects emit an Error with a string code, that are not ErrnoException.
 * This serves as a more generic check for those cases.
 *
 * @param val The value to check
 */
export declare function isErrorWithStringCode(val: unknown): val is Error & {
    code: string;
};
export declare function assertIsErrorWithStringCode(val: unknown): asserts val is Error & {
    code: string;
};
export declare function isError(val: unknown): val is Error;
export declare function assertCaughtError(val: unknown): asserts val is Error;
export declare function isString(val: unknown): val is string;
export declare function isBigInt(val: unknown): val is bigint;
export declare function isNumber(val: unknown): val is number;
/**
 * Works like lodash's isPlainObject, but has better typings
 *
 * @param value The value to check
 */
export declare function isPlainObject(value: unknown): value is object;
/**
 * This function is the same as {@link isPlainObject}, but types the result as a Record / Dictionary.
 * This function won't be necessary starting with TypeScript 4.9, thanks to improvements to the TS object type,
 * but we have to keep it until we drop support for TS < 4.9.
 *
 * @param value
 */
export declare function isDictionary(value: unknown): value is Record<PropertyKey, unknown>;
/**
 * Returns whether `value` is using the nested syntax for attributes.
 *
 * @param value The attribute reference to check.
 *
 * @example
 * ```javascript
 * isColString('$id$'); // true
 * isColString('$project.name$'); // true
 * isColString('name'); // false
 * ```
 */
export declare function isColString(value: string): boolean;
export declare function canTreatArrayAsAnd(arr: unknown[]): arr is Array<object | Where>;
/**
 * For use in per-dialect implementation of methods to warn the user when they use an option that TypeScript declares as valid,
 * but that the dialect they use does not support.
 *
 * @param methodName The name of the method that received the options
 * @param dialectName The name of the dialect to which the implementation belongs
 * @param allSupportableOptions All options that this method *can* support. The ones that are declared in TypeScript typings.
 * @param supportedOptions The subset of options that this dialect *actually does* support.
 * @param receivedOptions The user provided options that were passed to the method.
 */
export declare function rejectInvalidOptions(methodName: string, dialectName: string, allSupportableOptions: Set<string>, supportedOptions: Set<string>, receivedOptions: object): void;
export declare function buildInvalidOptionReceivedError(methodName: string, dialectName: string, invalidOptions: string[]): Error;
