import { type FillType } from "../utils/types";
import { mulberry32 } from "../utils/mulberry32";

function lerp(start: number, end: number, amount: number, fill?: FillType) {
  if (fill === "bottom") {
    return end - start * amount;
  } else {
    return (end - start) * amount;
  }
}

/**
 * A Houdini Paint class to create "snowflakes"
 * Inspired from this article: https://12daysofweb.dev/2021/houdini/
 */
class SnowFlakesClass {
  static get inputProperties() {
    return [
      `--snowflake-fill-hue`,
      "--snowflake-fill-direction",
      "--snowflake-count",
    ];
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: { width: number; height: number },
    properties: any
  ) {
    const fillHue = parseInt(properties.get(`--snowflake-fill-hue`)) || 100;
    const flakes = parseInt(properties.get(`--snowflake-count`)) || 100;
    const { width, height } = size;

    const min = 2;
    const max = 7;
    const fill: FillType =
      properties.get(`--snowflake-fill-direction`).toString().trim() || "all";

    const random = mulberry32(flakes);

    const startPos = fill === "bottom" ? height / 2 : 0;
    const endPos = fill === "top" ? height / 2 : height;

    const snowflakeArr = [...Array(flakes)].map(() => {
      return {
        x: lerp(0, width, random()),
        y: lerp(startPos, endPos, random(), fill),
      };
    });

    snowflakeArr.forEach((point) => {
      ctx.fillStyle = `hsl(${fillHue} 100% 50% / 1)`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, lerp(min, max, random()), 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
// @ts-ignore
registerPaint("snowflakes", SnowFlakesClass);
