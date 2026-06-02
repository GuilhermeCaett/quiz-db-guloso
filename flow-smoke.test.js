const fs = require("fs");
const vm = require("vm");

const storage = new Map();
const listeners = {};
const app = { innerHTML: "" };
const panel = { classList: { add() {} } };
const answerNodes = [];
const loadingNodes = {
  "#loader-bar": { style: {} },
  "#loader-percent": { textContent: "" },
  "#loader-copy": { textContent: "" },
};

global.window = { scrollTo() {}, addEventListener() {}, history: { pushState() {}, replaceState() {}, length: 1 }, location: { href: "http://localhost/" } };
global.localStorage = {
  setItem(key, value) { storage.set(key, value); },
  getItem(key) { return storage.get(key) ?? null; },
  removeItem(key) { storage.delete(key); },
};
global.document = {
  querySelector(selector) { return selector === "#app" ? app : selector === ".panel" ? panel : loadingNodes[selector]; },
  querySelectorAll(selector) { return selector === ".answer" ? answerNodes : []; },
  addEventListener(type, handler) { listeners[type] = handler; },
};
let intervalCallback;
global.setInterval = (callback) => { intervalCallback = callback; return 1; };
global.clearInterval = () => {};
global.setTimeout = (callback) => callback();

vm.runInThisContext(fs.readFileSync("./app.js", "utf8"), { filename: "app.js" });

const clickAction = (action) => listeners.click({ target: { closest: (selector) => selector === "[data-action]" ? { dataset: { action } } : null } });
const clickAnswer = (answer = 0) => listeners.click({ target: { closest: (selector) => selector === "[data-answer]" ? { dataset: { answer }, classList: { add() {} }, querySelector: () => ({ innerHTML: "" }) } : null } });

clickAction("start");
for (let index = 0; index < 10; index += 1) {
  clickAnswer(0);
  if ([3, 5, 7].includes(index)) clickAction("continue");
}
for (let index = 0; index < 50; index += 1) intervalCallback();

if (!app.innerHTML.includes("Seu plano Diabético Guloso está pronto")) throw new Error("Result screen was not reached");
clickAction("sales");
if (!app.innerHTML.includes("Quero meu plano por R$19,90")) throw new Error("Sales page was not reached");
console.log("Quiz smoke test passed: 10 questions, 3 pauses, loading, result and sales page.");
