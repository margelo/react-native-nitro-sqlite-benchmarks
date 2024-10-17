export type Benchmarks = Record<string, Benchmark>;

export type Library = "NitroSQLite" | "QuickSQLite" | "OPSQLite";

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
  times: number[];
  averageTime: number;
}
