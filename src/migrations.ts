import {
  MigrationOperation,
  MigrationFunction,
} from "@shopify/shopify-app-session-storage";

import { MySqlConnection } from "./mysql-connection";

export const migrationList = [
  new MigrationOperation(
    "migrateScopeFieldToVarchar1024",
    migrateScopeFieldToVarchar1024 as MigrationFunction
  ),
];

// need change the sizr of the scope column from 255 to 1024 char
export async function migrateScopeFieldToVarchar1024(
  connection: MySqlConnection
): Promise<void> {
  await connection.query(`ALTER TABLE ${connection.sessionStorageIdentifier} 
      MODIFY COLUMN scope varchar(1024)`);
}
