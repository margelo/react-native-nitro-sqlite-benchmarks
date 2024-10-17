import { loadDb } from "@/constants/benchmarks/loadDb";
import { singleSelect } from "@/constants/benchmarks/singleSelect";
import { singleInsert } from "@/constants/benchmarks/singleInsert";
import { inserts } from "@/constants/benchmarks/inserts";
import { Benchmarks } from "@/constants/benchmarks/types";

export const BENCHMARKS: Benchmarks = {
  loadDb: loadDb,
  singleSelect,
  singleInsert,
  inserts,
} as const;
