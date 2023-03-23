import "./style.css";

import snowFlakesWorkletURL from "./houdini/snowflakes.js?url";
import stripesWorkletURL from "./houdini/stripes.js?url";

if ("paintWorklet" in CSS) {
  console.log("yes we have support");
  // @ts-ignore
  CSS.paintWorklet.addModule(snowFlakesWorkletURL);
  // @ts-ignore
  CSS.paintWorklet.addModule(stripesWorkletURL);
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <div class="snowflakes"></div>
    <div class="stripes"></div>
  </div>
`;
