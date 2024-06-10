
interface Options {
  [key: string]: string;
}

interface SelectProps {
  options: Options;
  value: string;
  setSelected: (value: string) => void;
}
