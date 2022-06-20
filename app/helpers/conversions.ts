export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings/16233919#16233919
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const concatToLowerCase = (str: string): string =>
  str.split(" ").join("").toLowerCase();

export const getDateAndTimeStrings = (date: Date): string =>
  `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
