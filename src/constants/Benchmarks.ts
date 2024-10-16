import {
  NitroSQLiteTestDb,
  resetNitroSQLiteTestDb,
  NitroSQLiteLargeDb,
  resetNitroSQLiteLargeDb,
} from "./nitroSQLite/NitroSQLiteDb";
import { OPSQLiteLargeDb, resetOpSQLiteLargeDb } from "./opSQLite/Database";
import {
  QuickSQLiteLargeDb,
  QuickSQLiteTestDb,
  resetQuickSQLiteLargeDb,
  resetQuickSQLiteTestDb,
} from "./quickSQLite/QuickSQLiteDb";
import Chance from "chance";

export type Library = "NitroSQLite" | "QuickSQLite" | "OPSQLite";

const chance = new Chance();
const ids = Array(100000)
  .fill(0)
  .map(() => chance.integer());
const stringValue = chance.name();
const integerValue = chance.integer();
const doubleValue = chance.floating();

const NUMBER_OF_INSERTS = 10000;

export const BENCHMARKS: Benchmarks = {
  loadDb: {
    id: "loadDb",
    description: `Load 300k database`,
    numberOfRuns: 1,
    runners: {
      NitroSQLite: {
        library: "NitroSQLite",
        prepare: () => {
          resetNitroSQLiteLargeDb();
        },
        run: () => {
          NitroSQLiteLargeDb?.execute("SELECT * FROM Test;");
          return Promise.resolve();
        },
      },
      QuickSQLite: {
        library: "QuickSQLite",
        prepare: () => {
          resetQuickSQLiteLargeDb();
        },
        run: () => {
          QuickSQLiteLargeDb?.execute("SELECT * FROM Test;");
          return Promise.resolve();
        },
      },
      OPSQLite: {
        library: "OPSQLite",
        prepare: () => {
          resetOpSQLiteLargeDb();
        },
        run: async () => {
          await OPSQLiteLargeDb?.execute("SELECT * FROM Test;");
        },
      },
    },
  },
  inserts: {
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
          QuickSQLiteTestDb?.execute("DROP TABLE IF EXISTS User;");
          QuickSQLiteTestDb?.execute(
            "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
          );
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
        prepare: () => {},
        run: () => {
          return Promise.resolve();
        },
      },
    },
  },
} as const;

export type Benchmarks = Record<string, Benchmark>;

export interface Benchmark {
  id: string;
  description: string;
  numberOfRuns: number;
  runners: Record<Library, BenchmarkRunner>;
}

export interface BenchmarkRunner {
  library: Library;
  prepare?: () => void;
  run: (i: number) => Promise<void>;
}

export type BenchmarkResults = Record<string, BenchmarkResult>;
export interface BenchmarkResult {
  id: string;
  runnerResults: BenchmarkRunnerResults;
}
export type BenchmarkRunnerResults = Record<Library, BenchmarkRunnerResult>;
export interface BenchmarkRunnerResult {
  library: Library;
  time: string | null;
}
