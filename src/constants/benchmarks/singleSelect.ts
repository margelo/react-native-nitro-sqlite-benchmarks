import { Benchmark } from "@/constants/benchmarks/types";
import {
  NitroSQLiteTestDb,
  resetNitroSQLiteTestDb,
} from "@/constants/nitro/NitroSQLiteDb";
import { OPSQLiteTestDb, resetOPSQLiteTestDb } from "@/constants/op/OPSQLiteDb";
import {
  QuickSQLiteTestDb,
  resetQuickSQLiteTestDb,
} from "@/constants/quick/QuickSQLiteDb";
import { Chance } from "chance";

const chance = new Chance();
const stringValue = chance.name();
const integerValue = chance.integer();
const doubleValue = chance.floating();

export const singleSelect: Benchmark = {
  id: "singleSelect",
  description: `Select a single row`,
  numberOfRuns: 1,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      prepare: () => {
        resetNitroSQLiteTestDb();
        NitroSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: (i) => {
        NitroSQLiteTestDb?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
    },
    QuickSQLite: {
      library: "QuickSQLite",
      prepare: () => {
        resetQuickSQLiteTestDb();
        QuickSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: (i) => {
        QuickSQLiteTestDb?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
    },
    OPSQLite: {
      library: "OPSQLite",
      prepare: () => {
        resetOPSQLiteTestDb();
        OPSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: () => {
        OPSQLiteTestDb?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
    },
  },
};
