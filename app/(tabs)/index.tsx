import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QuickSQLite } from "react-native-quick-sqlite";
import {
  Benchmark,
  BenchmarkId,
  BenchmarkResult,
  BenchmarkResults,
  BenchmarkRunner,
  BenchmarkRunnerResult,
  BenchmarkRunnerResults,
  BENCHMARKS,
} from "@/constants/Benchmarks";

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

function executeBenchmarkRunner(
  benchmark: Benchmark,
  runner: BenchmarkRunner
): BenchmarkRunnerResult {
  console.log("Preparing benchmark for", runner.library);
  runner.prepare?.();

  console.log(
    `Running benchmark ${benchmark.numberOfRuns}x times in ${runner.library}`
  );
  const start = performance.now();
  for (let i = 0; i < benchmark.numberOfRuns; i++) runner.run(i);
  const end = performance.now();
  console.log(
    `Finished running benchmark ${benchmark.numberOfRuns}x times in ${runner.library}`
  );

  const time = (end - start).toFixed(2);
  console.log(`Took ${time}ms to run!`);
  return { library: runner.library, time };
}

async function runBenchmark(benchmark: Benchmark): Promise<BenchmarkResult> {
  console.log(`Starting "${benchmark.description}" benchmark`);
  const results = await executeInSequence(
    Object.values(benchmark.runners),
    async (runner) => executeBenchmarkRunner(benchmark, runner)
  );
  console.log(`Finished "${benchmark.description}" benchmark`);

  const runnerResults = Object.fromEntries(
    results.map((result) => [result.library, result])
  ) as BenchmarkRunnerResults;

  return { id: benchmark.id, runnerResults };
}

async function runBenchmarks(
  benchmarks: Benchmark[]
): Promise<BenchmarkResults> {
  console.log("--------- BEGINNING BENCHMARKS ---------");
  const results = await executeInSequence(benchmarks, async (benchmark) =>
    runBenchmark(benchmark)
  );
  console.log("--------- FINISHED SQLITE BENCHMARKS! ---------");

  return Object.fromEntries(
    results.map((result) => [result.id, result])
  ) as BenchmarkResults;
}

export default function BenchmarkScreen() {
  const [results, setResults] = useState<BenchmarkResults>();

  const startBenchmarks = useCallback(() => {
    runBenchmarks(BENCHMARKS).then((results) => {
      setResults(results);
    });
  }, []);

  const Results = useMemo(
    () =>
      BENCHMARKS.map(({ id, description }) => {
        const runnerResults = results?.[id]?.runnerResults;

        return (
          <View style={{ paddingBottom: 10 }} key={id as string}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: -20,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingRight: 5,
                }}
              >
                {description}
              </Text>

              {runnerResults === null ? (
                <ActivityIndicator />
              ) : (
                <View style={{ width: 20, height: 20 }} />
              )}
            </View>

            {runnerResults != null &&
              Object.values(runnerResults).map(({ library, time }) => (
                <Text style={{ textAlign: "center" }}>
                  Took{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {library} took {time}ms
                  </Text>
                </Text>
              ))}
          </View>
        );
      }),
    [results]
  );

  return (
    <ScrollView contentContainerStyle={ScreenStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: -20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPressIn={() => {
            startBenchmarks();
          }}
          style={{ paddingRight: 10 }}
        >
          <Text style={ScreenStyles.buttonText}>Run benchmarks</Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ width: 20, height: 20 }} />
        )}
      </View>

      {Results}

      <StatusBar style="auto" />
    </ScrollView>
    // <View style={styles.container}>
    //   <Text style={{ fontWeight: "bold", size: 24 }}>
    //     RNQuickSQLite vs RNNitroSQLite vs OP-SQLite
    //   </Text>

    //   <View style={{ height: 50 }} />

    //   <Text style={{ fontWeight: "bold", size: 24 }}>
    //     Loading 300k database
    //   </Text>
    //   <View style={{ alignItems: "flex-end" }}>
    //     <Text>
    //       ExpoModule.addNumbers(...) took{" "}
    //       <Text style={{ fontWeight: "bold" }}>{results?.expoTime}ms</Text>
    //     </Text>
    //     <Text>
    //       TurboModule.addNumbers(...) took{" "}
    //       <Text style={{ fontWeight: "bold" }}>{results?.turboTime}ms</Text>
    //     </Text>
    //     <Text>
    //       NitroModule.addNumbers(...) took{" "}
    //       <Text style={{ fontWeight: "bold" }}>{results?.nitroTime}ms</Text>
    //     </Text>
    //   </View>

    //   {/* <View style={{ height: 50 }} /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
