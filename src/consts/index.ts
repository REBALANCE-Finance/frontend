import { IToken } from "@/api/tokens/types";
import { defChainIdArbitrum } from "@/hooks/useAuth";

export * from "./chains";
export * from "./iconNames";
export * from "./mediaQuery";
export * from "./routes";
export * from "./time";
export * from "./tokenIcons";

export const BIG_1E6 = 1000000;
export const BIG_1E8 = 100000000;
export const BIG_1E9 = 1000000000;
export const BIG_1E10 = 10000000000;
export const BIG_1E16 = 10000000000000000;
export const BIG_1E18 = 1000000000000000000;
export const BIG_1E20 = 100000000000000000000;

export const ARB_CONFIRMATIONS_COUNT = 50;

export const PARASWAP_SPENDER_ADDRESS = "0x216B4B4Ba9F3e719726886d34a177484278Bfcae";

export const USDT_TOKEN: IToken = {
  address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  symbol: "USDT",
  name: "Tether USD",
  decimals: 6,
  chainId: defChainIdArbitrum,
  logoURI:
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
};

export const ARB_TOKEN: IToken = {
  address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  symbol: "ARB",
  name: "Arbitrum",
  decimals: 18,
  chainId: defChainIdArbitrum,
  logoURI: "https://arbitrum.foundation/logo.png"
};

export const BALANCE_ERROR = "Insufficient funds";

export const DEPOSIT_SUCESS = "Deposit successful";

export const WITHDRAW_SUCESS = "Withdraw successful";

export const FIRELABS_AUDIT_LINK = "https://4irelabs.com/smart-contract-audit/";

export const HACKEN_AUDIT_LINK = "https://hacken.io/audits/rebalance/";
