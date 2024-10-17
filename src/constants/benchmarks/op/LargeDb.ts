// Copyright 2024 Oscar Franco
// Benchmark code taken from "op-sqlite" example project.
// Used to compare and demonstrate the performance of other RN SQLite libraries.
import { DB, open } from "@op-engineering/op-sqlite";
import Chance from "chance";

const ROWS = 300000;
const chance = new Chance();

export let db: DB | undefined;
export async function setup() {
  try {
    if (db != null) await close();

    db = open({
      name: "large",
    });

    await db.execute("DROP TABLE IF EXISTS Test;");
    await db.execute(
      "CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;"
    );

    await db.execute("PRAGMA mmap_size=268435456");

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

    await db.executeBatch(insertions);
  } catch (e) {
    console.warn("Error resetting large database", e);
  }
}

export async function close() {
  db?.close();
  db?.delete();
  db = undefined;
}
