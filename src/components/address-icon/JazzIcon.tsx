import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface IProps {
  size?: number;
  address: string | undefined;
  m?: string;
  paperStyles?: { [key: string]: React.CSSProperties };
}

export const JazzIcon: React.FC<IProps> = ({ size, address, m, paperStyles, ...rest }) => {
  if (!address) return null;
  return (
    <Jazzicon
      diameter={size ?? 28}
      seed={jsNumberForAddress(address)}
      paperStyles={{
        margin: m ?? "0",
        minWidth: size ?? 28,
        minHeight: size ?? 28,
        ...(paperStyles !== null ? paperStyles : {})
      }}
      {...rest}
    />
  );
};
