export type ExerciseTopic = "javascript" | "react" | "html" | "css";

export interface ExerciseStep {
  number: number;
  instruction: string;
}

export interface CodingExercise {
  id: string;
  title: string;
  topic: ExerciseTopic;
  steps: ExerciseStep[];
  starterCode: string;
  language?: "javascript" | "html" | "css" | "tsx";
}

/** Minimal config for a new exercise. Steps are plain strings; numbers and starterCode are generated. */
export interface ExerciseConfig {
  id: string;
  title: string;
  topic: ExerciseTopic;
  steps: string[];
  starterCode?: string;
  language?: CodingExercise["language"];
}

/** Add a new exercise by passing id, title, topic, and step strings. Starter code is auto-generated from steps. */
export function defineExercise(config: ExerciseConfig): CodingExercise {
  const steps: ExerciseStep[] = config.steps.map((instruction, i) => ({
    number: i + 1,
    instruction,
  }));
  const starterCode =
    config.starterCode ??
    config.steps
      .map((s, i) => `// ${i + 1}. ${s}`)
      .join("\n")
      .concat("\n\n// Use console.log() to check your values:\n");
  return {
    id: config.id,
    title: config.title,
    topic: config.topic,
    steps,
    starterCode,
    language: config.language,
  };
}

export const codingExercises: CodingExercise[] = [
  defineExercise({
    id: "js-variables",
    title: "Variables and constants",
    topic: "javascript",
    steps: [
      'Create a variable named city and assign it the value "London".',
      "Create a constant named year with the value 2025.",
      "Create a variable named temperature and assign it the number 18.",
      "Create a variable named isRaining and assign it a boolean value.",
    ],
    language: "javascript",
  }),
  defineExercise({
    id: "js-arrays-objects",
    title: "Arrays and objects",
    topic: "javascript",
    steps: [
      'Create an array named fruits containing "apple", "banana", and "orange".',
      "Access the second element of the fruits array, and assign it to a variable named fruit.",
      "Create an object named book with the following properties: title, author, pages.",
      "Access the title property of the book object and assign it to a variable named title.",
    ],
    language: "javascript",
  }),
];

export function getCodingExercises(topic?: ExerciseTopic): CodingExercise[] {
  if (!topic) return codingExercises;
  return codingExercises.filter((e) => e.topic === topic);
}

export function getCodingExerciseById(id: string): CodingExercise | undefined {
  return codingExercises.find((e) => e.id === id);
}
