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