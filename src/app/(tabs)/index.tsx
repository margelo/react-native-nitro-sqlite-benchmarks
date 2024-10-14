import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useMemo } from "react";
import { BENCHMARKS } from "@/constants/Benchmarks";
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
