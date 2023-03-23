import { mulberry32 } from "../utils/mulberry32";
import { type DirectionTypes } from "../utils/types";

// A Houdini Paint worklet class that generates vertical stripes with random fill color
class StripesClass {
  static get inputProperties() {
    return [`--stripe-direction`, "--stripe-count", "--stripe-seed"];
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: { width: number; height: number },
    properties: any
  ) {
    const { height, width } = size;

    const stripeCount = parseInt(properties.get(`--stripe-count`)) || 10;
    const now: Date = new Date();

    // get a random seed value every minute.
    const seedValue =
      parseInt(properties.get(`--stripe-seed`)) || now.getMinutes();

    console.log(seedValue);

    const direction: DirectionTypes =
      properties.get(`--stripe-direction`).toString().trim() || "horizontal";

    const stripeWidth = width / stripeCount;
    const stripeHeight = height / stripeCount;
    const stripes = [...new Array(stripeCount)];

    // a function for getting a random number between 0 and 1 from the seedValue
    const random = mulberry32(seedValue);

    // loop through the stripes and use the
    stripes.forEach((_, index) => {
      const hue = Math.round(random() * 360);
      const opacity = random() * 3;

      ctx.fillStyle = `hsl(${hue} 100% 50% / ${opacity}`;

      if (direction === "vertical") {
        ctx.fillRect(index * stripeWidth, 0, stripeWidth, height);
      } else {
        ctx.fillRect(0, index * stripeHeight, width, stripeHeight);
      }
    });
  }
}
// @ts-ignore
registerPaint("stripes", StripesClass);
