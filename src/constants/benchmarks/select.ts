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

export const singleSelect: Benchmark = {
  id: "singleSelect",
  description: `Select a single row`,
  numberOfRuns: NUMBER_OF_USERS,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      setup: () => {
        NitroSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_USERS; i++) {
          NitroSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: (i) => {
        NitroSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
        return Promise.resolve();
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: () => {
        QuickSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_USERS; i++) {
          QuickSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: (i) => {
        QuickSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
        return Promise.resolve();
      },
      teardown: QuickSQLiteTestDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: () => {
        OPSQLiteTestDb.setup();
        for (let i = 0; i < NUMBER_OF_USERS; i++) {
          OPSQLiteTestDb.db?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        }
      },
      run: (i) => {
        OPSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${ids[i]};`);
        return Promise.resolve();
      },
    },
  },
};
