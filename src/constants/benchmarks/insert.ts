import { Benchmark } from "@/constants/benchmarks/types";
import * as NitroSQLiteTestDb from "./nitro/TestDb";
import * as OPSQLiteTestDb from "./op/TestDb";
import * as QuickSQLiteTestDb from "./quick/TestDb";
import {
  doubleValue,
  ids,
  integerValue,
  NUMBER_OF_RUNS,
  stringValue,
} from "@/constants/benchmarks/data";

export const insert: Benchmark = {
  id: "insert",
  description: `Insert a row`,
  numberOfRuns: NUMBER_OF_RUNS,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      setup: NitroSQLiteTestDb.setup,
      run: async (i) => {
        NitroSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: QuickSQLiteTestDb.setup,
      run: async (i) => {
        QuickSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
      },
      teardown: QuickSQLiteTestDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: OPSQLiteTestDb.setup,
      run: async (i) => {
        OPSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [ids[i], stringValue, integerValue, doubleValue]
        );
      },
      teardown: OPSQLiteTestDb.close,
    },
  },
};
