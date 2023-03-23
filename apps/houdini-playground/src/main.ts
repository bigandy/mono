import "./style.css";

import snowFlakesWorkletURL from "./houdini/snowflakes.js?worker&url";
import stripesWorkletURL from "./houdini/stripes.js?worker&url";
import squaresWorkletURL from "./houdini/squares.js?worker&url";

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

<h2>Pseudo border-image</h2>

<p>Regular border-image does not allow border-radius. This technique uses a ::before pseudo element with a background, and masking to produce the hole in the middle. Only works in webkit Chrome.</p>

<p><a href="https://dev.to/afif/border-with-gradient-and-radius-387f">Link to demo</a></p>

<div class="container">
    <div class="demo demo--pseudo-border-image snowflakes"></div>
    <div class="demo demo--pseudo-border-image stripes"></div>
    <div class="demo demo--pseudo-border-image squares"></div>
  </div>

`;
