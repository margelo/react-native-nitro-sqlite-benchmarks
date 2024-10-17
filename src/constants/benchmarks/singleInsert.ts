import { Benchmark } from "@/constants/benchmarks/types";
import NitroSQLiteTestDb from "../nitro/TestDb";
import OPSQLiteTestDb from "../op/TestDb";
import QuickSQLiteTestDb from "../quick/TestDb";
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
      setup: NitroSQLiteTestDb.setup,
      run: () => {
        NitroSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: QuickSQLiteTestDb.setup,
      run: () => {
        QuickSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: OPSQLiteTestDb.setup,
      run: () => {
        OPSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
      teardown: OPSQLiteTestDb.close,
    },
  },
};
