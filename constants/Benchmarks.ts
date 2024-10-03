import {
  NitroSQLiteTestDb,
  resetNitroSQLiteTestDb,
} from "@/constants/nitroSQLite/NitroSQLiteDb";
import {
  QuickSQLiteTestDb,
  resetQuickSQLiteTestDb,
} from "@/constants/quickSQLite/QuickSQLiteDb";
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
  inserts: {
    id: "inserts",
    description: `Insert ${NUMBER_OF_INSERTS} rows`,
    numberOfRuns: NUMBER_OF_INSERTS,
    runners: {
      NitroSQLite: {
        library: "NitroSQLite",
        prepare: () => {
          resetNitroSQLiteTestDb();
          NitroSQLiteTestDb?.execute("DROP TABLE IF EXISTS User;");
          NitroSQLiteTestDb?.execute(
            "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
          );
        },
        run: (i) => {
          NitroSQLiteTestDb?.execute(
            "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
            [ids[i], stringValue, integerValue, doubleValue]
          );
        },
      },
      QuickSQLite: {
        library: "NitroSQLite",
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
        },
      },
      OPSQLite: {
        library: "OPSQLite",
        prepare: () => {},
        run: (i) => {},
      },
    },
  },
  // {
  //   description: `SQLite: 1000 INSERTs`,
  //   numberOfRuns: 1000,
  //   prepare: () => {
  //     resetTestDb();
  //     testDb?.execute("CREATE TABLE t1(a INTEGER, b INTEGER, c VARCHAR(100));");
  //   },
  //   run: (i) => {
  //     testDb?.execute("INSERT INTO t1 (a, b, c) VALUES(?, ?, ?)", [
  //       ids[i],
  //       integerValue,
  //       stringValue,
  //     ]);
  //   },
  // },
  // 'load-300k-record-db': {
  //   description: "Load 300k record DB",
  //   numberOfRuns: 1,
  //   prepare: () => {
  //     resetLargeDb();
  //   },
  //   run: () => {
  //     largeDb?.execute("SELECT * FROM Test;");
  //   },
  // }
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
  run: (i: number) => void;
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
