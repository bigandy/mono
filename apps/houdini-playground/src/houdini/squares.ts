import { mulberry32 } from "../utils/mulberry32";

// A Houdini Paint worklet class that generates vertical stripes with random fill color

/**
 * A Houdini Paint class to create "squares"
 * @property --square-row-count
 * @property --square-column-count
 */
class SquaresClass {
  static get inputProperties() {
    return ["--square-row-count", "--square-column-count", "--square-seed"];
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: { width: number; height: number },
    properties: any
  ) {
    const { height, width } = size;

    const columnCount = parseInt(properties.get(`--square-column-count`)) || 10;
    const rowCount = parseInt(properties.get(`--square-row-count`)) || 10;
    const now: Date = new Date();

    // // get a random seed value every minute.
    const seedValue =
      parseInt(properties.get(`--square-seed`)) || now.getMilliseconds();

    const stripeWidth = width / columnCount;
    const stripeHeight = height / rowCount;

    // a function for getting a random number between 0 and 1 from the seedValue
    const random = mulberry32(seedValue);

    for (var i = 0; i < columnCount; i++) {
      for (var j = 0; j < rowCount; j++) {
        const hue = Math.round(random() * 360);
        const opacity = random() * 4;
        ctx.fillStyle = `hsl(${hue} 100% 50% / ${opacity})`;
        ctx.fillRect(i * stripeWidth, j * stripeHeight, stripeWidth, height);
      }
    }
  }
}
// @ts-ignore
registerPaint("squares", SquaresClass);
