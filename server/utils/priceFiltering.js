const parsePriceRange = (priceRange) => {
  switch (priceRange) {
    case "below 10000":
      return [0, 9999];
    case "10000-20000":
      return [10000, 20000];
    case "20000-30000":
      return [20000, 30000];
    case "30000-40000":
      return [30000, 40000];
    case "40000-50000":
      return [40000, 50000];
    case "above 50000":
      return [50001, Infinity];
    default:
      return [null, null];
  }
};

export default parsePriceRange;
