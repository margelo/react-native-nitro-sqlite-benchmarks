import { Benchmark } from "@/constants/benchmarks/types";
import NitroSQLiteTestDb from "./nitro/TestDb";
import OPSQLiteTestDb from "./op/TestDb";
import QuickSQLiteTestDb from "./quick/TestDb";
import {
  doubleValue,
  ids,
  integerValue,
  NUMBER_OF_USERS,
  stringValue,
} from "@/constants/benchmarks/data";

export const insert: Benchmark = {
  id: "insert",
  description: `Insert a row`,
  numberOfRuns: NUMBER_OF_USERS,
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
