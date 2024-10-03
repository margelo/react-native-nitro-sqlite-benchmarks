import Chance from "chance";
import type {
  QuickSQLiteConnection,
  BatchQueryCommand,
} from "react-native-nitro-sqlite";
import { open } from "react-native-nitro-sqlite";

const chance = new Chance();

export let NitroSQLiteTestDb: QuickSQLiteConnection | undefined;
export function resetNitroSQLiteTestDb() {
  try {
    if (NitroSQLiteTestDb != null) {
      NitroSQLiteTestDb.close();
      NitroSQLiteTestDb.delete();
    }
    NitroSQLiteTestDb = open({
      name: "test",
    });
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}

// Copyright 2024 Oscar Franco
// Taken from "op-sqlite" example project.
// Used to demonstrate the performance of NitroSQLite.
const ROWS = 300000;
export let NitroSQLiteLargeDb: QuickSQLiteConnection | undefined;
export function resetLargeDb() {
  try {
    if (NitroSQLiteLargeDb != null) {
      NitroSQLiteLargeDb.close();
      NitroSQLiteLargeDb.delete();
    }
    NitroSQLiteLargeDb = open({
      name: "large",
    });

    NitroSQLiteLargeDb.execute(
      "CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;"
    );

    NitroSQLiteLargeDb.execute("PRAGMA mmap_size=268435456");

    const insertions: BatchQueryCommand[] = [];
    for (let i = 0; i < ROWS; i++) {
      insertions.push({
        query:
          'INSERT INTO "Test" (id, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        params: [
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
      });
    }

    NitroSQLiteLargeDb.executeBatch(insertions);
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}
