import IconEth from "@/assets/chains/eth.svg";
import IconBNB from "@/assets/chains/bnb.svg";
import IconOntology from "@/assets/chains/ontology.svg";
import IconMetis from "@/assets/chains/metis.svg";
import IconSolana from "@/assets/chains/solana.svg";
import IconPolkadot from "@/assets/chains/polkadot.svg";
import IconNeo from "@/assets/chains/neo.svg";
import IconFantom from "@/assets/chains/fantom.svg";
import IconPolygon from "@/assets/chains/polygon.svg";
import IconGnosis from "@/assets/chains/gnosis.svg";
import IconAvalanche from "@/assets/chains/avalanche.svg";
import IconHarmony from "@/assets/chains/harmony.svg";
import IconArbitrum from "@/assets/chains/arbitrum.svg";
import IconOptimism from "@/assets/chains/optimism.svg";
import IconMoonriver from "@/assets/chains/moonriver.svg";
import IconAurora from "@/assets/chains/aurora.svg";
import IconCronos from "@/assets/chains/cronos.svg";
import IconOsmosis from "@/assets/chains/osmosis.svg";
import IconSifchain from "@/assets/chains/sifchain.svg";
import IconAptos from '@/assets/chains/aptos.svg'
import IconNear from "@/assets/chains/near.svg";
import IconKava from "@/assets/chains/kava.svg";
import IconCelo from "@/assets/chains/celo.svg";
import IconKlaytn from "@/assets/chains/klaytn.svg";
import IconLinea from "@/assets/chains/linea.svg";
import IconStarknet from "@/assets/chains/starknet.svg";
import IconZkSync from "@/assets/chains/zksync.svg";
import IconTelos from "@/assets/chains/telos.svg";
import IconScroll from "@/assets/chains/scroll.svg";
import IconBase from "@/assets/chains/base.svg";
import IconOpBNB from "@/assets/chains/bnb.svg";
import IconMantle from "@/assets/chains/mantle.png";
import IconManta from "@/assets/chains/manta.svg";
import IconBlastSepolia from "@/assets/chains/blast.svg";
import IconMode from "@/assets/chains/mode.svg";
import IconPulseChain from "@/assets/chains/pulse.svg";
import IconMerlinChain from "@/assets/chains/merlin.png";
import IconRootstock from "@/assets/chains/rootstock.svg";

import { isApp, isMobile } from "./helpers";

