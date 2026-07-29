export const COURSE_LABELS = {
  "wash-dry": "洗濯と乾燥",
  wash: "洗濯",
  dry: "乾燥"
};

export const COURSE_PART_LABELS = {
  wash: "洗濯",
  dry: "乾燥"
};

export const COURSE_OPTIONS = [
  {
    id: "wash-dry",
    label: COURSE_LABELS["wash-dry"],
    parts: ["wash", "dry"]
  },
  {
    id: "wash",
    label: COURSE_LABELS.wash,
    parts: ["wash"]
  },
  {
    id: "dry",
    label: COURSE_LABELS.dry,
    parts: ["dry"]
  }
];
