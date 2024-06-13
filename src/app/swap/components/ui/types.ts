// types.ts

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface SelectProps {
  options: IToken[];
  value: IToken | null;
  setSelected: (token: IToken) => void;
}
