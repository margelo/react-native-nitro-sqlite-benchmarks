// import performance from 'react-native-performance';
import Chance from "chance";
import { DB, open } from "@op-engineering/op-sqlite";

const chance = new Chance();

export let OPSQLiteTestDb: DB | undefined;
export function resetOPSQLiteTestDb() {
  try {
    if (OPSQLiteTestDb != null) {
      OPSQLiteTestDb.close();
      OPSQLiteTestDb.delete();
    }
    OPSQLiteTestDb = open({
      name: "test",
    });

    OPSQLiteTestDb.execute("DROP TABLE IF EXISTS User;");
    OPSQLiteTestDb.execute(
      "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
    );
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}

const ROWS = 300000;
export let OPSQLiteLargeDb: DB | undefined;
export async function resetOpSQLiteLargeDb() {
  try {
    if (OPSQLiteLargeDb != null) {
      OPSQLiteLargeDb.close();
      OPSQLiteLargeDb.delete();
    }
    OPSQLiteLargeDb = open({
      name: "large",
    });

    await OPSQLiteLargeDb.execute("DROP TABLE IF EXISTS Test;");
    await OPSQLiteLargeDb.execute(
      "CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;"
    );

    await OPSQLiteLargeDb.execute("PRAGMA mmap_size=268435456");

    let insertions: [string, any[]][] = [];
    for (let i = 0; i < ROWS; i++) {
      insertions.push([
        'INSERT INTO "Test" (id, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          i,
          chance.name(),
          chance.name(),
          chance.name(),
          chance.name(),
          chance.name(),
          chance.integer(),
          chance.integer(),
          chance.integer(),
          chance.integer(),
          chance.integer(),
          chance.floating(),
          chance.floating(),
          chance.floating(),
          chance.floating(),
        ],
      ]);
    }

    await OPSQLiteLargeDb.executeBatch(insertions);
  } catch (e) {
    console.warn("Error resetting large database", e);
  }
}

export async function queryOpSQLiteLargeDb() {
  // largeDb.execute('PRAGMA mmap_size=268435456');

  await OPSQLiteLargeDb?.execute("SELECT * FROM Test;");
}

export async function queryOpSQLiteLargeDbRaw() {
  // largeDb.execute('PRAGMA mmap_size=268435456');

  await OPSQLiteLargeDb?.executeRaw("SELECT * FROM Test;");
}
