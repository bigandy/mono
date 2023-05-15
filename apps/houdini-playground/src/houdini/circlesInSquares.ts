import { mulberry32 } from "../utils/mulberry32";

// A Houdini Paint worklet class that generates vertical stripes with random fill color

/**
 * A Houdini Paint class to create "circles in squares"
 * @property --square-row-count
 * @property --square-column-count
 */
class CirclesInSquares {
  static get inputProperties() {
    return [
      "--circle-square-row-count",
      "--circle-square-column-count",
      "--circle-square-seed",
    ];
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: { width: number; height: number },
    properties: any
  ) {
    const { height, width } = size;

    const columnCount =
      parseInt(properties.get(`--circle-square-column-count`)) || 10;
    const rowCount =
      parseInt(properties.get(`--circle-square-row-count`)) || 10;
    const now: Date = new Date();

    // // get a random seed value every minute.
    const seedValue =
      parseInt(properties.get(`--circle-square-seed`)) || now.getMilliseconds();

    // console.log(seedValue);

    const stripeWidth = width / columnCount;
    const stripeHeight = height / rowCount;

    // a function for getting a random number between 0 and 1 from the seedValue
    const random = mulberry32(seedValue);

    for (var i = 0; i < columnCount; i++) {
      for (var j = 0; j < rowCount; j++) {
        const hue = Math.round(random() * 360);
        const opacity = random() * 0.5;
        ctx.fillStyle = `hsl(${hue} 100% 50% / ${opacity})`;
        ctx.fillRect(i * stripeWidth, j * stripeHeight, stripeWidth, height);

        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue} 100% 50% / 1)`;

        ctx.lineTo(
          j * stripeWidth + 0.5 * stripeWidth + stripeWidth / 4,
          j * stripeWidth + 0.5 * stripeWidth
        );

        // quarter-circle at 0.5
        // half-circle at 1
        // three-quarter-circle at 1.5
        // full circle at 2
        const getQuarter = () => (Math.ceil(random() * 4) / 4) * 2;

        const radius = stripeWidth / (2 + 2 * random());
        const x = i * stripeWidth + 0.5 * stripeWidth;
        const y = j * stripeHeight + 0.5 * stripeWidth;
        const startAngle = 0;
        const endAngle = Math.PI * getQuarter();

        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.lineTo(
          i * stripeWidth + 0.5 * stripeWidth,
          j * stripeWidth + 0.5 * stripeWidth
        );
        ctx.fill();
      }
    }
  }
}
// @ts-ignore
registerPaint("circlesInSquares", CirclesInSquares);
