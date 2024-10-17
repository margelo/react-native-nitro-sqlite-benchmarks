import { Benchmark } from "@/constants/benchmarks/types";
import NitroSQLiteTestDb from "../nitro/TestDb";
import OPSQLiteTestDb from "../op/TestDb";
import QuickSQLiteTestDb from "../quick/TestDb";
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
      setup: () => {
        NitroSQLiteTestDb.setup();
        NitroSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: (i) => {
        NitroSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
      teardown: NitroSQLiteTestDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: () => {
        QuickSQLiteTestDb.setup();
        QuickSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: (i) => {
        QuickSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
      teardown: QuickSQLiteTestDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: () => {
        OPSQLiteTestDb.setup();
        OPSQLiteTestDb.db?.execute(
          "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
          [0, stringValue, integerValue, doubleValue]
        );
      },
      run: () => {
        OPSQLiteTestDb.db?.execute(`SELECT * FROM User WHERE ID=${0};`);
        return Promise.resolve();
      },
    },
  },
};
