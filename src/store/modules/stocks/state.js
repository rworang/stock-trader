import {
  countries,
  stocksList,
  stocksPrices,
  stocksProfiles,
  stocksTechnicals,
  stocksFundamental
} from "../../../data/fcsapi";

export const state = {
  countries,
  stocksList,
  stocksPrices,
  stocksProfiles,
  stocksTechnicals,
  stocksFundamental,
  stocksIndex: [],
  stocksLength: () => {
    return stocksList.length;
  },
  pageSize: 20,
  categories: ["list", "prices", "profiles", "technicals", "fundamental"],
  list: [
    stocksList,
    stocksPrices,
    stocksProfiles,
    stocksTechnicals,
    stocksFundamental
  ]
};
