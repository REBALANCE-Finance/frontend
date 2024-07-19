"use client";
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { IPoolData, IAreaChartData } from "@/api/pools/types";
import { useEffect, useState } from "react";

interface LendingAssetPageProps {
  params: { [key: string]: string };
}

const LendingAssetPage: React.FC<LendingAssetPageProps> = ({ params }) => {
  const [pools, setPools] = useState<IPoolData[]>([]);
  const [chartData, setChartData] = useState<IAreaChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolsData = async () => {
    try {
      const poolsData = await getPools("lending");
      if (!poolsData) {
        throw new Error("Failed to fetch pools data");
      }
      return poolsData;
    } catch (err) {
      throw new Error(
        "Failed to fetch pools data: " + (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const fetchChartData = async (token: string) => {
    try {
      const chartData = await getAreaChartAllIntervals(token);
      if (!chartData) {
        throw new Error("Failed to fetch chart data");
      }
      return chartData;
    } catch (err) {
      throw new Error(
        "Failed to fetch chart data: " + (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poolsData = await fetchPoolsData();
        setPools(poolsData);

        const token = poolsData.find(item => item.token === params.poolToken)?.token;
        if (!token) {
          throw new Error("Token not found for the provided pool address");
        }

        const chartData = await fetchChartData(token);
        setChartData(chartData);

        setLoading(false);
      } catch (err) {
        console.error("Error loading lending asset page:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [params.poolToken]);

  return <LendingAsset pools={pools} chartData={chartData} loading={loading} error={error} />;
};

export default LendingAssetPage;
