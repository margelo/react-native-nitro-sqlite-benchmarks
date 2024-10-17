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

export const singleInsert: Benchmark = {
  id: "singleInsert",
  description: `Insert a single row`,
  numberOfRuns: 1,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      prepare: () => {
        resetNitroSQLiteTestDb();
      },
      run: () => {
        NitroSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
    QuickSQLite: {
      library: "QuickSQLite",
      prepare: () => {
        resetQuickSQLiteTestDb();
      },
      run: () => {
        QuickSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
    OPSQLite: {
      library: "OPSQLite",
      prepare: () => {
        resetOPSQLiteTestDb();
      },
      run: () => {
        OPSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
  },
};
