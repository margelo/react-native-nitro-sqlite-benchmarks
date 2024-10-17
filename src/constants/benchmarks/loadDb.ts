import { Benchmark } from "@/constants/benchmarks/types";
import {
  NitroSQLiteLargeDb,
  resetNitroSQLiteLargeDb,
} from "@/constants/nitro/NitroSQLiteDb";
import {
  OPSQLiteLargeDb,
  resetOpSQLiteLargeDb,
} from "@/constants/op/OPSQLiteDb";
import {
  QuickSQLiteLargeDb,
  resetQuickSQLiteLargeDb,
} from "@/constants/quick/QuickSQLiteDb";

export const loadDb: Benchmark = {
  id: "loadDb",
  description: `Load 300k database`,
  numberOfRuns: 1,
  runners: {
    NitroSQLite: {
      library: "NitroSQLite",
      prepare: () => {
        resetNitroSQLiteLargeDb();
      },
      run: () => {
        NitroSQLiteLargeDb?.execute("SELECT * FROM Test;");
        return Promise.resolve();
      },
    },
    QuickSQLite: {
      library: "QuickSQLite",
      prepare: () => {
        resetQuickSQLiteLargeDb();
      },
      run: () => {
        QuickSQLiteLargeDb?.execute("SELECT * FROM Test;");
        return Promise.resolve();
      },
    },
    OPSQLite: {
      library: "OPSQLite",
      prepare: () => {
        resetOpSQLiteLargeDb();
      },
      run: async () => {
        await OPSQLiteLargeDb?.execute("SELECT * FROM Test;");
      },
    },
  },
};
