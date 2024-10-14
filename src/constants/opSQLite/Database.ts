// import performance from 'react-native-performance';
import Chance from "chance";
import { DB, open } from "@op-engineering/op-sqlite";

const chance = new Chance();

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

    OPSQLiteLargeDb.execute("DROP TABLE IF EXISTS Test;");
    OPSQLiteLargeDb.execute(
      "CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;"
    );

    OPSQLiteLargeDb.execute("PRAGMA mmap_size=268435456");

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
    console.warn("Error resetting user database", e);
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
