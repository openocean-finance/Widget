import { getHashParams } from "@/utils/helpers";


const baseURL = process.env.VUE_APP_URL;
const InfuraId = "";
const ERC20_abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];

const MetaInfo = {
  OPENOCEAN: [
    {
      name: "description",
      content:
        "OpenOcean is the entrance for one-stop crypto trading on DEXes and CEXes. OpenOcean finds the best price and lowest slippage for traders on aggregated DEXes and CEXes by applying a deeply optimized intelligent routing algorithm.OpenOcean also provides users with APIs to support their specific investment strategy, and provide institutional investors with tailor-made user interfaces.",
    },
    {
      name: "keywords",
      content:
        "OpenOcean, OpenOcean exchange, liquidity pool, AMM, DEX, stablecoin",
    },
    { property: "og:title", content: "OpenOcean: Trade crypto your way" },
    {
      property: "twitter:title",
      content: "OpenOcean: Trade crypto your way",
    },
    {
      name: "twitter:image:alt",
      content: "OpenOcean: Trade crypto your way",
    },
    {
      property: "og:description",
      content:
        "The best DEX aggregator and the smartest CeDeFi aggregator, giving the best price swaps across top DEXes on major chains and empowering your strategies with wealth management tools.",
    },
    {
      name: "twitter:description",
      content:
        "The best DEX aggregator and the smartest CeDeFi aggregator, giving the best price swaps across top DEXes on major chains and empowering your strategies with wealth management tools. ",
    },
    { property: "og:url", content: "/" },
    {
      property: "og:image",
      content: "https://cloudstorage.openocean.finance/static/main-cover.jpeg",
    },
    {
      name: "twitter:image",
      content: "https://cloudstorage.openocean.finance/static/main-cover.jpeg",
    },
    { property: "og:site_name", content: "OpenOcean Finance" },
    { name: "twitter:site", content: "@OpenOcean" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]
};

const getWalletType = () => {

  let hash = getHashParams(window.location.hash)
  let type
  if (hash.length == 3) {
    type = hash[0]
    localStorage.setItem("chainName", type);
  } else {
    type = localStorage.getItem("chainName");
  }
  
  return !type || type === "undefined" ? "bsc" : type;
}

export { baseURL, InfuraId, ERC20_abi, MetaInfo, getWalletType };
