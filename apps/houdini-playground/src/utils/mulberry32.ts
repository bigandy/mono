/**
 * Mulberry32 is pseudorandom number generators (PRNG)
 * @link https://12daysofweb.dev/2021/houdini/#add-randomness-responsibly-with-a-prng
 * @param a number
 * @returns number;
 */
export function mulberry32(base: number): () => number {
  return function () {
    base |= 0;
    base = (base + 0x6d2b79f5) | 0;
    var t = Math.imul(base ^ (base >>> 15), 1 | base);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
