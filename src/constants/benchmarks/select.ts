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

export const singleSelect: Benchmark = {
  id: "singleSelect",
  description: `Select a single row`,
  numberOfRuns: NUMBER_OF_RUNS,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      setup: async () => {
        NitroSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_RUNS; i++) {
          NitroSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: async (i) => {
        NitroSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: async () => {
        QuickSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_RUNS; i++) {
          QuickSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: async (i) => {
        QuickSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
      },
      teardown: QuickSQLiteTestDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: async () => {
        OPSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_RUNS; i++) {
          OPSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: async (i) => {
        OPSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
      },
    },
  },
};
