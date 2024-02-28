export const ellipsis = (string: string, chars = 4) => {
  if (!string) return "";
  return `${string.substring(0, chars)}...${string.substring(string.length - chars)}`;
};
