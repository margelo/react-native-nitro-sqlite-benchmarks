import { loadDb } from "@/constants/benchmarks/loadDb";
import { singleSelect } from "@/constants/benchmarks/select";
import { insert } from "@/constants/benchmarks/insert";
import { Benchmarks } from "@/constants/benchmarks/types";

export const BENCHMARKS: Benchmarks = {
  loadDb,
  singleSelect,
  insert,
} as const;
