import { endpoint } from "../pools/queries";

export const getPredictedPoints = async (
  token: string,
  tokenAmount: number,
  daysOfLock: number
) => {
  try {
    const response = await fetch(
      `${endpoint}lending/calculate-points/${token}/${tokenAmount}/${daysOfLock}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: number = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch predicted points: ${error.message}`);
    throw error;
  }
};

export const getEarnedPoints = async (address: string) => {
  try {
    const response = await fetch(`${endpoint}lending/user-points/${address}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: number = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch earned points: ${error.message}`);
    throw error;
  }
};
