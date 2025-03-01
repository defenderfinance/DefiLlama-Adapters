const { getConfig } = require("../helper/cache");
const { sumTokens } = require("../helper/sumTokens");

let messinaAssets;

const tokenChain = {
  ethereum: 2,
  algorand: 8,
};

const fetchAssets = async () => {
  if (!messinaAssets)
    messinaAssets = getConfig('messina-one',
      "https://messina.one/api/bridge/get-assets?cache=true"
    );

  return messinaAssets;
};

const tvl = async (_, _1, _2, { chain}) => {
  messinaAssets = await fetchAssets();
  const toa = messinaAssets.filter((t) => t.chainId == tokenChain[chain]).map(i => ([i.id, i.escrowAddress]))
  return sumTokens({ chain, tokensAndOwners: toa })
};

module.exports = {
  methodology: "Fetches assets currently held by Messina.one contracts.",
  ethereum: { tvl },
  algorand: { tvl },
};
