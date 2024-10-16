import Chance from "chance";
import type {
  QuickSQLiteConnection,
  SQLBatchTuple,
} from "react-native-quick-sqlite";
import { open } from "react-native-quick-sqlite";

const chance = new Chance();

export let QuickSQLiteTestDb: QuickSQLiteConnection | undefined;
export function resetQuickSQLiteTestDb() {
  try {
    if (QuickSQLiteTestDb != null) {
      QuickSQLiteTestDb.close();
      QuickSQLiteTestDb.delete();
    }
    QuickSQLiteTestDb = open({
      name: "test",
    });

    QuickSQLiteTestDb?.execute("DROP TABLE IF EXISTS User;");
    QuickSQLiteTestDb?.execute(
      "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
    );
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}

// Copyright 2024 Oscar Franco
// Taken from "op-sqlite" example project.
// Used to demonstrate the performance of NitroSQLite.
const ROWS = 300000;
export let QuickSQLiteLargeDb: QuickSQLiteConnection | undefined;
export function resetQuickSQLiteLargeDb() {
  try {
    if (QuickSQLiteLargeDb != null) {
      QuickSQLiteLargeDb.close();
      QuickSQLiteLargeDb.delete();
    }
    QuickSQLiteLargeDb = open({
      name: "large",
    });

    QuickSQLiteLargeDb?.execute("DROP TABLE IF EXISTS Test;");
    QuickSQLiteLargeDb.execute(
      "CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;"
    );

    QuickSQLiteLargeDb.execute("PRAGMA mmap_size=268435456");

    const insertions: SQLBatchTuple[] = [];
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

    QuickSQLiteLargeDb.executeBatch(insertions);
  } catch (e) {
    console.warn("Error resetting user database", e);
  }
}
