import { Benchmark } from "@/constants/benchmarks/types";
import {
  NitroSQLiteTestDb,
  resetNitroSQLiteTestDb,
} from "../nitro/NitroSQLiteDb";
import { OPSQLiteTestDb, resetOPSQLiteTestDb } from "../op/OPSQLiteDb";
import {
  QuickSQLiteTestDb,
  resetQuickSQLiteTestDb,
} from "../quick/QuickSQLiteDb";
import { Chance } from "chance";

const NUMBER_OF_INSERTS = 10000;

const chance = new Chance();
const ids = Array(100000)
  .fill(0)
  .map(() => chance.integer());
const stringValue = chance.name();
const integerValue = chance.integer();
const doubleValue = chance.floating();

export const inserts: Benchmark = {
  id: "inserts",
  description: `Insert ${NUMBER_OF_INSERTS} rows`,
  numberOfRuns: NUMBER_OF_INSERTS,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      prepare: () => {
        resetNitroSQLiteTestDb();
      },
      run: (i) => {
        NitroSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
    QuickSQLite: {
      library: "QuickSQLite",
      prepare: () => {
        resetQuickSQLiteTestDb();
      },
      run: (i) => {
        QuickSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
    OPSQLite: {
      library: "OPSQLite",
      prepare: () => {
        resetOPSQLiteTestDb();
      },
      run: (i) => {
        OPSQLiteTestDb?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
  },
};
