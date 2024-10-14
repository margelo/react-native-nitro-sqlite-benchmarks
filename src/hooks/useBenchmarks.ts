import {
  Benchmark,
  BenchmarkResult,
  BenchmarkResults,
  BenchmarkRunner,
  BenchmarkRunnerResult,
  BenchmarkRunnerResults,
  Benchmarks,
  BENCHMARKS,
} from "@/constants/Benchmarks";
import { useCallback, useState } from "react";

export function useBenchmarks() {
  const [results, setResults] = useState<BenchmarkResults>();

  const startBenchmarks = useCallback(() => {
    runBenchmarks(BENCHMARKS).then((results) => {
      setResults(results);
    });
  }, []);

  return { results, startBenchmarks };
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function executeInSequence<Task, Result>(
  tasks: Task[],
  execute: (t: Task) => Promise<Result>,
  pauseTime = 1000
) {
  const results: Result[] = [];
  async function run(i = 0): Promise<void> {
    await (i === 0 ? Promise.resolve() : wait(pauseTime));

    const result = await execute(tasks[i]);
    results.push(result);

    if (tasks[i + 1] != null) return run(i + 1);
  }

  await run();
  return results;
}

async function executeBenchmarkRunner(
  benchmark: Benchmark,
  runner: BenchmarkRunner
): Promise<BenchmarkRunnerResult> {
  console.log(`🏗️  ${runner.library}: Preparing benchmark`);
  runner.prepare?.();

  console.log(`⏳ ${runner.library}: Running ${benchmark.numberOfRuns}x times`);
  const start = performance.now();
  for (let i = 0; i < benchmark.numberOfRuns; i++) await runner.run(i);
  const end = performance.now();
  const time = (end - start).toFixed(2);

  console.log(`✅ ${runner.library}: Took ${time}ms to run!`);
  console.log();

  return { library: runner.library, time };
}

async function runBenchmark(benchmark: Benchmark): Promise<BenchmarkResult> {
  console.log();
  console.log(`🐎 ${benchmark.description}`);
  const results = await executeInSequence(
    Object.values(benchmark.runners),
    async (runner) => await executeBenchmarkRunner(benchmark, runner)
  );
  console.log("----------------------------------------");

  const runnerResults = Object.fromEntries(
    results.map((result) => [result.library, result])
  ) as BenchmarkRunnerResults;

  return { id: benchmark.id, runnerResults };
}

async function runBenchmarks(
  benchmarks: Benchmarks
): Promise<BenchmarkResults> {
  console.log("--------- BEGINNING BENCHMARKS ---------");

  const results = await executeInSequence(
    Object.values(benchmarks),
    async (benchmark) => runBenchmark(benchmark)
  );

  console.log();
  console.log("--------- FINISHED SQLITE BENCHMARKS! ---------");

  return Object.fromEntries(
    results.map((result) => [result.id, result])
  ) as BenchmarkResults;
}
