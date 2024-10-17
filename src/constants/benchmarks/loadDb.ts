import { Benchmark } from "@/constants/benchmarks/types";
import * as NitroSQLiteLargeDb from "@/constants/benchmarks/nitro/LargeDb";
import * as OPSQLiteLargeDb from "@/constants/benchmarks/op/LargeDb";
import * as QuickSQLiteLargeDb from "@/constants/benchmarks/quick/LargeDb";

export const loadDb: Benchmark = {
  id: "loadDb",
  description: `Load 300k database`,
  numberOfRuns: 10,
  runners: {
    OPSQLite: {
      library: "OPSQLite",
      setup: OPSQLiteLargeDb.setup,
      run: async () => {
        await OPSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
      },
      teardown: OPSQLiteLargeDb.close,
    },
    QuickSQLite: {
      library: "QuickSQLite",
      setup: QuickSQLiteLargeDb.setup,
      run: async () => {
        QuickSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
      },
      teardown: QuickSQLiteLargeDb.close,
    },
    NitroSQLite: {
      library: "NitroSQLite",
      setup: NitroSQLiteLargeDb.setup,
      run: async () => {
        NitroSQLiteLargeDb.db?.execute("SELECT * FROM Test;");
      },
      teardown: NitroSQLiteLargeDb.close,
    },
  },
};
