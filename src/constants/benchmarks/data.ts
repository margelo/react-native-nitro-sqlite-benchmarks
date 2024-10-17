import { Chance } from "chance";

export const NUMBER_OF_RUNS = 1000;

const chance = new Chance();
export const ids = Array(NUMBER_OF_RUNS)
  .fill(0)
  .map(() => chance.integer());
export const stringValue = chance.name();
export const integerValue = chance.integer();
export const doubleValue = chance.floating();
