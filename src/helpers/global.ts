/**
 * Will display the class when the value of its key is true
 * @param names class names to check
 */
export const ClassNames = (names: { [key: string]: boolean }): string => {
  const classes = new Array<string>();
  for (const key in names) {
    if (names[key])
      classes.push(key);
  }
  return classes.join(" ");
};

export const WebGlAvailable: boolean = (() => {
  try {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
})();

/**
 * Checks whether the current browser prefers darkmode
 */
export const PreferrsDarkmode = () => {
  if (process.env.BROWSER !== "true") return false;
  if (!window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}