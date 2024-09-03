import { Task } from "@/types";
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

export const getTasks = async (address: string) => {
  try {
    const response = await fetch(`${endpoint}lending/user-tasks/${address}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Task[] = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch tasks: ${error.message}`);
    throw error;
  }
};

export const completeTask = async (address: string, taskName: string) => {
  try {
    const response = await fetch(`${endpoint}lending/complete-task/${address}/${taskName}`, {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to complete task: ${error.message}`);
    throw error;
  }
};
