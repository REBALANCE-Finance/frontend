'use client';
import { useEffect, useState } from 'react';
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";
import { IPoolData } from '@/api/pools/types';

const LendingPage = ({ params }: { params: { [key: string]: string } }) => {
  const [pools, setPools] = useState<IPoolData[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPools = await getPools('lending');
        setPools(fetchedPools);
        const token = fetchedPools?.find(item => item.rebalancerAddress === params.poolAddress)?.token || fetchedPools[0]?.token;
        if (token) {
          const fetchedChartData = await getAreaChartAllIntervals(token);
          setChartData(fetchedChartData);
        }
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Ошибка при загрузке данных:", err);
          setError(err.message);
        } else {
          console.error("Неизвестная ошибка:", err);
          setError("Произошла неизвестная ошибка");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [params.poolAddress]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    // return <div>{error}</div>;
  }

  return (
    <PoolLayout pools={pools} chartData={chartData}>
      <PoolsLending pools={pools} />
    </PoolLayout>
  );
};

export default LendingPage;