const getChains = () => {
  return [
    {
      name: "Ethereum Mainnet",
      label: "Ethereum",
      value: "eth",
      walletValue: "eth",
      chainId: 1,
      type: "02",
      hot: true,
      icon: IconEth,
      iconDark: IconEth,
      blockExplorerUrl: "https://etherscan.io/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdt",
      },
      popularToken: [
        "ETH",
        "USDT",
        "USDC",
        "BUSD",
        "UNI",
        "C98",
        "LINK",
        "MATIC",
      ],
      disabled: false,
      mobile: false,
      nft: true,
      rpcUrls: [
        "https://api.mycryptoapi.com/eth",
        "https://www.1rpc.io/eth",
        "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79",
        "https://cloudflare-eth.com/",
        "https://mainnet-nethermind.blockscout.com/",
        "https://nodes.mewapi.io/rpc/eth",
        "https://main-rpc.linkpool.io/",
      ],
    },
    {
      name: "BNB Chain",
      label: "BNB Chain",
      value: "bsc",
      walletValue: "bsc",
      chainId: 56,
      type: "02",
      hot: true,
      icon: IconBNB,
      iconDark: IconBNB,
      blockExplorerUrl: "https://bscscan.com/tx/",
      defaultSymbol: {
        in: "bnb",
        out: "busd",
      },
      popularToken: [
        "OOE",
        "BNB",
        "USDT",
        "BUSD",
        "CAKE",
        "C98",
        "BAKE",
        "MBOX",
      ],
      disabled: false,
      mobile: false,
      rpcUrls: [
        "https://bsc-dataseed.binance.org/",
        "https://bsc-dataseed1.defibit.io/",
        "https://bsc-dataseed1.ninicoin.io/",
        "https://bsc-dataseed2.defibit.io/",
        "https://bsc-dataseed3.defibit.io/",
        "https://bsc-dataseed4.defibit.io/",
        "https://bsc-dataseed2.ninicoin.io/",
        "https://bsc-dataseed3.ninicoin.io/",
        "https://bsc-dataseed4.ninicoin.io/",
        "https://bsc-dataseed1.binance.org/",
        "https://bsc-dataseed2.binance.org/",
        "https://bsc-dataseed3.binance.org/",
        "https://bsc-dataseed4.binance.org/"
      ],
    },
    {
      name: "Arbitrum",
      label: "Arbitrum",
      value: "arbitrum",
      walletValue: "arbitrum",
      chainId: 42161,
      type: "02",
      hot: true,
      icon: IconArbitrum,
      iconDark: IconArbitrum,
      blockExplorerUrl: "https://arbiscan.io/tx/",
      defaultSymbol: {
        in: "uni",
        out: "usdc",
      },
      disabled: false,
      mobile: false,
      nft: true,
    },
    {
      name: "Optimism",
      label: "Optimism",
      value: "optimism",
      walletValue: "optimism",
      chainId: 10,
      type: "02",
      hot: true,
      icon: IconOptimism,
      iconDark: IconOptimism,
      blockExplorerUrl: "https://optimistic.etherscan.io/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
      disabled: false,
      mobile: false,
      nft: true,
    },
    {
      name: "zkSync Era",
      label: "zkSync Era",
      value: "zksync",
      walletValue: "zksync",
      chainId: 324,
      type: "02",
      hot: true,
      icon: IconZkSync,
      iconDark: IconZkSync,
      blockExplorerUrl: "https://explorer.zksync.io/tx/",
      defaultSymbol: {
        in: "ETH",
        out: "usdc",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "Polygon Mainnet",
      label: "Polygon",
      value: "polygon",
      walletValue: "polygon",
      chainId: 137,
      type: "02",
      hot: true,
      icon: IconPolygon,
      iconDark: IconPolygon,
      blockExplorerUrl: "https://polygonscan.com/tx/",
      defaultSymbol: {
        in: "matic",
        out: "usdt",
      },
      popularToken: [
        "OOE",
        "USDT",
        "USDC",
        "MATIC",
        "AAVE",
        "DINO",
        "ADDY",
        "MIMATIC",
      ],
      disabled: false,
      mobile: false,
      nft: true,
      rpcUrls: [
        "https://polygon-rpc.com",
        "https://rpc-mainnet.matic.network",
        "https://rpc-mainnet.maticvigil.com",
        "https://rpc-mainnet.matic.quiknode.pro",
        "https://matic-mainnet.chainstacklabs.com",
        "https://matic-mainnet-full-rpc.bwarelabs.com",
        "https://matic-mainnet-archive-rpc.bwarelabs.com"
      ],
    },
    {
      name: "Avalanche",
      label: "Avalanche",
      value: "avax",
      walletValue: "avax",
      chainId: 43114,
      type: "02",
      hot: true,
      icon: IconAvalanche,
      iconDark: IconAvalanche,
      blockExplorerUrl: "https://cchain.explorer.avax.network/tx/",
      defaultSymbol: {
        in: "avax",
        out: "usdt.e",
      },
      popularToken: [
        "OOE",
        "AVAX",
        "PNG",
        "DAI.E",
        "ETH",
        "WAVAX",
        "JOE",
        "QI",
        "USDC.E",
      ],
      disabled: false,
      mobile: false,
      nft: true,
      rpcUrls: [
        "https://api.avax.network/ext/bc/C/rpc",
        "https://rpc.ankr.com/avalanche",
        "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
        "https://avalancheapi.terminet.io/ext/bc/C/rpc",
      ],
    },
    {
      name: "Fantom",
      label: "Fantom",
      value: "fantom",
      walletValue: "fantom",
      chainId: 250,
      type: "02",
      icon: IconFantom,
      iconDark: IconFantom,
      blockExplorerUrl: "https://ftmscan.com/tx/",
      defaultSymbol: {
        in: "ftm",
        out: "usdc",
      },
      popularToken: [
        "OOE",
        "ETH",
        "USDT",
        "USDC",
        "SPIRIT",
        "1INCH",
        "C98",
        "FTM",
        "fUSDT",
        "MIM",
        "BOO",
      ],
      disabled: false,
      mobile: false,
      rpcUrls: [
        "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac",
        "https://rpc.ftm.tools/",
        "https://rpc.ankr.com/fantom",
        "https://rpc.fantom.network",
        "https://rpc2.fantom.network",
        "https://rpc3.fantom.network",
        "https://rpcapi.fantom.network",
        "https://fantom-mainnet.public.blastapi.io",
      ],
    },
    {
      name: "Base",
      label: "Base",
      value: "base",
      walletValue: "base",
      chainId: 8453,
      type: "02",
      icon: IconBase,
      iconDark: IconBase,
      blockExplorerUrl: "https://basescan.org/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
      popularToken: ['ETH', 'USDC'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Linea Mainnet",
      label: "Linea",
      value: "linea",
      walletValue: "linea",
      chainId: 59144,
      type: "02",
      icon: IconLinea,
      iconDark: IconLinea,
      blockExplorerUrl: "https://lineascan.build/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "Scroll",
      label: "Scroll",
      value: "scroll",
      walletValue: "scroll",
      chainId: 534352,
      type: "02",
      icon: IconScroll,
      iconDark: IconScroll,
      blockExplorerUrl: "https://blockscout.scroll.io/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
      popularToken: ['ETH', 'USDC'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Solana Mainnet",
      label: "Solana",
      value: "solana",
      walletValue: "solana",
      type: "03",
      hot: true,
      icon: IconSolana,
      iconDark: IconSolana,
      blockExplorerUrl: "https://explorer.solana.com/tx/",
      defaultSymbol: {
        in: "sol",
        out: "usdc",
      },
      popularToken: ["SOL", "SNY", "USDT", "USDC", "RAY", "STEP"],
      disabled: false,
      nft: true,
      mobile: false,
      rpcUrls: [],
    },
    {
      name: "Blast",
      label: "Blast",
      value: "blast",
      walletValue: "blast",
      chainId: 81457,
      type: "02",
      hot: true,
      icon: IconBlastSepolia,
      iconDark: IconBlastSepolia,
      blockExplorerUrl: "https://blastscan.io/tx/",
      defaultSymbol: {
        in: "weth",
        out: "usdb",
      },
      popularToken: ["eth", "weth", "usdb"],
      disabled: false,
      mobile: false,
    },
    {
      name: "Mode",
      label: "Mode",
      value: "mode",
      walletValue: "mode",
      chainId: 34443,
      type: "02",
      icon: IconMode,
      iconDark: IconMode,
      blockExplorerUrl: "https://explorer.mode.network/tx/",
      defaultSymbol: {
        in: "weth",
        out: "usdc",
      },
      popularToken: ["eth", "weth", "USDT", "USDC"],
      disabled: false,
      mobile: false,
    },
    {
      name: "Mantle",
      label: "Mantle",
      value: "mantle",
      walletValue: "mantle",
      chainId: 5000,
      type: "02",
      icon: IconMantle,
      iconDark: IconMantle,
      blockExplorerUrl: "https://explorer.mantle.xyz/tx/",
      defaultSymbol: {
        in: "MNT",
        out: "USDT",
      },
      popularToken: ['MNT', 'USDT'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Manta Pacific",
      label: "Manta Pacific",
      value: "manta",
      walletValue: "manta",
      chainId: 169,
      type: "02",
      icon: IconManta,
      iconDark: IconManta,
      blockExplorerUrl: "https://pacific-explorer.manta.network/tx/",
      defaultSymbol: {
        in: "ETH",
        out: "USDC",
      },
      popularToken: ['ETH', 'USDC'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Polygon zkEVM",
      label: "Polygon zkEVM",
      value: "polygon_zkevm",
      walletValue: "polygon_zkevm",
      chainId: 1101,
      type: "02",
      icon: IconPolygon,
      iconDark: IconPolygon,
      blockExplorerUrl: "https://zkevm.polygonscan.com/tx/",
      defaultSymbol: {
        in: "matic",
        out: "usdt",
      },
      popularToken: [
        "OOE",
        "USDT",
        "USDC",
      ],
      disabled: false,
      mobile: false,
      nft: false,
      rpcUrls: [
        "https://rpc.ankr.com/polygon_zkevm",
      ],
    },
    {
      name: "Telos",
      label: "Telos",
      value: "telos",
      walletValue: "telos",
      chainId: 40,
      type: "02",
      icon: IconTelos,
      iconDark: IconTelos,
      blockExplorerUrl: "https://teloscan.io/tx/",
      defaultSymbol: {
        in: "tlos",
        out: "usdt",
      },
      popularToken: ['TLOS', 'POPS', 'USDT'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Gnosis Mainnet",
      label: "Gnosis",
      value: "xdai",
      walletValue: "xdai",
      chainId: 100,
      type: "02",
      icon: IconGnosis,
      iconDark: IconGnosis,
      blockExplorerUrl: "https://blockscout.com/poa/xdai/tx/",
      defaultSymbol: {
        in: "xdai",
        out: "usdt",
      },
      popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
      disabled: false,
      mobile: false,
    },
    {
      name: "Rootstock",
      label: "Rootstock",
      value: "rootstock",
      walletValue: "rootstock",
      chainId: 30,
      type: "02",
      hot: true,
      icon: IconRootstock,
      iconDark: IconRootstock,
      blockExplorerUrl: "https://explorer.rsk.co/tx/",
      defaultSymbol: {
        in: "rbtc",
        out: "usdt",
      },
      popularToken: ["rbtc", "usdc", "usdt"],
      disabled: false,
      mobile: false,
    },
    {
      name: "Kava",
      label: "Kava",
      value: "kava",
      walletValue: "kava",
      chainId: 2222,
      type: "02",
      icon: IconKava,
      iconDark: IconKava,
      blockExplorerUrl: "https://explorer.kava.io/tx/",
      defaultSymbol: {
        in: "kava",
        out: "usdt",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "Metis Andromeda",
      label: "Metis Andromeda",
      value: "metis",
      walletValue: "metis",
      chainId: 1088,
      type: "02",
      icon: IconMetis,
      iconDark: IconMetis,
      blockExplorerUrl: "https://andromeda-explorer.metis.io/tx/",
      defaultSymbol: {
        in: "metis",
        out: "nett",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "opBNB",
      label: "opBNB",
      value: "opbnb",
      walletValue: "opbnb",
      chainId: 204,
      type: "02",
      icon: IconOpBNB,
      iconDark: IconOpBNB,
      blockExplorerUrl: "https://mainnet.opbnbscan.com/tx/",
      defaultSymbol: {
        in: "BNB",
        out: "usdt",
      },
      popularToken: ['BNB', 'USDT'],
      disabled: false,
      mobile: false,
    },
    {
      name: "Celo",
      label: "Celo",
      value: "celo",
      walletValue: "celo",
      chainId: 42220,
      type: "02",
      icon: IconCelo,
      iconDark: IconCelo,
      blockExplorerUrl: "https://explorer.celo.org/tx/",
      defaultSymbol: {
        in: "celo",
        out: "usdt",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "Starknet",
      label: "Starknet",
      value: "starknet",
      walletValue: "starknet",
      type: "03",
      icon: IconStarknet,
      iconDark: IconStarknet,
      blockExplorerUrl: "https://starkscan.co/tx/",
      defaultSymbol: {
        in: "ETH",
        out: "usdc",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "Cronos Mainnet",
      label: "Cronos",
      value: "cronos",
      walletValue: "cronos",
      chainId: 25,
      type: "02",
      icon: IconCronos,
      iconDark: IconCronos,
      blockExplorerUrl: "https://cronos.org/explorer/tx/",
      defaultSymbol: {
        in: "cro",
        out: "usdc",
      },
      disabled: false,
      mobile: true,
    },
    {
      name: "Aptos",
      label: "Aptos",
      value: "aptos",
      walletValue: "aptos",
      type: "03",
      icon: IconAptos,
      iconDark: IconAptos,
      chainId: 'aptos',
      blockExplorerUrl: "https://explorer.aptoslabs.com/txn/",
      defaultSymbol: {
        in: "apt",
        out: "usdc",
      },
      disabled: false,
      mobile: false,
    },
    {
      name: "Aurora Mainnet",
      label: "Aurora",
      value: "aurora",
      walletValue: "aurora",
      chainId: 1313161554,
      type: "02",
      icon: IconAurora,
      iconDark: IconAurora,
      blockExplorerUrl: "https://aurorascan.dev/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
      disabled: false,
      mobile: false,
    },
    {
      name: "Near Mainnet",
      label: "Near",
      value: "near",
      walletValue: "near",
      type: "03",
      icon: IconNear,
      iconDark: IconNear,
      blockExplorerUrl: "https://nearblocks.io/txns/",
      defaultSymbol: {
        in: "USDC",
        out: "NEAR",
      },
      popularToken: ["NEAR", "wNEAR", "USDT", "USDC", "AURORA", "WETH", "DAI"],
      disabled: false,
      mobile: false,
    },
    {
      name: "Moonriver",
      label: "Moonriver",
      value: "moonriver",
      walletValue: "moonriver",
      chainId: 1285,
      type: "02",
      icon: IconMoonriver,
      iconDark: IconMoonriver,
      blockExplorerUrl: "https://moonriver.moonscan.io/tx/",
      defaultSymbol: {
        in: "movr",
        out: "usdc",
      },
      disabled: false,
      mobile: true,
    },
    {
      name: "Harmony Mainnet",
      label: "Harmony",
      value: "harmony",
      walletValue: "harmony",
      chainId: 1666600000,
      type: "02",
      icon: IconHarmony,
      iconDark: IconHarmony,
      blockExplorerUrl: "https://explorer.harmony.one/tx/",
      defaultSymbol: {
        in: "one",
        out: "1usdc",
      },
      disabled: false,
      mobile: false,
    },
    {
      name: "Ontology EVM",
      label: "Ontology EVM",
      value: "ontevm",
      walletValue: "ontevm",
      chainId: 58,
      type: "02",
      icon: IconOntology,
      iconDark: IconOntology,
      blockExplorerUrl: "https://explorer.ont.io/transaction/",
      defaultSymbol: {
        in: "ong",
        out: "usdt",
      },
      popularToken: [],
      disabled: false,
      mobile: false,
    },
    {
      name: "merlin",
      label: "Merlin Chain",
      value: "merlin",
      walletValue: "merlin",
      chainId: 4200,
      type: "04",
      hot: true,
      icon: IconMerlinChain,
      iconDark: IconMerlinChain,
      blockExplorerUrl: "https://scan.merlinchain.io/tx/",
      defaultSymbol: {
        in: "btc",
        out: "usdc",
      },
      popularToken: ["btc", "wbtc", "USDT", "USDC"],
      disabled: true,
      mobile: false,
    },
    {
      name: "PulseChain",
      label: "PulseChain",
      value: "pulse",
      walletValue: "pulse",
      chainId: 369,
      type: "02",
      icon: IconPulseChain,
      iconDark: IconPulseChain,
      blockExplorerUrl: "https://scan.pulsechain.com/tx/",
      defaultSymbol: {
        in: "pls",
        out: "usdc",
      },
      popularToken: ["pls", "USDT", "USDC"],
      disabled: true,
      mobile: false,
    },
    {
      name: "klaytn",
      label: "Klaytn",
      value: "klaytn",
      walletValue: "klaytn",
      chainId: 8217,
      type: "02",
      icon: IconKlaytn,
      iconDark: IconKlaytn,
      blockExplorerUrl: "https://scope.klaytn.com/tx/",
      defaultSymbol: {
        in: "KLAY",
        out: "usdt",
      },
      popularToken: [],
      disabled: true,
      mobile: false,
    },
    {
      name: "Neo",
      label: "Neo",
      value: "neo",
      walletValue: "neo",
      type: "03",
      icon: IconNeo,
      iconDark: IconNeo,
      blockExplorerUrl: "",
      defaultSymbol: {
        in: "eth",
        out: "usdt",
      },
      popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
      disabled: true,
      mobile: true,
    },
    {
      name: "Sifchain Mainnet",
      label: "Sifchain",
      value: "sifchain",
      walletValue: "sifchain",
      chainId: "sifchain-1",
      type: "03",
      icon: IconSifchain,
      iconDark: IconSifchain,
      blockExplorerUrl: "https://www.mintscan.io/sifchain/txs/",
      defaultSymbol: {
        in: "rowan",
        out: "atom",
      },
      popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
      disabled: true,
      mobile: true,
    },
    {
      name: "Osmosis Mainnet",
      label: "Osmosis",
      value: "osmosis",
      walletValue: "osmosis",
      chainId: "osmosis-1",
      type: "03",
      icon: IconOsmosis,
      iconDark: IconOsmosis,
      blockExplorerUrl: "https://www.mintscan.io/osmosis/txs/",
      defaultSymbol: {
        in: "osmo",
        out: "atom",
      },
      disabled: true,
      mobile: true,
    },
    {
      name: "Polkadot",
      label: "Polkadot",
      value: "dot",
      walletValue: "dot",
      type: "03",
      icon: IconPolkadot,
      iconDark: IconPolkadot,
      blockExplorerUrl: "",
      defaultSymbol: {
        in: "eth",
        out: "usdt",
      },
      popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
      disabled: true,
      mobile: true,
    },
  ];
};

export const getExchange = (chainCode) => {
  const contract = {
    "zksync": "0x36A1aCbbCAfca2468b85011DDD16E7Cb4d673230",
    "aptos": "0x2514f69adae8f34d3d86a4c390edb40ecf26e7f7693f033849b4339dd34db033",
    "polygon_zkevm": "0x6dd434082EAB5Cd134B33719ec1FF05fE985B97b",
    "okex": "0xc0006Be82337585481044a7d11941c0828FFD2D4",
    "onto": "351134766ae933edd509e968166f1f3471f95f4b",
    "tron": "THjXnRSLrP89xk5CFBtjXb1SLpJeaZuGML",
  }[chainCode] || "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64"
  return {
    contract,
    approveContract: contract
  }
}

export const getBlockExplorerUrl = (chainId, hash) => {
  const chain = getChains().filter((item) => {
    return item.chainId === chainId;
  });
  const url =
    (chain && chain[0] && chain[0].blockExplorerUrl) ||
    "https://etherscan.io/tx/";
  return `${url}${hash}`;
}

export const getChainId = (selectedChain) => {
  return {
    "eth": 1,
    "ropsten": 3,
    "rinkeby": 4,
    "bsc": 56,
    "bsctest": 97,
    "okex": 66,
    "polygon": 137,
    "polygon_zkevm": 1101,
    "xdai": 100,
    "heco": 128,
    "fantom": 250,
    "boba": 288,
    "avax": 43114,
    "arbitrum": 42161,
    "optimism": 10,
    "moonriver": 1285,
    "aurora": 1313161554,
    "cronos": 25,
    "harmony": 1666600000,
    "ontevm": 58,
    "metis": 1088,
    "kava": 2222,
    "celo": 42220,
    "klaytn": 8217,
    "zksync": 324,
    "linea": 59144,
    "telos": 40,
    "scroll": 534352,
    "base": 8453,
    "opbnb": 204,
    "mantle": 5000,
    "manta": 169,
    "x1": 195,
    "blast": 81457,
    "mode": 34443,
    "pulse": 369,
    "merlin": 4200,
    "rootstock": 30
  }[selectedChain];
};

export const getChainCode = (selectedChain) => {
  return {
    "1": "eth",
    "3": "ropsten",
    "4": "rinkeby",
    "56": "bsc",
    "97": "bsctest",
    "66": "okex",
    "137": "polygon",
    "1101": "polygon_zkevm",
    "100": "xdai",
    "128": "heco",
    "250": "fantom",
    "288": "boba",
    "43114": "avax",
    "42161": "arbitrum",
    "10": "optimism",
    "1285": "moonriver",
    "1313161554": "aurora",
    "25": "cronos",
    "1666600000": "harmony",
    "58": "ontevm",
    "1088": "metis",
    "2222": "kava",
    "42220": "celo",
    "8217": "klaytn",
    "324": "zksync",
    "59144": "linea",
    "40": "telos",
    "534352": "scroll",
    "8453": "base",
    "204": "opbnb",
    "5000": "mantle",
    "169": "manta",
    "195": "x1",
    "81457": "blast",
    "34443": "mode",
    "369": "pulse",
    "4200": "merlin",
    "30": "rootstock",
  }[selectedChain]
};

export const ChainMap = {
  '1': 'eth',
  '10': 'optimism',
  '56': 'bsc',
  '137': 'polygon',
  '137': 'polygon',
  '1101': 'polygon_zkevm',
  '42161': 'arbitrum',
  '43114': 'avax',
  'eth': {
    chainId: '1',
    chainCode: 'eth',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: [],
  },
  'optimism': {
    chainId: '17',
    chainCode: 'optimism',
    enabled: false,
    tokenMap: {},
    tokenList: [],
    swapTokenList: [],
  },
  'bsc': {
    chainId: '56',
    chainCode: 'bsc',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: [],
  },
  'polygon': {
    chainId: '137',
    chainCode: 'polygon',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: []
  },
  'fantom': {
    chainId: '250',
    chainCode: 'fantom',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: []
  },
  'arbitrum': {
    chainId: '42161',
    chainCode: 'arbitrum',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: []
  },
  'avax': {
    chainId: '43114',
    chainCode: 'avax',
    enabled: true,
    tokenMap: {},
    tokenList: [],
    swapTokenList: []
  }
}

export const Chains = {
  ETH: 'ETH',
  BSC: 'BSC',
  ONT: 'ONT',
  TRON: 'TRON',
  POLYGON: 'POLYGON',
  POLYGONZKEVM: 'POLYGONZKEVM',
  XDAI: 'XDAI',
  BOBA: 'BOBA',
  FANTOM: 'FANTOM',
  HECO: 'HECO',
  AVALANCHE: 'AVAX',
  OKEX: 'OKEX',
  SOLANA: 'SOLANA',
  STARKNET: 'STARKNET',
  ARBITRUM: 'ARBITRUM',
  OPTIMISM: 'OPTIMISM',
  MOONRIVER: 'MOONRIVER',
  AURORA: 'AURORA',
  CRONOS: 'CRONOS',
  HARMONY: 'HARMONY',
  NEAR: 'NEAR',
  ONTEVM: 'ONTEVM',
  METIS: 'METIS',
  KAVA: 'KAVA',
  CELO: 'CELO',
  KLAYTN: 'KLAYTN',
  ZKSYNC: 'ZKSYNC',
  LINEA: 'LINEA'
};

export const getNativeToken = (selectedChain) => {
  if (
    [
      "eth",
      "ropsten",
      "rinkeby",
    ].indexOf(selectedChain) >= 0
  ) {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 6000000000000000
    };
  }
  else if (
    [
      "arbitrum",
      "optimism",
      "boba",
      "aurora",
    ].indexOf(selectedChain) >= 0
  ) {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (
    [
      "optimism",
    ].indexOf(selectedChain) >= 0
  ) {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "bsc" || selectedChain === "bsctest") {
    return {
      symbol: "BNB",
      id: "binancecoin",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "okex") {
    return {
      symbol: "OKT",
      id: "okexchain",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "polygon") {
    return {
      symbol: "MATIC",
      id: "matic-network",
      address: "0x0000000000000000000000000000000000001010",
      decimals: 18,
      gasAmount: 200000000000000000
    };
  } else if (selectedChain === "polygon_zkevm") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "xdai") {
    return {
      symbol: "XDAI",
      id: "wrapped-xda",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "fantom") {
    return {
      symbol: "FTM",
      id: "fantom",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 200000000000000000
    };
  } else if (selectedChain === "heco") {
    return {
      symbol: "HT",
      id: "huobi-token",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 200000000000000000
    };
  } else if (selectedChain === "avax") {
    return {
      symbol: "AVAX",
      id: "wrapped-avax",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 10000000000000000
    };
  } else if (selectedChain === "terra") {
    return {
      symbol: "UST",
      id: "terrausd",
      address: "",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "moonriver") {
    return {
      symbol: "MOVR",
      id: "moonriver",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "cronos") {
    return {
      symbol: "CRO",
      id: "crypto-com-chain",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "harmony") {
    return {
      symbol: "ONE",
      id: "harmony",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "cosmos") {
    return {
      symbol: "ATOM",
      id: "cosmos",
      address: "",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "solana") {
    return {
      symbol: "SOL",
      id: "solana",
      address: "So11111111111111111111111111111111111111112",
      decimals: 9,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "starknet") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "near") {
    return {
      symbol: "NEAR",
      id: "near",
      address: "near.near",
      decimals: 24,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "ont") {
    return {
      symbol: "ONG",
      id: "ong",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "ontevm") {
    return {
      symbol: "ONG",
      id: "ong",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "metis") {
    return {
      symbol: "METIS",
      id: "metis",
      address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "kava") {
    return {
      symbol: "KAVA",
      id: "kava",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "celo") {
    return {
      symbol: "CELO",
      id: "celo",
      address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "klaytn") {
    return {
      symbol: "KLAY",
      id: "klay-token",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "zksync") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "linea") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "telos") {
    return {
      symbol: "TELOS",
      id: "ethereum",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "scroll") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  } else if (selectedChain === "base") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  }
  else if (selectedChain === "tron") {
    return {
      symbol: "TRX",
      id: "tron",
      address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
      decimals: 6,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "mantle") {
    return {
      symbol: "MNT",
      id: "mantle",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  } else if (selectedChain === "manta") {
    return {
      symbol: "ETH",
      id: "ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 2000000000000000
    };
  }
  else if (selectedChain === "opbnb") {
    return {
      symbol: "BNB",
      id: "opbnb",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "x1") {
    return {
      symbol: "OKB",
      id: "x1",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "blast") {
    return {
      symbol: "ETH",
      id: "blast",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "mode") {
    return {
      symbol: "ETH",
      id: "mode",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "pulse") {
    return {
      symbol: "PLS",
      id: "pulse",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "merlin") {
    return {
      symbol: "BTC",
      id: "btc",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "aptos") {
    return {
      symbol: "APT",
      id: "aptos",
      address: "0x1",
      decimals: 8,
      gasAmount: 1000000000000000
    };
  }
  else if (selectedChain === "rootstock") {
    return {
      symbol: "RBTC",
      id: "rootstock",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      decimals: 18,
      gasAmount: 1000000000000000
    };
  }
};

export const getWrappedNativeToken = (selectedChain) => {
  return {
    eth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    bsc: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", // WBNB
    polygon: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // WMATIC
    avax: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // WAVAX
    fantom: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", // WFTM
    arbitrum: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", // WETH
    optimism: "0x4200000000000000000000000000000000000006", // WETH
    aurora: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB", // WETH
    xdai: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d", // XDAI
    boba: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000", // WETH
    heco: "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F", // WHT
    harmony: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a", // WONE
    cronos: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23", // WCRO
    ontevm: "0xd8bc24cfd45452ef2c8bc7618e32330b61f2691b", // WONG
    okex: "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15", // OKT
    metis: "0x75cb093e4d61d2a2e65d8e0bbb01de8d89b53481", // WMetis
    moonriver: "0x98878B06940aE243284CA214f92Bb71a2b032B8A", // WMOVR
    kava: "0xc86c7c0efbd6a49b35e8714c5f59d99de09a225b", // WKAVA
    celo: "0x471EcE3750Da237f93B8E339c536989b8978a438", // Celo
    klaytn: "0xe4f05a66ec68b54a58b17c22107b02e0232cc817", // WKLAY
    zksync: "0x80115c708e12edd42e504c1cd52aea96c547c05c", // WETH
    linea: "0x2c1b868d6596a18e32e61b901e4060c872647b6c", // WETH
    // telos: "0x2c1b868d6596a18e32e61b901e4060c872647b6c", // WETH
    // scroll: "0x2c1b868d6596a18e32e61b901e4060c872647b6c", // WETH
    // base: "0x2c1b868d6596a18e32e61b901e4060c872647b6c", // WETH
    polygon_zkevm: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9", // WFTM
  }[selectedChain];
};

export const getDefaultToken = (selectedChain) => {
  if (selectedChain === "eth") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "rinkeby") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xa1cba00d6e99f52b8cb5f867a6f2db0f3ad62276",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "bsc") {
    return [
      {
        id: "binancecoin",
        name: "Binance Coin",
        symbol: "BNB",
        icon: "https://s3.openocean.finance/token_logos/logos/bsc/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "binance-usd",
        name: "Binance-Peg BUSD Token",
        symbol: "BUSD",
        icon: "https://s3.openocean.finance/token_logos/logos/bsc/0xe9e7cea3dedca5984780bafc599bd69add087d56.png",
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "solana") {
    return [
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        icon: "https://s3.openocean.finance/token_logos/logos/solana/So11111111111111111111111111111111111111112.png",
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/solana/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.png",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        decimals: 6,
      }
    ];
  } else if (selectedChain === "starknet") {
    return [
      {
        id: "ethereum",
        name: "Ether",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1660273405742_6830679887854216.png",
        address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "near") {
    return [
      {
        id: "near",
        name: "NEAR Protocol",
        symbol: "NEAR",
        icon: "https://s3.openocean.finance/token_logos/logos/1676896600076_23550259326490952.png",
        address: "near.near",
        decimals: 24,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "polygon") {
    return [
      {
        id: "matic-network",
        name: "Matic Token",
        symbol: "MATIC",
        icon: "https://s3.openocean.finance/images/1637561049975_1903381661429342.png",
        address: "0x0000000000000000000000000000000000001010",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "polygon_zkevm") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "avax") {
    return [
      {
        id: "wrapped-avax",
        name: "Avalanche Token",
        symbol: "AVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0x0000000000000000000000000000000000000000.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "fantom") {
    return [
      {
        id: "wrapped-fantom",
        name: "Wrapped Fantom Token",
        symbol: "WFTM",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x0000000000000000000000000000000000000000.png",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "arbitrum") {
    return [
      {
        id: "uniswap",
        name: "Uniswap",
        symbol: "UNI",
        icon: "https://s3.openocean.finance/images/1637745250132_641351376587165.png",
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1637744329482_9981818339876964.png",
        address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "terra") {
    return [
      {
        id: "terra-luna",
        name: "Terra luna",
        symbol: "LUNA",
        icon: "https://s3.openocean.finance/images/1639100963010_2658239135059679.png",
        address: "uluna",
        decimals: 6,
      },
      {
        id: "terrausd",
        name: "uusd",
        symbol: "UST",
        icon: "https://s3.openocean.finance/images/1639029594362_05697848220423185.png",
        address: "uusd",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "xdai") {
    return [
      {
        id: "xdai",
        name: "xDAI",
        symbol: "XDAI",
        icon: "https://s3.openocean.finance/images/1641700780963_888840142160457.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "boba") {
    return [
      {
        id: "weth",
        name: "WETH",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1640068479467_666268388062502.png",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x5de1677344d3cb0d7d465c10b72a8f60699c062d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "ont") {
    return [
      {
        id: "wing-finance",
        name: "Wing Token",
        symbol: "WING",
        icon: "https://s3.openocean.finance/images/1634661206221_011924567549566945.png",
        address: "00c59fcd27a562d6397883eab1f2fff56e58ef80",
        decimals: 9,
      },
      {
        id: "ontology",
        name: "ONT-Decimal",
        symbol: "ONTd",
        icon: "https://s3.openocean.finance/images/1634661267534_05787055010497766.png",
        address: "33ae7eae016193ba0fe238b223623bc78faac158",
        decimals: 9,
      },
    ];
  } else if (selectedChain === "tron") {
    return [
      {
        id: "tron",
        name: "TRX",
        symbol: "TRX",
        icon: "https://s3.openocean.finance/token_logos/logos/tron/T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb.png",
        address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
        decimals: 6,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "heco") {
    return [
      {
        id: "huobi-token",
        name: "Huobi Token",
        symbol: "HT",
        icon: "https://s3.openocean.finance/token_logos/logos/heco/0x0000000000000000000000000000000000000000.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "Heco-Peg USDCHECO Token",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/heco/0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b.png",
        address: "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "okex") {
    return [
      {
        id: "oec-token",
        name: "OKExChain Token",
        symbol: "OKT",
        icon: "https://s3.openocean.finance/images/1645248813662_00923301689420386.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x382bB369d343125BfB2117af9c149795C6C65C50",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "optimism") {
    return [
      {
        id: "ethereum",
        name: "Etherum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1642671041381_10284101720073968.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1638172240797_3452267574610799.png",
        address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "moonriver") {
    return [
      {
        id: "moonriver",
        name: "Moonriver",
        symbol: "MOVR",
        icon: "https://s3.openocean.finance/images/1645695305943_14303353853029155.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aurora") {
    return [
      {
        id: "wrapped-near",
        name: "Near",
        symbol: "NEAR",
        icon: "https://s3.openocean.finance/token_logos/logos/1676896600076_23550259326490952.png",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
        decimals: 24,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Harmony",
        symbol: "ONE",
        icon: "https://s3.openocean.finance/token_logos/logos/1651227331224_44299201118428244.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://s3.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "ontevm") {
    return [
      {
        id: "ong",
        name: "ONG",
        symbol: "ONG",
        icon: "https://s3.openocean.finance/token_logos/logos/1673323576017_07265635366807155.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "ontology",
        name: "Wrapped ONT",
        symbol: "WONT",
        icon: "https://s3.openocean.finance/token_logos/logos/1673244066088_2301398430060222.png",
        address: "0x219cc8e994ea6b35cdcffb5d44e229325d5ad02a",
        decimals: 9,
      },
    ];
  } else if (selectedChain === "metis") {
    return [
      {
        id: "metis",
        name: "METIS",
        symbol: "METIS",
        icon: "https://s3.openocean.finance/token_logos/logos/1675591118302_8481324929046925.jpeg",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "netswap",
        name: "Netswap",
        symbol: "NETT",
        icon: "https://s3.openocean.finance/token_logos/logos/1675569789605_34016460565796436.png",
        address: "0x90fe084f877c65e1b577c7b2ea64b8d8dd1ab278",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "kava") {
    return [
      {
        id: "kava",
        name: "KAVA",
        symbol: "KAVA",
        icon: "https://s3.openocean.finance/token_logos/logos/1675825380979_8618996345284009.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "celo") {
    return [
      {
        id: "celo",
        name: "CELO",
        symbol: "CELO",
        icon: "https://s3.openocean.finance/token_logos/logos/1675828631474_42987407614787054.png",
        address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "klaytn") {
    return [
      {
        id: "klay-token",
        name: "Klaytn",
        symbol: "KLAY",
        icon: "https://s3.openocean.finance/token_logos/logos/1675830073128_2220769732555996.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "orbit-bridge-klaytn-usd-tether",
        name: "Orbit Bridge Klaytn USD Tether",
        symbol: "OUSDT",
        icon: "https://s3.openocean.finance/token_logos/logos/1675830681006_413512059781173.png",
        address: "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "zksync") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "linea") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "telos") {
    return [
      {
        id: "TLOS",
        name: "TLOS",
        symbol: "TLOS",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x975ed13fa16857e83e7c493c7741d556eaad4a3f",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "scroll") {
    return [
      {
        id: "ETH",
        name: "ETH",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "base") {
    return [
      {
        id: "ETH",
        name: "ETH",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "AXLUSDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "cronos") {
    return [
      {
        id: "crypto-com-chain",
        name: "Cronos",
        symbol: "CRO",
        icon: "https://s3.openocean.finance/images/1649345104693_25875851731877186.jpg",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x66e428c3f67a68878562e79a0234c1f83c208770",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "osmosis") {
    return [
      {
        id: "cosmos",
        name: "Cosmos Hub",
        symbol: "ATOM",
        icon: "https://s3.openocean.finance/images/1650361794073_7291591364827013.png",
        address:
          "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
        decimals: 6,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1650429842604_9848666254566818.png",
        address:
          "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "sifchain") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "ceth",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1652158887182_4430143528379695.png",
        address: "cusdc",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aptos") {
    return [
      {
        id: "aptos",
        name: "Aptos",
        symbol: "APT",
        icon: "https://s3.openocean.finance/token_logos/logos/1667977749311_9115826508595049.png",
        address: "0x1",
        decimals: 8,
      },
      {
        id: "tether",
        name: "Tether USD (Wormhole)",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "mantle") {
    return [
      {
        id: "mnt",
        name: "MNT",
        symbol: "MNT",
        icon: "https://s3.openocean.finance/token_logos/logos/1694160452311_9508036999593048.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD (Wormhole)",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "x1") {
    return [
      {
        id: "okb",
        name: "OKB",
        symbol: "OKB",
        icon: "https://s3.openocean.finance/token_logos/logos/1694160452311_9508036999593048.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x4d4907f1b2093f53D9f97064Dc0dD19687caFa9C",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "manta") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1704871520659_24217901857510093.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/1696854390695_9268415263413137.png",
        address: "0xb73603C5d87fA094B7314C74ACE2e64D165016fb",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "opbnb") {
    return [
      {
        id: "bnb",
        name: "BNB",
        symbol: "BNB",
        icon: "https://s3.openocean.finance/token_logos/logos/1694161492824_8531437495817566.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x9e5aac1ba1a2e6aed6b32689dfcf62a509ca96f3",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "blast") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1709289940605_19878618173734108.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usdb",
        name: "USDB",
        symbol: "USDB",
        icon: 'https://s3.openocean.finance/token_logos/logos/1709276899737_4992459829681699.png',
        address: "0x4300000000000000000000000000000000000003",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "rootstock") {
    return [
      {
        id: "bitcoin",
        name: "BTC",
        symbol: "RBTC",
        icon: "https://s3.openocean.finance/token_logos/logos/1711531782383_7091791581593534.jpg",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: 'https://s3.openocean.finance/token_logos/logos/1711531922793_37810034259137226.png',
        address: "0xef213441A85dF4d7ACbDaE0Cf78004e1E486bB96",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "mode") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1708670839994_7482697009997648.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: 'https://s3.openocean.finance/token_logos/logos/1707039418330_9722435630262338.png',
        address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "pulse") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "0x4200000000000000000000000000000000000023",
        decimals: 18,
      },
      {
        id: "dai",
        name: "DAI",
        symbol: "DAI",
        icon: 'https://s3.openocean.finance/token_logos/logos/1708672005880_4151234554829104.png',
        address: "0xefd766ccb38eaf1dfd701853bfce31359239f305",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "merlin") {
    return [
      {
        id: "wrapped-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        icon: "https://s3.openocean.finance/token_logos/logos/1708924872926_358675392204334.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "iUSD",
        symbol: "iUSD",
        icon: 'https://s3.openocean.finance/token_logos/logos/1708925052075_45678944460487725.png',
        address: "0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d",
        decimals: 18,
      },
    ];
  }
};

export const getDefaultLimitToken = (selectedChain) => {
  if (selectedChain === "eth") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "rinkeby") {
    return [
      {
        id: "dai",
        name: "Dai Stablecoin",
        symbol: "DAI",
        icon: "https://s3.openocean.finance/images/1644648349663_6942988146287814.png",
        address: "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xa1cba00d6e99f52b8cb5f867a6f2db0f3ad62276",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "bsc") {
    return [
      {
        id: "wbnb",
        name: "Wrapped BNB",
        symbol: "WBNB",
        icon: "https://s3.openocean.finance/token_logos/logos/bsc/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
        address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        decimals: 18,
      },
      {
        id: "binance-usd",
        name: "Binance-Peg BUSD Token",
        symbol: "BUSD",
        icon: "https://s3.openocean.finance/token_logos/logos/bsc/0xe9e7cea3dedca5984780bafc599bd69add087d56.png",
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "solana") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/solana/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png",
        address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "starknet") {
    return [
      {
        id: "ethereum",
        name: "Ether",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1660273405742_6830679887854216.png",
        address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "near") {
    return [
      {
        id: "near",
        name: "NEAR Protocol",
        symbol: "NEAR",
        icon: "https://s3.openocean.finance/images/1676896600076_23550259326490952.png",
        address: "near.near",
        decimals: 24,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "flow") {
    return [
      {
        ids: "flow",
        name: "Flow Token",
        address: "0x1654653399040a61",
        decimals: 9,
        symbol: "FLOW",
        icon: "https://s3.openocean.finance/images/1660801147437_755668131106592.png",
      },
      {
        id: "tether",
        name: "Teleported USDT",
        symbol: "tUSDT",
        icon: "https://s3.openocean.finance/images/1660801147437_755668131106592.png",
        address: "0xcfdd90d4a00f7b5b",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "polygon") {
    return [
      {
        id: "wmatic",
        name: "Wrapped Matic",
        symbol: "WMATIC",
        icon: "https://s3.openocean.finance/images/1637561049975_1903381661429342.png",
        address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "polygon_zkevm") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "avax") {
    return [
      {
        id: "wrapped-avax",
        name: "Wrapped AVAX",
        symbol: "WAVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "fantom") {
    return [
      {
        id: "wrapped-fantom",
        name: "Wrapped FTM",
        symbol: "WFTM",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83.png",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "arbitrum") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1637744329482_9981818339876964.png",
        address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "xdai") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "boba") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x5de1677344d3cb0d7d465c10b72a8f60699c062d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "heco") {
    return [
      {
        id: "huobi-token",
        name: "Wrapped HT",
        symbol: "WHT",
        icon: "https://s3.openocean.finance/images/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f.png",
        address: "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "Heco-Peg USDCHECO Token",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/heco/0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b.png",
        address: "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "okex") {
    return [
      {
        id: "wrapped-okt",
        name: "Wrapped OKT",
        symbol: "WOKT",
        icon: "https://s3.openocean.finance/images/1650002079507_3878956211617479.png",
        address: "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x382bB369d343125BfB2117af9c149795C6C65C50",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "optimism") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1638172240797_3452267574610799.png",
        address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "moonriver") {
    return [
      {
        id: "moonriver",
        name: "Wrapped MOVR",
        symbol: "WMOVR",
        icon: "https://s3.openocean.finance/images/1646101442235_3185067024035393.png",
        address: "0x98878B06940aE243284CA214f92Bb71a2b032B8A",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aurora") {
    return [
      {
        id: "wrapped-near",
        name: "Near",
        symbol: "NEAR",
        icon: "https://s3.openocean.finance/images/1649218444944_9275656747870795.png",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
        decimals: 24,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Wrapped ONE",
        symbol: "WONE",
        icon: "https://s3.openocean.finance/images/1651225419902_17755165427141106.png",
        address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://s3.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "ontevm") {
    return [
      {
        id: "ong",
        name: "ONG",
        symbol: "ONG",
        icon: "https://s3.openocean.finance/token_logos/logos/1673323576017_07265635366807155.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "ontology",
        name: "Wrapped ONT",
        symbol: "WONT",
        icon: "https://s3.openocean.finance/token_logos/logos/1673244066088_2301398430060222.png",
        address: "0x219cc8e994ea6b35cdcffb5d44e229325d5ad02a",
        decimals: 9,
      },
    ];
  } else if (selectedChain === "metis") {
    return [
      {
        id: "metis",
        name: "METIS",
        symbol: "METIS",
        icon: "https://s3.openocean.finance/token_logos/logos/1675591118302_8481324929046925.jpeg",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "netswap",
        name: "Netswap",
        symbol: "NETT",
        icon: "https://s3.openocean.finance/token_logos/logos/1675569789605_34016460565796436.png",
        address: "0x90fe084f877c65e1b577c7b2ea64b8d8dd1ab278",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "kava") {
    return [
      {
        id: "kava",
        name: "KAVA",
        symbol: "KAVA",
        icon: "https://s3.openocean.finance/token_logos/logos/1675825380979_8618996345284009.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "celo") {
    return [
      {
        id: "celo",
        name: "CELO",
        symbol: "CELO",
        icon: "https://s3.openocean.finance/token_logos/logos/1675828631474_42987407614787054.png",
        address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "klaytn") {
    return [
      {
        id: "klay-token",
        name: "Klaytn",
        symbol: "KLAY",
        icon: "https://s3.openocean.finance/token_logos/logos/1675830073128_2220769732555996.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "orbit-bridge-klaytn-usd-tether",
        name: "Orbit Bridge Klaytn USD Tether",
        symbol: "OUSDT",
        icon: "https://s3.openocean.finance/token_logos/logos/1675830681006_413512059781173.png",
        address: "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "zksync") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
        decimals: 6,
      },
    ]
  } else if (selectedChain === "linea") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "binance-usd",
        name: "Binance-Peg BUSD Token",
        symbol: "BUSD",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x7d43AABC515C356145049227CeE54B608342c0ad",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "telos") {
    return [
      {
        id: "TLOS",
        name: "TLOS",
        symbol: "TLOS",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x975ed13fa16857e83e7c493c7741d556eaad4a3f",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "scroll") {
    return [
      {
        id: "ETH",
        name: "ETH",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "base") {
    return [
      {
        id: "ETH",
        name: "ETH",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1660273405742_6830679887854216.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "AXLUSDC",
        icon: "https://s3.openocean.finance/token_logos/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "cronos") {
    return [
      {
        id: "wrapped-cro",
        name: "Wrapped CRO",
        symbol: "WCRO",
        icon: "https://s3.openocean.finance/images/1650429225827_11018203077117028.jpg",
        address: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x66e428c3f67a68878562e79a0234c1f83c208770",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aptos") {
    return [
      {
        id: "aptos",
        name: "Aptos",
        symbol: "APT",
        icon: "https://s3.openocean.finance/token_logos/logos/1667977749311_9115826508595049.png",
        address: "0x1",
        decimals: 8,
      },
      {
        id: "tether",
        name: "Tether USD (Wormhole)",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "mantle") {
    return [
      {
        id: "mnt",
        name: "MNT",
        symbol: "MNT",
        icon: "https://s3.openocean.finance/token_logos/logos/1694160452311_9508036999593048.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD (Wormhole)",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "x1") {
    return [
      {
        id: "okb",
        name: "OKB",
        symbol: "OKB",
        icon: "https://s3.openocean.finance/token_logos/logos/1694160452311_9508036999593048.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x4d4907f1b2093f53D9f97064Dc0dD19687caFa9C",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "manta") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1704871520659_24217901857510093.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC Coin",
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/1696854390695_9268415263413137.png",
        address: "0xb73603C5d87fA094B7314C74ACE2e64D165016fb",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "opbnb") {
    return [
      {
        id: "bnb",
        name: "BNB",
        symbol: "BNB",
        icon: "https://s3.openocean.finance/token_logos/logos/1694161492824_8531437495817566.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0x9e5aac1ba1a2e6aed6b32689dfcf62a509ca96f3",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "blast") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1709289940605_19878618173734108.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usdb",
        name: "USDB",
        symbol: "USDB",
        icon: 'https://s3.openocean.finance/token_logos/logos/1709276899737_4992459829681699.png',
        address: "0x4300000000000000000000000000000000000003",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "rootstock") {
    return [
      {
        id: "bitcoin",
        name: "Wrapped BTC",
        symbol: "WRBTC",
        icon: "https://s3.openocean.finance/token_logos/logos/1711531822693_16371338394893664.jpg",
        address: "0x542fDA317318eBF1d3DEAf76E0b632741A7e677d",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: 'https://s3.openocean.finance/token_logos/logos/1711531922793_37810034259137226.png',
        address: "0xef213441A85dF4d7ACbDaE0Cf78004e1E486bB96",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "mode") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: 'https://s3.openocean.finance/token_logos/logos/1707039418330_9722435630262338.png',
        address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "pulse") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "0x4200000000000000000000000000000000000023",
        decimals: 18,
      },
      {
        id: "dai",
        name: "DAI",
        symbol: "DAI",
        icon: 'https://s3.openocean.finance/token_logos/logos/1708672005880_4151234554829104.png',
        address: "0xefd766ccb38eaf1dfd701853bfce31359239f305",
        decimals: 18,
      },
    ];
  }else if (selectedChain === "merlin") {
    return [
      {
        id: "wrapped-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        icon: "https://s3.openocean.finance/token_logos/logos/1708924872926_358675392204334.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "iUSD",
        symbol: "iUSD",
        icon: 'https://s3.openocean.finance/token_logos/logos/1708925052075_45678944460487725.png',
        address: "0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d",
        decimals: 18,
      },
    ];
  }
};

export const isStableToken = (symbol) => {
  return symbol === 'USDT' || symbol === 'USDT.e' || symbol === '1USDC' || symbol === 'USDC' || symbol === 'USDC.e' || symbol === '1USDT' || symbol === 'DAI' || symbol === 'DAI.e' || symbol === '1DAI.e' || symbol === 'BUSD' || symbol === 'TUSD' || symbol === 'USDP' || symbol === 'FRAX' || symbol === 'fUSD' || symbol === 'MIM'
}

export const isStableTokenPro = (chain, symbol) => {
  // const token = getNativeToken(chain);
  let symbols = ["USDT", "USDC", "DAI", "BUSD", "fUSD"];
  if (chain === "avax") {
    symbols = ["USDT.e", "USDC.e", "DAI.e"];
  } else if (chain === "harmony") {
    symbols = ["1USDT", "1USDC"];
  }
  return symbols.indexOf(symbol) >= 0;
}

export const isNativeToken = (selectedChain, address) => {
  if (
    selectedChain === "eth" ||
    selectedChain === "ropsten" ||
    selectedChain === "rinkeby"
  ) {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "bsc" || selectedChain === "bsctest") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "okex") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "polygon") {
    return address === "0x0000000000000000000000000000000000001010";
  } else if (selectedChain === "polygon_zkevm") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "fantom") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "heco") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "avax") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "arbitrum") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "xdai") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "optimism") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "boba") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "terra") {
    // return address === "uusd" || address === "uusd";
    return true;
  } else if (selectedChain === "moonriver") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "aurora") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "cronos") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "cosmos") {
    return true;
  } else if (selectedChain === "harmony") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "ontevm") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "metis") {
    return false;
    // return address === "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000";
  } else if (selectedChain === "kava") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "klaytn") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "zksync") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "linea") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "telos") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "scroll") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "base") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "tron") {
    return address === "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
  } else if (selectedChain === "solana") {
    return address === "So11111111111111111111111111111111111111112";
  } else if (selectedChain === "starknet") {
    return address === "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
  } else if (selectedChain === "opbnb") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "mantle") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "x1") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "manta") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "blast") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "mode") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "pulse") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "merlin") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "rootstock") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  }
};

export const isV2 = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "rinkeby",
      "bsc",
      "bsctest",
      "avax",
      "fantom",
      "polygon",
      "polygon_zkevm",
      "xdai",
      "optimism",
      "arbitrum",
      "boba",
      "heco",
      "okex",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
      "ontevm",
      "metis",
      "kava",
      "celo",
      "klaytn",
      "zksync",
      "linea",
      "telos",
      "scroll",
      "base",
      "opbnb",
      "mantle",
      "manta",
      "x1",
      "blast",
      "mode",
      "pulse",
      "merlin",
      "rootstock",
    ].indexOf(selectedChain) >= 0
  );
};

export const isSideChain = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "rinkeby",
      "bsc",
      "bsctest",
      "polygon",
      "polygon_zkevm",
      "xdai",
      "heco",
      "avax",
      "okex",
      "fantom",
      "optimism",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
      "ontevm",
      "metis",
      "kava",
      "celo",
      "klaytn",
      "zksync",
      "linea",
      "telos",
      "scroll",
      "base",
      "opbnb",
      "mantle",
      "manta",
      "x1",
      "blast",
      "mode",
      "pulse",
      "merlin",
      "rootstock",
    ].indexOf(selectedChain) >= 0
  );
};

export const isCustomGas = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "rinkeby",
      "bsc",
      "bsctest",
      "polygon",
      "polygon_zkevm",
      "xdai",
      "heco",
      "avax",
      "okex",
      "fantom",
      "optimism",
      "xdai",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
      "ontevm",
      "metis",
      "kava",
      "celo",
      "klaytn",
      "zksync",
      "linea",
      "telos",
      "scroll",
      "base",
      "opbnb",
      "mantle",
      "manta",
      "x1",
      "blast",
      "mode",
      "pulse",
      "merlin",
      "rootstock",
    ].indexOf(selectedChain) >= 0
  );
};

export const isCustomToken = (selectedChain) => {
  return (
    [
      // "solana",
      // "tron",
      "eth",
      "ropsten",
      "rinkeby",
      "bsc",
      "bsctest",
      "avax",
      "fantom",
      "polygon",
      "polygon_zkevm",
      "okex",
      "heco",
      "xdai",
      "optimism",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
      // "ontevm",
      "metis",
      "kava",
      "celo",
      "klaytn",
      "zksync",
      "linea",
      "telos",
      "scroll",
      "base",
      "opbnb",
      "mantle",
      "manta",
      "x1",
      "blast",
      "mode",
      "pulse",
      "merlin",
      "rootstock",
    ].indexOf(selectedChain) >= 0
  );
};

export const isLimitOrder = (selectedChain) => {
  return (
    [
      "bsc",
      "eth",
      "polygon",
      "avax",
      "fantom",
      "arbitrum",
      "optimism",
      "moonriver",
      "harmony",
      "heco",
      "okex",
      "xdai",
      "cronos",
      "zksync"
    ].indexOf(selectedChain) >= 0
  );
};

export const getReferrerWallet = (walletName) => {
  if (walletName === "BitKeep Wallet" || (isApp() && window.isBitKeep)) {
    return "BitKeep";
  }
  if (walletName === "ZerionWallet") {
    return "ZerionWallet";
  }
  return walletName;
};

export const getReferrer = (walletName) => {
  let referrer = "";
  let wallet = getReferrerWallet(walletName);
  console.log("getReferrer", wallet);
  if (wallet === "BitKeep") {
    referrer = "0xd5cd85f6aa974af2ad7dec5689e9026da6ee661a";
  } if (wallet === "ZerionWallet") {
    referrer = "0x8dc57d083dbabdac4721681f175809e2d954eb37";
  } else if (window.location.host === "gnosis.openocean.finance") {
    // Gnosis
    referrer = "0x5b9fbe4f75bf7ac8a7f032e26f18123c9abfdaeb";
  } else if (isApp() || isMobile()) {
    // Mobile
    referrer = "0x40603469c577b1db3d401155901a276f604436f4";
  } else {
    // PC
    referrer = "0x3487ef9f9b36547e43268b8f0e2349a226c70b53";
  }
  return referrer;
};

export const chainLabel = {
  bsc: "BNB Chain",
  eth: "Ethereum",
  fantom: "Fantom",
  avax: "Avalanche",
  polygon: "Polygon",
};

export const addEthereumChainParams = {
  eth: [
    {
      chainId: `0x1`, // 3
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ether",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://eth.llamarpc.com"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
  ],
  ropsten: [
    {
      chainId: `0x3`, // 3
      chainName: "Ropsten Test Network",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      ],
      blockExplorerUrls: ["https://ropsten.etherscan.io"],
    },
  ],
  rinkeby: [
    {
      chainId: `0x4`, // 3
      chainName: "Rinkeby Test Network",
      nativeCurrency: {
        name: "Ether",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: [
        "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      ],
      blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    },
  ],
  rinkeby: [
    {
      chainId: `0x4`, // 4
      chainName: "Rinkeby Test Network",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ],
  bsc: [
    {
      chainId: `0x38`, // 56
      chainName: "BNB Smart Chain Mainnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ],
  // bsctest: [
  //   {
  //     chainId: `0x61`, // 97
  //     chainName: "BSC Test Network",
  //     nativeCurrency: {
  //       name: "BNB",
  //       symbol: "bnb",
  //       decimals: 18,
  //     },
  //     rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  //     blockExplorerUrls: ["https://testnet.bscscan.com/"],
  //   },
  // ],
  ok: [
    {
      chainId: `0x42`, // 66
      chainName: "OKC Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "OKT",
        decimals: 18,
      },
      rpcUrls: ["https://exchainrpc.okex.org"],
      blockExplorerUrls: ["https://www.oklink.com/en/okc/"],
    },
  ],
  polygon: [
    {
      chainId: `0x89`, // 137
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  ],
  polygon_zkevm: [
    {
      chainId: `0x44d`, // 1101
      chainName: "Polygon zkEVM",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon_zkevm"],
      blockExplorerUrls: ["https://zkevm.polygonscan.com"],
    },
  ],
  xdai: [
    {
      chainId: `0x64`, // 100
      chainName: "Gnosis Mainnet",
      nativeCurrency: {
        name: "xDai",
        symbol: "XDAI",
        decimals: 18,
      },
      rpcUrls: ["https://gnosischain-rpc.gateway.pokt.network"],
      blockExplorerUrls: ["https://blockscout.com/xdai/mainnet"],
    },
  ],
  fantom: [
    {
      chainId: `0xfa`, // 250
      chainName: "Fantom Mainnet",
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      rpcUrls: ["https://rpcapi.fantom.network"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
  ],
  heco: [
    {
      chainId: `0x80`, // 128
      chainName: "Heco Mainnet",
      nativeCurrency: {
        name: "HT",
        symbol: "HT",
        decimals: 18,
      },
      rpcUrls: ["https://http-mainnet.hecochain.com"],
      blockExplorerUrls: ["https://hecoinfo.com"],
    },
  ],
  moonriver: [
    {
      chainId: `0x505`, // 1285
      chainName: "Moonriver Mainnet",
      nativeCurrency: {
        name: "MOVR",
        symbol: "MOVR",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.api.moonriver.moonbeam.network"],
      blockExplorerUrls: ["https://moonriver.moonscan.io"],
    },
  ],
  aurora: [
    {
      chainId: `0x4e454152`, // 1313161554
      chainName: "Aurora Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.aurora.dev"],
      blockExplorerUrls: ["https://aurorascan.dev"],
    },
  ],
  avax: [
    {
      chainId: `0xa86a`, // 43114
      chainName: "Avalanche Mainnet C-Chain",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
    },
  ],
  okex: [
    {
      chainId: `0x42`, // 66
      chainName: "OKC Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "OKT",
        decimals: 18,
      },
      rpcUrls: ["https://exchainrpc.okex.org"],
      blockExplorerUrls: ["https://www.oklink.com/en/okc"],
    },
  ],
  cronos: [
    {
      chainId: `0x19`, // 25
      chainName: "Cronos Mainnet",
      nativeCurrency: {
        name: "CRO",
        symbol: "CRO",
        decimals: 18,
      },
      rpcUrls: ["https://evm.cronos.org"],
      blockExplorerUrls: ["https://cronos.org/explorer"],
    },
  ],
  harmony: [
    {
      chainId: `0x63564c40`, // 1666600000
      chainName: "Harmony Mainnet",
      nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18,
      },
      rpcUrls: ["https://api.harmony.one"],
      blockExplorerUrls: ["https://explorer.harmony.one/"],
    },
  ],
  ontevm: [
    {
      chainId: `0x3a`, // 58
      chainName: "Ontology EVM",
      nativeCurrency: {
        name: "ONG",
        symbol: "ONG",
        decimals: 18,
      },
      rpcUrls: ["https://dappnode1.ont.io:10339"],
      blockExplorerUrls: ["https://explorer.ont.io"],
    },
  ],
  metis: [
    {
      chainId: `0x440`, // 1088
      chainName: "Andromeda (Metis)",
      nativeCurrency: {
        name: "METIS",
        symbol: "METIS",
        decimals: 18,
      },
      rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
      blockExplorerUrls: ["https://andromeda-explorer.metis.io"],
    },
  ],
  kava: [
    {
      chainId: `0x8ae`, // 2222
      chainName: "Kava EVM",
      nativeCurrency: {
        name: "KAVA",
        symbol: "KAVA",
        decimals: 18,
      },
      rpcUrls: ["https://evm.kava.io"],
      blockExplorerUrls: ["https://explorer.kava.io"],
    },
  ],
  celo: [
    {
      chainId: `0xa4ec`, // 42220
      chainName: "Celo Network",
      nativeCurrency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
      },
      rpcUrls: ["https://forno.celo.org"],
      blockExplorerUrls: ["https://explorer.celo.org"],
    },
  ],
  klaytn: [
    {
      chainId: `0x2019`, // 8217
      chainName: "Cypress Network",
      nativeCurrency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
      },
      rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
      blockExplorerUrls: ["https://scope.klaytn.com"],
    },
  ],
  zksync: [
    {
      chainId: `0x144`, // 324
      chainName: "zkSync Era Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.era.zksync.io"],
      blockExplorerUrls: ["https://explorer.zksync.io"],
    },
  ],
  // linea: [
  //   {
  //     chainId: `0xe704`, // 59140
  //     chainName: "Linea Testnet",
  //     nativeCurrency: {
  //       name: "Ethereum",
  //       symbol: "ETH",
  //       decimals: 18,
  //     },
  //     rpcUrls: ["https://rpc.goerli.linea.build"],
  //     blockExplorerUrls: ["https://explorer.goerli.linea.build"],
  //   },
  // ],
  linea: [
    {
      chainId: `0xe708`, // 59144
      chainName: "Linea",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://linea-mainnet.infura.io/v3/2c7c4d86c2c746c89de722551b606119"],
      blockExplorerUrls: ["https://lineascan.build"],
    },
  ],
  telos: [
    {
      chainId: `0x28`, // 40
      chainName: "Telos",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "TLOS",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.telos.net/evm"],
      blockExplorerUrls: ["https://teloscan.io"],
    },
  ],
  scroll: [
    {
      chainId: `0x82750`,
      chainName: "Scroll",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.scroll.io"],
      blockExplorerUrls: ["https://blockscout.scroll.io"],
    },
  ],
  base: [
    {
      chainId: `0x2105`,
      chainName: "Base",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://developer-access-mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"],
    },
  ],
  arbitrum: [
    {
      chainId: `0xa4b1`, // 42161
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://arbiscan.io"],
    },
  ],
  optimism: [
    {
      chainId: `0xa`, // 10
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
  ],
  boba: [
    {
      chainId: `0x120`, // 288
      chainName: "Boba Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.boba.network"],
      blockExplorerUrls: ["https://blockexplorer.boba.network"],
    },
  ],
  opbnb: [
    {
      chainId: `0xcc`, // 204
      chainName: "opBNB",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
      blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
    },
  ],
  mantle: [
    {
      chainId: `0x1388`, // 5000
      chainName: "Mantle",
      nativeCurrency: {
        name: "MNT",
        symbol: "MNT",
        decimals: 18,
      },
      rpcUrls: ["https://mantle.publicnode.com"],
      blockExplorerUrls: ["https://explorer.mantle.xyz"],
    },
  ],
  manta: [
    {
      chainId: `0xa9`, // 169
      chainName: "Manta",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://pacific-rpc.manta.network/http"],
      blockExplorerUrls: ["https://pacific-explorer.manta.network"],
    },
  ],
  x1: [
    {
      chainId: `0xc3`, // 195
      chainName: "X1",
      nativeCurrency: {
        name: "OKB",
        symbol: "OKB",
        decimals: 18,
      },
      rpcUrls: ["https://testrpc.x1.tech"],
      blockExplorerUrls: ["https://www.oklink.com/x1-test"],
    },
  ],
  blast: [
    {
      chainId: `0x13e31`, // 81457
      chainName: "Blast",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://blast.blockpi.network/v1/rpc/public"],
      blockExplorerUrls: ["https://blastscan.io"],
    },
  ],
  mode: [
    {
      chainId: `0x868b`, // 34443
      chainName: "mode",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://1rpc.io/mode"],
      blockExplorerUrls: ["https://explorer.mode.network"],
    },
  ],
  pulse: [
    {
      chainId: `0x171`, // 369
      chainName: "PulseChain",
      nativeCurrency: {
        name: "PLS",
        symbol: "PLS",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.pulsechain.com"],
      blockExplorerUrls: ["https://scan.pulsechain.com"],
    },
  ],
  merlin: [
    {
      chainId: `0x1068`, // 4200
      chainName: "Merlin Chain",
      nativeCurrency: {
        name: "BTC",
        symbol: "BTC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.merlinchain.io"],
      blockExplorerUrls: ["https://scan.merlinchain.io"],
    },
  ],
  rootstock: [
    {
      chainId: `0x1e`, // 30
      chainName: "Rootstock",
      nativeCurrency: {
        name: "RBTC",
        symbol: "RBTC",
        decimals: 18,
      },
      rpcUrls: ["https://public-node.rsk.co"],
      blockExplorerUrls: ["https://explorer.rsk.co"],
    },
  ],
};

export const getWalletInstallUrl = (code) => {
  return {
    40001:
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", //Metamask
    40002:
      "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp", //Binance
    40003:
      "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec", //TronLink
    40005:
      "https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno", //Sollet
    40011:
      "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg", //Coin98
    40012:
      "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc", //Math
    40013:
      "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa", //Phantom
    40014:
      "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge", //OKExWallet
    40015:
      "https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp", //TerraStation
    40016:
      "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad", //Coinbase
    40017:
      "https://chrome.google.com/webstore/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk", //Clover
    40018:
      "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf", //XDeFi
    40019:
      "https://chrome.google.com/webstore/detail/slope-wallet/pocmplpaccanhmnllbbkpgfliimjljgo", //Slope
    40020:
      "https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic", //Solflare
    40021:
      "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge", //MetaX
    40022:
      "https://chrome.google.com/webstore/detail/onto-wallet/ifckdpamphokdglkkdomedpdegcjhjdp", //Onto
    40024:
      "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap", //Keplr
    40025: "https://brave.com/wallet/", //Brave
    40026: "https://crypto.com/defi-wallet", //NoCryptoCom
    40027:
      "https://chrome.google.com/webstore/detail/bitkeep-bitcoin-crypto-wa/jiidiaalihmmhddjgbnbgdfflelocpak", // BitKeep
    40028:
      "https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa", // SafePal
    40029:
      "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph", // TrustWallet
    40030:
      "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii", // TokenPocket
    40031: "https://token.im/download", // ImToken
    40032: "https://portto.com/download", // Blocto
    40034:
      "https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci", // Petra
    40035:
      "https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk", // Martian
    40036:
      "https://chrome.google.com/webstore/detail/pontem-aptos-wallet/phkbamefinggmakgklpkljjmgibohnba", // Pontem
    40037:
      "https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm", // Cyano
    40038:
      "https://chrome.google.com/webstore/detail/meteor-wallet/pcndjhkinnkaohffealmlmhaepkpmgkb?hl=en-US", // Meteor
    40039:
      "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg?hl=en-US", // Sender
    40040:
      "https://www.ledger.com/", // ledger
    40041:
      "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch", // Rabby wallet
    40042:
      "https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb", // Agrent X
    40043:
      "https://chrome.google.com/webstore/detail/braavos-smart-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma", // Braavos
    40044:
      "https://risewallet.io", // Risewallet
    40045:
      "https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj", // Fewcha
    40046:
      "https://chromewebstore.google.com/detail/blockwallet/bopcbmipnjdcdfflfgjdgdjejmgpoaab", // Block Wallet
    40047:
      "https://chromewebstore.google.com/detail/zerion-wallet-for-web3-nf/klghhnkeealcohjjanjjdaeeggmfmlpl?hl=zh-CN&utm_source=ext_sidebar", // Block Wallet
  }[code];
};

export const getPayTokenList = (chain) => {
  return {
    rinkeby: [
      {
        code: "ethereum",
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0xeb8f08a975Ab53E34D8a0330E0D34de942C95926",
        decimals: 6,
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D",
        decimals: 18,
        symbol: "DAI",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    eth: [
      {
        code: "ethereum",
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.01,
      },
      {
        code: "ethereum",
        name: "Wrapped Ether",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6,
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "tether",
        name: "Tether USD",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        decimals: 18,
        symbol: "DAI",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    solana: [
      {
        code: "solana",
        name: "Solana",
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        symbol: "SOL",
        icon: "https://s3.openocean.finance/token_logos/logos/solana/So11111111111111111111111111111111111111112.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
    ],
    starknet: [
      {
        code: "ethereum",
        name: "Ether",
        address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1660273405742_6830679887854216.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
    ],
    polygon: [
      {
        code: "matic-network",
        name: "Matic Token",
        address: "0x0000000000000000000000000000000000001010",
        decimals: 18,
        symbol: "MATIC",
        icon: "https://s3.openocean.finance/images/1637561049975_1903381661429342.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        code: "matic-network",
        name: "Wrapped Matic",
        address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        decimals: 18,
        symbol: "WMATIC",
        icon: "https://s3.openocean.finance/images/1637561027304_35141640745067626.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "ethereum",
        name: "Wrapped Ether",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        decimals: 18,
        symbol: "WETH",
        customSymbol: "ETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        customIcon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        decimals: 6,
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "tether",
        name: "Tether USD",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        decimals: 18,
        symbol: "DAI",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    avax: [
      {
        code: "wrapped-avax",
        name: "Avalanche Token",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "AVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0x0000000000000000000000000000000000000000.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        code: "wrapped-avax",
        name: "Wrapped AVAX",
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        decimals: 18,
        symbol: "WAVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "ethereum",
        name: "Wrapped Ether",
        address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
        decimals: 18,
        symbol: "WETH.e",
        icon: "https://s3.openocean.finance/images/1647948298161_3241856783974908.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
        decimals: 6,
        symbol: "USDC.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "tether",
        name: "Tether USD",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
        symbol: "USDT.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
        decimals: 18,
        symbol: "DAI.e",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    arbitrum: [
      {
        code: "ethereum",
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.0001,
      },
      {
        code: "ethereum",
        name: "Wrapped Ether",
        address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        decimals: 6,
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "tether",
        name: "Tether USD",
        address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
        decimals: 6,
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
        decimals: 18,
        symbol: "DAI",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    optimism: [
      {
        code: "ethereum",
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        code: "ethereum",
        name: "Wrapped Ether",
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "usd-coin",
        name: "USD Coin",
        address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
        decimals: 6,
        symbol: "USDC",
        icon: "https://s3.openocean.finance/token_logos/logos/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "tether",
        name: "Tether USD",
        address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
        decimals: 6,
        symbol: "USDT",
        icon: "https://s3.openocean.finance/token_logos/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        code: "dai",
        name: "Dai Stablecoin",
        address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
        decimals: 18,
        symbol: "DAI",
        icon: "https://s3.openocean.finance/token_logos/logos/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        balance: 0,
        ethValue: 0,
      },
    ],
  }[chain];
};

export const getSellTokenList = (chain) => {
  return {
    rinkeby: [
      {
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
      }
    ],
    eth: [
      {
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
      }
    ],
    solana: [
      {
        name: "Solana",
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        symbol: "SOL",
        icon: "https://s3.openocean.finance/token_logos/logos/solana/So11111111111111111111111111111111111111112.png",
      }
    ],
    starknet: [
      {
        name: "Ether",
        address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/token_logos/logos/1660273405742_6830679887854216.png",
      },
    ],
    polygon: [
      {
        name: "Matic Token",
        address: "0x0000000000000000000000000000000000001010",
        decimals: 18,
        symbol: "MATIC",
        icon: "https://s3.openocean.finance/images/1637561049975_1903381661429342.png",
        balance: 0,
        ethValue: 0,
        gasValue: 2
      },
      {
        name: "Wrapped Ether",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      }
    ],
    avax: [
      {
        name: "Avalanche Token",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "AVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0x0000000000000000000000000000000000000000.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        name: "Wrapped AVAX",
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        decimals: 18,
        symbol: "WAVAX",
        icon: "https://s3.openocean.finance/token_logos/logos/avax/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
        balance: 0,
        ethValue: 0,
      },
      {
        name: "Wrapped Ether",
        address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
        decimals: 18,
        symbol: "WETH.e",
        icon: "https://s3.openocean.finance/images/1647948298161_3241856783974908.png",
        balance: 0,
        ethValue: 0,
      },
    ],
    arbitrum: [
      {
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        name: "Wrapped Ether",
        address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      }
    ],
    optimism: [
      {
        name: "Ethereum",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
        symbol: "ETH",
        icon: "https://s3.openocean.finance/images/1637894743832_8242841824007741.png",
        balance: 0,
        ethValue: 0,
        gasValue: 0.1,
      },
      {
        name: "Wrapped Ether",
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
        symbol: "WETH",
        icon: "https://s3.openocean.finance/images/1663566104020_8869918182521481.svg",
        balance: 0,
        ethValue: 0,
      }
    ],
  }[chain];
};

export const getChainScanner = {
  eth: [
    {
      chainId: `0x1`, // 3
      Explorer: "Etherscan",
      blockExplorerUrls: ["https://etherscan.io/address/"],
    },
  ],
  ropsten: [
    {
      chainId: `0x3`, // 3
      Explorer: "Ropsten Test Network",

      blockExplorerUrls: ["https://ropsten.etherscan.io/address/"],
    },
  ],
  rinkeby: [
    {
      chainId: `0x4`, // 3
      Explorer: "Rinkeby Test Network",
      blockExplorerUrls: ["https://rinkeby.etherscan.io/address/"],
    },
  ],
  bsc: [
    {
      chainId: `0x38`, // 56
      Explorer: "Bscscan",
      blockExplorerUrls: ["https://bscscan.com/address/"],
    },
  ],
  // ok: [
  //   {
  //     chainId: `0x42`, // 66
  //     Explorer: "Oklink",
  //     blockExplorerUrls: ["https://www.oklink.com/en/okc/token/"],
  //   },
  // ],
  polygon: [
    {
      chainId: `0x89`, // 137
      Explorer: "Polygonscan",
      blockExplorerUrls: ["https://polygonscan.com/address/"],
    },
  ],
  polygon_zkevm: [
    {
      chainId: `0x44d`, // 1101
      Explorer: "Polygon zkEVM",
      blockExplorerUrls: ["https://zkevm.polygonscan.com/address/"],
    },
  ],
  xdai: [
    {
      chainId: `0x64`, // 100
      Explorer: "Blockscout",
      blockExplorerUrls: ["https://blockscout.com/xdai/mainnet/address/"],
    },
  ],
  tron: [
    {
      Explorer: "TronScan",
      blockExplorerUrls: ["https://tronscan.io/#/token20/"],
    },
  ],
  ont: [
    {
      Explorer: "Ontology Explorer",
      blockExplorerUrls: ["https://explorer.ont.io/address/"],
    },
  ],
  fantom: [
    {
      chainId: `0xfa`, // 250
      Explorer: "Ftmscan",
      blockExplorerUrls: ["https://ftmscan.com/address/"],
    },
  ],
  heco: [
    {
      chainId: `0x80`, // 128
      Explorer: "Hecoinfo",
      blockExplorerUrls: ["https://hecoinfo.com/address/"],
    },
  ],
  moonriver: [
    {
      chainId: `0x505`, // 1285
      Explorer: "Moonscan",
      blockExplorerUrls: ["https://moonriver.moonscan.io/address/"],
    },
  ],
  aurora: [
    {
      chainId: `0x4e454152`, // 1313161554
      Explorer: "Aurorascan",
      blockExplorerUrls: ["https://aurorascan.dev/address/"],
    },
  ],
  avax: [
    {
      chainId: `0xa86a`, // 43114
      Explorer: "C-ChainAVAX",
      blockExplorerUrls: ["https://cchain.explorer.avax.network/address/"],
    },
  ],
  okex: [
    {
      chainId: `0x42`, // 66
      Explorer: "Oklink",
      blockExplorerUrls: ["https://www.oklink.com/en/okc/address/"],
    },
  ],
  cronos: [
    {
      chainId: `0x19`, // 25
      Explorer: "Cronos",
      blockExplorerUrls: ["https://cronos.org/explorer/address/"],
    },
  ],
  harmony: [
    {
      chainId: `0x63564c40`, // 1666600000
      Explorer: "Harmony",
      blockExplorerUrls: ["https://explorer.harmony.one/address/"],
    },
  ],
  ontevm: [
    {
      chainId: `0x3a`, // 58
      Explorer: "ontevm",
      blockExplorerUrls: ["https://explorer.ont.io/address/"],
    },
  ],
  metis: [
    {
      chainId: `0x440`, // 1088
      Explorer: "metis",
      blockExplorerUrls: ["https://andromeda-explorer.metis.io/address/"],
    }
  ],
  arbitrum: [
    {
      chainId: `0xa4b1`, // 42161
      Explorer: "Arbiscan",
      blockExplorerUrls: ["https://arbiscan.io/address/"],
    },
  ],
  optimism: [
    {
      chainId: `0xa`, // 10
      Explorer: "Optimism",
      blockExplorerUrls: ["https://optimistic.etherscan.io/address/"],
    },
  ],
  boba: [
    {
      chainId: `0x120`, // 288
      Explorer: "Boba",
      blockExplorerUrls: ["https://blockexplorer.boba.network/address/"],
    },
  ],
  kava: [
    {
      chainId: `0x8ae`, // 2222
      Explorer: "Kava Explorer",
      blockExplorerUrls: ["https://explorer.kava.io/address/"],
    },
  ],
  celo: [
    {
      chainId: `0xa4ec`, // 42220
      Explorer: "Celo Explorer",
      blockExplorerUrls: ["https://explorer.celo.org/mainnet/address/"],
    },
  ],
  klaytn: [
    {
      chainId: `0x2019`, // 8217
      Explorer: "Klaytn Explorer",
      blockExplorerUrls: ["https://scope.klaytn.com/address/"],
    },
  ],
  zksync: [
    {
      chainId: `0x144`, // 324
      Explorer: "zkSync Explorer",
      blockExplorerUrls: ["https://explorer.zksync.io/address/"],
    },
  ],
  linea: [
    {
      chainId: `0xe708`, // 59144
      Explorer: "Linea Explorer",
      blockExplorerUrls: ["https://lineascan.build/address/"],
    },
  ],
  telos: [
    {
      chainId: `0x28`, // 40
      Explorer: "Telos Explorer",
      blockExplorerUrls: ["https://teloscan.io/address/"],
    },
  ],
  scroll: [
    {
      chainId: `0x82750`,
      Explorer: "Scroll Explorer",
      blockExplorerUrls: ["https://blockscout.scroll.io/address/"],
    },
  ],
  base: [
    {
      chainId: `0x2105`,
      Explorer: "Base Explorer",
      blockExplorerUrls: ["https://basescan.org/address/"],
    },
  ],
  aptos: [
    {
      Explorer: "Aptos Explorer",
      blockExplorerUrls: ["https://explorer.aptoslabs.com/account/"],
    },
  ],
  solana: [
    {
      Explorer: "SOLSCAN",
      blockExplorerUrls: ["https://solscan.io/token/"],
    },
  ],
  starknet: [
    {
      Explorer: "StarkScan",
      blockExplorerUrls: ["https://starkscan.co/contract/"],
    },
  ],
  opbnb: [
    {
      chainId: `0xcc`, // 204
      Explorer: "opBNB Explorer",
      blockExplorerUrls: ["https://mainnet.opbnbscan.com/address/"],
    },
  ],
  mantle: [
    {
      chainId: `0x1388`, // 5000
      Explorer: "Mantle Explorer",
      blockExplorerUrls: ["https://explorer.mantle.xyz/address/"],
    },
  ],
  manta: [
    {
      chainId: `0xa9`, // 169
      Explorer: "Manta Pacific Explorer",
      blockExplorerUrls: ["https://pacific-explorer.manta.network/address/"],
    },
  ],
  x1: [
    {
      chainId: `0xc3`, // 195
      Explorer: "X1 Testnet",
      blockExplorerUrls: ["https://www.oklink.com/x1-test/address/"],
    },
  ],
  blast: [
    {
      chainId: `0x13e31`, // 81457
      Explorer: "Blast Explorer",
      blockExplorerUrls: ["https://blastscan.io/address/"],
    },
  ],
  mode: [
    {
      chainId: `0x868b`, // 34443
      Explorer: "Mode Explorer",
      blockExplorerUrls: ["https://explorer.mode.network/address/"],
    },
  ],
  pulse: [
    {
      chainId: `0x171`, // 369
      Explorer: "PulseChain Explorer",
      blockExplorerUrls: ["https://scan.pulsechain.com/address/"],
    },
  ],
  merlin: [
    {
      chainId: `0x1068`, // 4200
      Explorer: "Merlin Chain Explorer",
      blockExplorerUrls: ["https://scan.merlinchain.io/address/"],
    },
  ],
};

export const getChainByKey = (key) => {
  const chains = getChains()
  for (let i = 0; i < chains.length; i++) {
    if (chains[i].walletValue == key) {
      return chains[i]
    }
  }
}

export default getChains;


export const getBalancesAddress = (key) => {

  let json = {
    "boba": "0xed8F54daA8Da64Ce82F23263B208417cB2729433",
    "moonriver": "0xf61bc90581c7da1cb1e510b29ec4f96cf5b699f8",
    "optimism": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "aurora": "0xBF69a56D35B8d6f5A8e0e96B245a72F735751e54",
    "harmony": "0x34b415f4d3b332515e66f70595ace1dcf36254c5",
    "cronos": "0x8924755a7FB45bF0A37A6A773795CFa878114A26",
    "moonriver": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "ontevm": "0x9f92b2706c643ae6fdf2e9ca472f0e48497385f1",
    "metis": "0x999c891262ce01f1C1AFD1D46260E4c1E508B243",
    "kava": "0x7ED7bBd8C454a1B0D9EdD939c45a81A03c20131C",
    "celo": "0x75F59534dd892c1f8a7B172D639FA854D529ada3",
    "klaytn": "0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8",
    "zksync": "0x1cBFd1688e19dE659247bb95f2ef161Df72C7565",
    "polygon_zkevm": "0x2B5F704aB7061FB4DBfc5876B024F4BDB2f5E8b6",
    // "linea":"0x9F92b2706c643ae6FDF2e9ca472f0E48497385f1",
    "linea": "0xE4B2D37DaBA87e865e811b240e07522414386de3",
    "telos": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "scroll": "0x7740C579c844A21A4dF8E18c39a1c6eEBf7e9051",
    "base": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "opbnb": "0x689e9631d1e308845DE5661C0B6bdE23c841e459",
    "mantle": "0xEecf65578bF2f5a506e501c5809688632C1540E5",
    "manta": "0x891CbfED9c791b8e8A53084aC39b213aF6109C70",
    "blast": "0xD9b3b246ac3B6e44641443fec1e3749df72050b8",
    "mode": "0x0D7A7dEf69281768599FAe0FE746EA9554b2b3D4",
    "pulse": "0xf0B8E4CBf9c6a3F010eA5bdC3AcB796c33d0BA12",
    "merlin": "0x830E7E548F4D80947a40A7Cf3a2a53166a0C3980",
    "rootstock": "0x996a9858cdfa45ad68e47c9a30a7201e29c6a386",
    "polygon": "0xc4f1501f337079077842343Ce02665D8960150B0",
    "gnosis": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "x1": "0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D",
    "sei": "0xcA11bde05977b3631167028862bE2a173976CA11",
  }
  if (json[key]) {
    return {
      id: getChainId(key),
      address: json[key]
    }
  }
  return
}
