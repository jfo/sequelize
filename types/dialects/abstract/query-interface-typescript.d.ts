import type { Sequelize } from '../../sequelize';
import type { AbstractQueryGenerator } from './query-generator';
import type { CreateSchemaOptions, QueryInterfaceOptions } from './query-interface.types';
/**
 * This is a temporary class used to progressively migrate the AbstractQueryInterface class to TypeScript by slowly moving its functions here.
 * Always use {@link AbstractQueryInterface} instead.
 */
export declare class AbstractQueryInterfaceTypeScript {
    readonly sequelize: Sequelize;
    readonly queryGenerator: AbstractQueryGenerator;
    constructor(options: QueryInterfaceOptions);
    /**
     * Creates a new database schema.
     *
     * **Note:** this is a schema in the [postgres sense of the word](http://www.postgresql.org/docs/9.1/static/ddl-schemas.html),
     * not a database table. In mysql and sqlite, this command will do nothing.
     *
     * @param schema
     * @param options
     */
    createSchema(schema: string, options?: CreateSchemaOptions): Promise<void>;
}
