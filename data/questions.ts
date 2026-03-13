export type Topic = "javascript" | "react" | "html" | "css";
export type Level = "rookie" | "mid" | "pro";

export interface Question {
  id: string;
  topic: Topic;
  level: Level;
  title: string;
  prompt: string;
  answer: string;
  hints?: string[];
  starterCode?: string;
  language?: "javascript" | "html" | "css" | "tsx";
}

export const TOPICS: { value: Topic; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
];

export const LEVELS: { value: Level; label: string }[] = [
  { value: "rookie", label: "Rookie" },
  { value: "mid", label: "Mid" },
  { value: "pro", label: "Pro" },
];

const questions: Question[] = [
  // JavaScript - Rookie
  {
    id: "js-r-1",
    topic: "javascript",
    level: "rookie",
    title: "What is the difference between let, const, and var?",
    prompt:
      "Explain the key differences between let, const, and var in JavaScript. When would you use each?",
    answer:
      "var is function-scoped and can be redeclared; it is hoisted. let and const are block-scoped (ES6). let can be reassigned; const cannot be reassigned but object/array contents can be mutated. Prefer const by default, use let when reassignment is needed, avoid var in modern code.",
    hints: ["Think about scope (block vs function).", "Consider reassignment and hoisting."],
    language: "javascript",
  },
  {
    id: "js-r-2",
    topic: "javascript",
    level: "rookie",
    title: "What are arrow functions and how do they differ from regular functions?",
    prompt: "Describe arrow functions. How do they differ from function declarations in terms of 'this' and usage?",
    answer:
      "Arrow functions use => syntax and do not have their own 'this'—they inherit it from the enclosing scope. They cannot be used as constructors and don't have 'arguments'. Use them for callbacks and when you want lexical 'this'; use regular functions for methods and constructors.",
    hints: ["Consider the value of 'this' in both cases.", "Think about when you'd use each."],
    language: "javascript",
  },
  {
    id: "js-r-3",
    topic: "javascript",
    level: "rookie",
    title: "Explain == vs === in JavaScript",
    prompt: "What is the difference between == and ===? Which should you prefer and why?",
    answer:
      "== performs type coercion before comparing (e.g. 1 == '1' is true). === is strict equality—no coercion; types and values must match. Prefer === to avoid surprising coercion bugs and make intent clear.",
    language: "javascript",
  },
  // JavaScript - Mid
  {
    id: "js-m-1",
    topic: "javascript",
    level: "mid",
    title: "Implement Array.prototype.map from scratch",
    prompt: "Implement a function myMap(array, callback) that behaves like Array.prototype.map without using .map.",
    answer:
      "function myMap(array, callback) {\n  const result = [];\n  for (let i = 0; i < array.length; i++) {\n    result.push(callback(array[i], i, array));\n  }\n  return result;\n}",
    starterCode: "function myMap(array, callback) {\n  // your code\n  return [];\n}",
    hints: ["Loop over the array.", "Call the callback with (element, index, array)."],
    language: "javascript",
  },
  {
    id: "js-m-2",
    topic: "javascript",
    level: "mid",
    title: "Explain the event loop and microtasks vs macrotasks",
    prompt: "How does the JavaScript event loop work? What are microtasks and macrotasks, and in what order are they executed?",
    answer:
      "The event loop continuously checks the call stack and task queues. Macrotasks (setTimeout, setInterval, I/O) go to the task queue; microtasks (Promises, queueMicrotask) go to the microtask queue. After each macrotask, all microtasks run before the next macrotask. This is why Promise.then runs before setTimeout(0).",
    language: "javascript",
  },
  {
    id: "js-m-3",
    topic: "javascript",
    level: "mid",
    title: "Debounce function implementation",
    prompt: "Write a debounce(fn, delay) that delays invoking fn until after delay ms have elapsed since the last call.",
    answer:
      "function debounce(fn, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}",
    starterCode: "function debounce(fn, delay) {\n  // your code\n  return function () {};\n}",
    language: "javascript",
  },
  // JavaScript - Pro
  {
    id: "js-p-1",
    topic: "javascript",
    level: "pro",
    title: "Implement a simple Promise from scratch",
    prompt: "Implement a minimal MyPromise that supports .then and handles async resolution.",
    answer:
      "class MyPromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.callbacks = [];\n    const resolve = (v) => {\n      if (this.state !== 'pending') return;\n      this.state = 'fulfilled';\n      this.value = v;\n      this.callbacks.forEach(cb => cb());\n    };\n    executor(resolve);\n  }\n  then(onFulfilled) {\n    return new MyPromise(resolve => {\n      const run = () => resolve(onFulfilled(this.value));\n      this.state === 'fulfilled' ? setTimeout(run, 0) : this.callbacks.push(run);\n    });\n  }\n}",
    starterCode: "class MyPromise {\n  constructor(executor) {}\n  then(onFulfilled) {}\n}",
    language: "javascript",
  },
  // React - Rookie
  {
    id: "react-r-1",
    topic: "react",
    level: "rookie",
    title: "What is the virtual DOM and why does React use it?",
    prompt: "Explain the concept of the virtual DOM in React. What problem does it solve?",
    answer:
      "The virtual DOM is a lightweight JavaScript representation of the real DOM. React keeps a virtual DOM tree in memory, compares it to the previous tree when state/props change (reconciliation), and updates only the minimal set of real DOM nodes (diffing). This batches updates and reduces expensive DOM operations.",
    language: "tsx",
  },
  {
    id: "react-r-2",
    topic: "react",
    level: "rookie",
    title: "What are props and state? When to use each?",
    prompt: "Differentiate between props and state in React. When would you use props vs state?",
    answer:
      "Props are read-only data passed from parent to child; they are immutable from the child's perspective. State is mutable data managed within a component; when state changes, the component re-renders. Use props for configuration and parent-driven data; use state for component-internal, changeable data.",
    language: "tsx",
  },
  {
    id: "react-r-3",
    topic: "react",
    level: "rookie",
    title: "What are React hooks? Name the rules of hooks.",
    prompt: "What are hooks and what rules must you follow when using them?",
    answer:
      "Hooks (useState, useEffect, etc.) let you use state and other React features in function components. Rules: (1) Only call hooks at the top level—not inside loops, conditions, or nested functions. (2) Only call hooks from React function components or custom hooks. This ensures consistent hook order per render.",
    language: "tsx",
  },
  // React - Mid
  {
    id: "react-m-1",
    topic: "react",
    level: "mid",
    title: "Build a controlled input component",
    prompt: "Create a React component for a text input whose value is controlled by React state.",
    answer:
      "function ControlledInput() {\n  const [value, setValue] = useState('');\n  return (\n    <input\n      value={value}\n      onChange={(e) => setValue(e.target.value)}\n      placeholder=\"Type here\"\n    />\n  );\n}",
    starterCode: "function ControlledInput() {\n  // use useState, value, onChange\n  return <input />;\n}",
    language: "tsx",
  },
  {
    id: "react-m-2",
    topic: "react",
    level: "mid",
    title: "When to use useMemo and useCallback?",
    prompt: "Explain useMemo and useCallback. When should you use them and when might they be unnecessary?",
    answer:
      "useMemo memoizes a computed value; useCallback memoizes a function reference. Use them when: (1) passing callbacks to optimized child components that rely on referential equality, (2) expensive computations that should only run when deps change. Avoid overusing—they add overhead; use when you measure a real performance need.",
    language: "tsx",
  },
  {
    id: "react-m-3",
    topic: "react",
    level: "mid",
    title: "Implement a custom useDebounce hook",
    prompt: "Write a useDebounce(value, delay) hook that returns a debounced value.",
    answer:
      "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debouncedValue;\n}",
    starterCode: "function useDebounce(value, delay) {\n  // your code\n  return value;\n}",
    language: "tsx",
  },
  // React - Pro
  {
    id: "react-p-1",
    topic: "react",
    level: "pro",
    title: "Implement a useReducer-based form with validation",
    prompt: "Create a small form (name, email) using useReducer. Validate on blur and show errors.",
    answer:
      "const formReducer = (state, action) => {\n  switch (action.type) {\n    case 'SET_FIELD': return { ...state, [action.field]: action.value };\n    case 'SET_ERROR': return { ...state, errors: { ...state.errors, [action.field]: action.error } };\n    default: return state;\n};\nfunction Form() {\n  const [state, dispatch] = useReducer(formReducer, { name: '', email: '', errors: {} });\n  const validate = (field, value) => { /* validation logic */ };\n  return (/* form JSX with onBlur calling validate */);\n}",
    starterCode: "// useReducer, validate on blur, show errors",
    language: "tsx",
  },
  // HTML - Rookie
  {
    id: "html-r-1",
    topic: "html",
    level: "rookie",
    title: "What is the difference between div and span?",
    prompt: "When would you use a div vs a span? What are the default display behaviors?",
    answer:
      "div is a block-level element (starts on a new line, takes full width by default). span is inline (stays in the flow with surrounding content). Use div for block-level grouping/sections; use span for wrapping inline content (e.g. styling part of a sentence).",
    language: "html",
  },
  {
    id: "html-r-2",
    topic: "html",
    level: "rookie",
    title: "What are semantic HTML elements? Give examples.",
    prompt: "What is semantic HTML and why is it important? Name at least five semantic elements.",
    answer:
      "Semantic elements convey meaning to both browsers and assistive tech. Examples: header, footer, main, nav, article, section, aside, figure, figcaption. Benefits: accessibility (screen readers), SEO, clearer structure, and default styling hints.",
    language: "html",
  },
  {
    id: "html-r-3",
    topic: "html",
    level: "rookie",
    title: "How do you make a form accessible?",
    prompt: "List best practices for accessible HTML forms.",
    answer:
      "Use <label> with for/id linking to inputs; use fieldset/legend for groups; provide clear error messages and associate them with inputs (aria-describedby); use appropriate input types and autocomplete; ensure sufficient color contrast and focus styles; use required and aria-required where needed.",
    language: "html",
  },
  // HTML - Mid
  {
    id: "html-m-1",
    topic: "html",
    level: "mid",
    title: "Build a responsive table with caption and scope",
    prompt: "Write a simple HTML table for a product list (name, price, stock) with proper semantics and accessibility.",
    answer:
      "<table>\n  <caption>Product list</caption>\n  <thead>\n    <tr><th scope=\"col\">Name</th><th scope=\"col\">Price</th><th scope=\"col\">Stock</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Widget</td><td>$10</td><td>50</td></tr>\n  </tbody>\n</table>",
    starterCode: "<table>\n  <!-- caption, thead, tbody, scope -->\n</table>",
    language: "html",
  },
  // CSS - Rookie
  {
    id: "css-r-1",
    topic: "css",
    level: "rookie",
    title: "What is the CSS box model?",
    prompt: "Explain the CSS box model. What are content, padding, border, and margin?",
    answer:
      "Every element is a box with: content (inner area), padding (space between content and border), border, and margin (space outside the border). box-sizing: content-box (default) makes width/height apply to content only; box-sizing: border-box includes padding and border in width/height.",
    language: "css",
  },
  {
    id: "css-r-2",
    topic: "css",
    level: "rookie",
    title: "Difference between flexbox and grid",
    prompt: "When would you choose Flexbox vs CSS Grid?",
    answer:
      "Flexbox is one-dimensional (row or column); use it for aligning items in a single direction, nav bars, or flexible components. Grid is two-dimensional (rows and columns); use it for page layouts and when you need explicit control over both axes. Often combined: grid for layout, flex for content inside cells.",
    language: "css",
  },
  {
    id: "css-r-3",
    topic: "css",
    level: "rookie",
    title: "What is specificity and how is it calculated?",
    prompt: "How does CSS specificity work? How do you calculate which rule wins?",
    answer:
      "Specificity is (inline, IDs, classes/attributes/pseudoclasses, elements/pseudoelements). Count each: (0,0,0,0). Inline style beats ID; ID beats class; class beats element. !important overrides except another !important with higher specificity. Prefer low-specificity and avoid !important when possible.",
    language: "css",
  },
  // CSS - Mid
  {
    id: "css-m-1",
    topic: "css",
    level: "mid",
    title: "Center a div (flex and grid)",
    prompt: "Show how to center a div both horizontally and vertically using Flexbox, then using Grid.",
    answer:
      "Flex: .parent { display: flex; justify-content: center; align-items: center; }\nGrid: .parent { display: grid; place-items: center; } or place-content: center with one row/column.",
    starterCode: "/* Flex and Grid centering */",
    language: "css",
  },
  {
    id: "css-m-2",
    topic: "css",
    level: "mid",
    title: "BEM naming convention",
    prompt: "Explain BEM and write example class names for a card component with a title and a button.",
    answer:
      "BEM: Block__Element--Modifier. Block = standalone component; Element = part of block; Modifier = variation.\n.card { }\n.card__title { }\n.card__button { }\n.card__button--primary { }\n.card--featured { }",
    language: "css",
  },
  // CSS - Pro
  {
    id: "css-p-1",
    topic: "css",
    level: "pro",
    title: "Implement a responsive sidebar layout with CSS Grid",
    prompt: "Create a layout: sidebar (fixed width) + main content (fluid). Sidebar stacks above main on small screens. Use only CSS.",
    answer:
      ".layout { display: grid; grid-template-columns: 240px 1fr; gap: 1rem; }\n@media (max-width: 768px) { .layout { grid-template-columns: 1fr; } }\n.sidebar { min-width: 0; }\n.main { min-width: 0; }",
    starterCode: "/* grid layout, sidebar + main, responsive */",
    language: "css",
  },
];

export function getQuestions(filters?: { topic?: Topic; level?: Level }): Question[] {
  if (!filters) return questions;
  return questions.filter(
    (q) =>
      (filters.topic == null || q.topic === filters.topic) &&
      (filters.level == null || q.level === filters.level)
  );
}
export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
export function getQuestionIds(): string[] {
  return questions.map((q) => q.id);
}
