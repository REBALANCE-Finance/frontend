import { endpoint } from "../pools/queries";

export const getPoints = async (token: string, tokenAmount: number, daysOfLock: number) => {
  const response = await fetch(
    `${endpoint}lending/calculate-points/${token}/${tokenAmount}/${daysOfLock}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: number = await response.json();

  return data;
};
