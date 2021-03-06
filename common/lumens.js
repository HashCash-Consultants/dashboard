// This file contains functions used both in backend and frontend code.
// Will be helpful to build distribution stats API.
import axios from "axios";
import BigNumber from "bignumber.js";
import map from "lodash/map";
import reduce from "lodash/reduce";
import find from "lodash/find";

const horizonLiveURL = "https://bitpaymentz.com";

const accounts = {

}

export function getHCXBalance(horizonURL, accountId) {
  return axios.get(`${horizonURL}/accounts/${accountId}`)
    .then(response => {
      var hcxBalance = find(response.data.balances, b => b.asset_type == 'native');
      return hcxBalance.balance;
    });
}

export function totalCoins(horizonURL) {
  return axios.get(`${horizonURL}/ledgers/?order=desc&limit=1`)
    .then(response => response.data._embedded.records[0].total_coins);
}

export function distributionAll() {
  return Promise.all([
    distributionDirectSignup(),
    distributionBitcoinProgram(),
    distributionPartnershipProgram(),
    distributionBuildChallenge()
  ]).then(balances => {
    var amount = reduce(balances, (sum, balance) => sum.add(balance), new BigNumber(0));
    return amount.toString();
  })
}

export function distributionDirectSignup() {
  return Promise.all([
    getHCXBalance(horizonLiveURL, accounts.worldGiveaway),
    getHCXBalance(horizonLiveURL, accounts.invitesHot),
  ]).then(balances => {
    var amount = new BigNumber(50*Math.pow(10, 9)); // 50B
    amount = amount.minus(balances[0]);
    amount = amount.minus(balances[1]);
    return amount.toString();
  })
}

export function distributionBitcoinProgram() {
  return "2037756769.6575473";
}

export function distributionBuildChallenge() {
  let sum = 49116333+30520000+7950000+62400000+5700000;
  return sum.toString();
}

export function distributionPartnershipProgram() {
  return getHCXBalance(horizonLiveURL, accounts.partnerships).then(balance => {
    var amount = new BigNumber(25*Math.pow(10, 9)); // 25B
    amount = amount.minus(balance);
    return amount.toString();
  })
}

export function sdfAccounts() {
  var balanceMap = map(accounts, id => getHCXBalance(horizonLiveURL, id));
  return Promise.all(balanceMap).then(balances => {
    return reduce(balances, (sum, balance) => sum.add(balance), new BigNumber(0));
  });
}

export function availableCoins() {
  return Promise.all([totalCoins(horizonLiveURL), sdfAccounts()])
    .then(result => {
      let [totalCoins, sdfAccounts] = result;
      return new BigNumber(totalCoins).minus(sdfAccounts);
    });
}

