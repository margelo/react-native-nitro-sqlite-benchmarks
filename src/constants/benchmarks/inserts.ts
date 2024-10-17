import { Benchmark } from "@/constants/benchmarks/types";
import NitroSQLiteTestDb from "../nitro/TestDb";
import OPSQLiteTestDb from "../op/TestDb";
import QuickSQLiteTestDb from "../quick/TestDb";
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
      setup: NitroSQLiteTestDb.setup,
      run: (i) => {
        NitroSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: QuickSQLiteTestDb.setup,
      run: (i) => {
        QuickSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
      teardown: QuickSQLiteTestDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: OPSQLiteTestDb.setup,
      run: (i) => {
        OPSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
        return Promise.resolve();
      },
      teardown: OPSQLiteTestDb.close,
    },
  },
};
