import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useMemo } from "react";
import { BENCHMARKS } from "@/constants/benchmarks";
import { useBenchmarks } from "@/hooks/useBenchmarks";

const BENCHMARKS_ARRAY = Object.values(BENCHMARKS);

export default function BenchmarkScreen() {
  const { results, startBenchmarks } = useBenchmarks();

  const Results = useMemo(
    () =>
      BENCHMARKS_ARRAY.map(({ id, description }) => {
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
              Object.values(runnerResults).map(({ library, averageTime }) => (
                <Text style={{ textAlign: "center" }} key={library}>
                  <Text style={{ fontWeight: "bold" }}>
                    {library} took {averageTime.toFixed(2)}ms
                  </Text>
                </Text>
              ))}
          </View>
        );
      }),
    [results]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.buttonText}>Run benchmarks</Text>
        </TouchableOpacity>

        {
          /* isLoading */ false ? (
            <ActivityIndicator />
          ) : (
            <View style={{ width: 20, height: 20 }} />
          )
        }
      </View>

      {Results}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "semibold",
    fontSize: 18,
    paddingBottom: 10,
    color: "black",
  },
});
