import "./style.css";

import snowFlakesWorkletURL from "./houdini/snowflakes.js?url";
import stripesWorkletURL from "./houdini/stripes.js?url";
import squaresWorkletURL from "./houdini/squares.js?url";

if ("paintWorklet" in CSS) {
  const worklets = [snowFlakesWorkletURL, stripesWorkletURL, squaresWorkletURL];

  worklets.forEach((worklet) => {
    // @ts-ignore
    CSS.paintWorklet.addModule(worklet);
  });
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Houdini Playground</h1>

<h2>Background-image</h2>

<div class="container">
    <div class="demo demo--background snowflakes"></div>
    <div class="demo demo--background stripes"></div>
    <div class="demo demo--background squares"></div>
  </div>

<h2>border-image</h2>

<div class="container">
    <div class="demo demo--border-image snowflakes"></div>
    <div class="demo demo--border-image stripes"></div>
    <div class="demo demo--border-image squares"></div>
  </div>

`;
