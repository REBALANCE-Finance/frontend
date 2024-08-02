import { endpoint } from "../pools/queries";

export const getPredictedPoints = async (
  token: string,
  tokenAmount: number,
  daysOfLock: number
) => {
  const response = await fetch(
    `${endpoint}lending/calculate-points/${token}/${tokenAmount}/${daysOfLock}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: number = await response.json();

  return data;
};

export const getEarnedPoints = async (address: string) => {
  const response = await fetch(`${endpoint}lending/user-points/${address}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: number = await response.json();

  console.log("res", response, data);

  return data;
};
