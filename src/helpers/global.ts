import { alea as Random } from "seedrandom";

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
  if (!process.env.BROWSER) return false;
  if (!window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Randomizes an array
 * @param array array to randomize
 * @param seed seed for the rng
 */
export const Randomize = <T>(array: Array<T>, seed: string) => {
  const random = Random(seed);
  let rand: number;
  let temp: T;
  for (let index = array.length; index > 0; index--) {
    rand = Math.floor(random() * index);
    temp = array[index - 1];
    array[index - 1] = array[rand];
    array[rand] = temp;
  }
}

/**
 * Generates a random seed value
 */
export const CreateSeed = (): string => {
  const random = Random(new Date().getTime().toString(16));
  return (random.int32() + 0x7FFFFFFF).toString(16);
}

/**
 * Gets the language that is set in the current url
 */
export const LanguageFromPath = (): string => {
  if (!process.env.BROWSER) {
    // window.location doesn't exists on server side
    return "en";
  }
  const regex = /^\/([a-z]{2})\//i;
  const language = regex.test(location.pathname) ? regex.exec(location.pathname)[1] : "en";
  return language;
}
