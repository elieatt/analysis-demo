const dataSet = require("./SuperMarket-API");

const dataSource = {
  mainDataSet: {}
};

dataSource.mainDataSet = dataSet.generateData();

const getCompanies = () => {
  return dataSource.mainDataSet.companies;
};

const getCompaniesPrices = (companyId) => {
  const rawPrices = dataSource.mainDataSet.companiesPrices;
  return rawPrices.filter((p) => p.company === companyId);
};

const getMarkets = () => {
  return dataSource.mainDataSet.markets;
};

const getMarketsPrices = (marketId) => {
  const rawPrices = dataSource.mainDataSet.marketsPrices;
  return rawPrices.filter((p) => p.market === marketId);
};

module.exports = {
  fetchCompanies: getCompanies,
  fetchCompaniesPrices: getCompaniesPrices,
  fetchMarkets: getMarkets,
  fetchMarketsPrices: getMarketsPrices
};
