export type Library = "QuickSQLite" | "NitroSQLite" | "OPSQLite";

const NUMBER_OF_INSERTS = 10000;
export const BENCHMARKS: Benchmark[] = [
  {
    description: `Insert ${NUMBER_OF_INSERTS} rows`,
    numberOfRuns: NUMBER_OF_INSERTS,
    runners
    prepare: () => {
      resetTestDb();
      testDb?.execute("DROP TABLE IF EXISTS User;");
      testDb?.execute(
        "CREATE TABLE User ( id REAL PRIMARY KEY, name TEXT NOT NULL, age REAL, networth REAL) STRICT;"
      );
    },
    run: (i) => {
      testDb?.execute(
        "INSERT INTO User (id, name, age, networth) VALUES(?, ?, ?, ?)",
        [ids[i], stringValue, integerValue, doubleValue]
      );
    },
  },
  {
    description: `SQLite: 1000 INSERTs`,
    numberOfRuns: 1000,
    prepare: () => {
      resetTestDb();
      testDb?.execute("CREATE TABLE t1(a INTEGER, b INTEGER, c VARCHAR(100));");
    },
    run: (i) => {
      testDb?.execute("INSERT INTO t1 (a, b, c) VALUES(?, ?, ?)", [
        ids[i],
        integerValue,
        stringValue,
      ]);
    },
  },
  {
    description: "Load 300k record DB",
    numberOfRuns: 1,
    prepare: () => {
      resetLargeDb();
    },
    run: () => {
      largeDb?.execute("SELECT * FROM Test;");
    },
  },
];

export type BenchmarkId = keyof typeof BENCHMARKS;

export interface Benchmark {
  id: BenchmarkId;
  description: string;
  numberOfRuns: number;
  runners: Record<Library, BenchmarkRunner>;
}

export interface BenchmarkRunner {
  library: Library;
  prepare?: () => void;
  run: (i: number) => void;
}

export type BenchmarkResults = Record<BenchmarkId, BenchmarkResult>;
export interface BenchmarkResult {
  id: BenchmarkId;
  runnerResults: BenchmarkRunnerResults;
}
export type BenchmarkRunnerResults = Record<Library, BenchmarkRunnerResult>
export interface BenchmarkRunnerResult {
  library: Library;
  time: string | null;
}
