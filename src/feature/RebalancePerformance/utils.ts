export enum PERFORMANCE_TYPE {
  lending = "lending",
  borrowing = "borrowing"
}

export const getCurrentPath = (path: string) => {
  const pathName = path.split("/")[1];

  return pathName;
};
