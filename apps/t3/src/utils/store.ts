import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isMetricAtom = atomWithStorage("isMetric", true);
export { useAtom };
