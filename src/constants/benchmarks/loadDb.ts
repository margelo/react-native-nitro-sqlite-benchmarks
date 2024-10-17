import { Benchmark } from "@/constants/benchmarks/types";
import NitroSQLiteLargeDb from "@/constants/benchmarks/nitro/LargeDb";
import OPSQLiteLargeDb from "@/constants/benchmarks/op/LargeDb";
import QuickSQLiteLargeDb from "@/constants/benchmarks/quick/LargeDb";

export const loadDb: Benchmark = {
  id: "loadDb",
  description: `Load 300k database`,
  numberOfRuns: 10,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      setup: NitroSQLiteLargeDb.setup,
      run: () => {
        NitroSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
        return Promise.resolve();
      },
      teardown: NitroSQLiteLargeDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: QuickSQLiteLargeDb.setup,
      run: () => {
        QuickSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
        return Promise.resolve();
      },
      teardown: QuickSQLiteLargeDb.close,
    },
    OPSQLite: {
      library: "OPSQLite",
      setup: OPSQLiteLargeDb.setup,
      run: async () => {
        await OPSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
      },
      teardown: OPSQLiteLargeDb.close,
    },
  },
};
