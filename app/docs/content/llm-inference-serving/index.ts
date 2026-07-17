import type { TopicContent } from "../types";

import kvCache from "./kv-cache";
import rooflineProfiler from "./roofline-profiler";

const content: TopicContent = {
  "kv-cache": kvCache,
  "roofline-profiler": rooflineProfiler,
};

export default content;
