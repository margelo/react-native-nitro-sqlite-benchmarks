import {
  Benchmark,
  BenchmarkResult,
  BenchmarkResults,
  BenchmarkRunner,
  BenchmarkRunnerResult,
  BenchmarkRunnerResults,
  Benchmarks,
} from "@/constants/benchmarks/types";
import { BENCHMARKS } from "@/constants/benchmarks";
import { useCallback, useState } from "react";

// We want to wait a few milliseconds between each benchmark, runner and iteration to give the system time to cool down
const BENCHMARK_PAUSE_TIME = 1000;
const BENCHMARK_RUNNER_PAUSE_TIME = 100;
const BENCHMARK_RUNNER_ITERATION_PAUSE_TIME = 10;

export function useBenchmarks() {
  const [results, setResults] = useState<BenchmarkResults>();

  const startBenchmarks = useCallback(() => {
    runBenchmarks(BENCHMARKS).then((results) => {
      setResults(results);
    });
  }, []);

  return { results, startBenchmarks };
}

async function runBenchmarks(
  benchmarks: Benchmarks
): Promise<BenchmarkResults> {
  console.log("--------- BEGINNING BENCHMARKS ---------");

  const results = await executeInSequence(
    Object.values(benchmarks),
    async (benchmark) => runBenchmark(benchmark),
    BENCHMARK_PAUSE_TIME
  );

  console.log();
  console.log("--------- FINISHED BENCHMARKS ---------");

  return Object.fromEntries(
    results.map((result) => [result.id, result])
  ) as BenchmarkResults;
}

async function runBenchmark(benchmark: Benchmark): Promise<BenchmarkResult> {
  console.log();
  console.log(`🏁 ${benchmark.description}`);
  const results = await executeInSequence(
    Object.values(benchmark.runners),
    async (runner) => await executeBenchmarkRunner(benchmark, runner),
    BENCHMARK_RUNNER_PAUSE_TIME
  );
  console.log("----------------------------------------");

  const runnerResults = Object.fromEntries(
    results.map((result) => [result.library, result])
  ) as BenchmarkRunnerResults;

  return { id: benchmark.id, runnerResults };
}

async function executeBenchmarkRunner(
  benchmark: Benchmark,
  runner: BenchmarkRunner,
  pauseTime = BENCHMARK_RUNNER_ITERATION_PAUSE_TIME
): Promise<BenchmarkRunnerResult> {
  console.log(`🛠️  ${runner.library}: Setup`);
  await runner.setup?.();

  console.log(`⏳ ${runner.library}: Running ${benchmark.numberOfRuns}x times`);

  const times: number[] = [];
  for (let i = 0; i < benchmark.numberOfRuns; i++) {
    const start = performance.now();
    await runner.run(i);
    const end = performance.now();
    times.push(end - start);

    await wait(pauseTime);
  }
  const averageTime = times.reduce((a, b) => a + b, 0) / times.length;

  console.log(
    `✅ ${runner.library}: Took ${averageTime.toFixed(2)}ms on average to run! ⏱️`
  );

  console.log(`🔄  ${runner.library}: Teardown`);
  await runner.teardown?.();

  console.log();

  return { library: runner.library, times, averageTime };
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function executeInSequence<Task, Result>(
  tasks: Task[],
  execute: (t: Task) => Promise<Result>,
  pauseTime = 0
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
