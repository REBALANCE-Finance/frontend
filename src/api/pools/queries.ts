import { IIntervalResponse, ILendChartData, IPoolData, IPoolsData, ITotalProfit } from "./types";

export const endpoint = "https://rebalancerfinanceapi.net/";

export const getPools = async (type: "lending" | "borrowing"): Promise<IPoolData[]> => {
  try {
    const response = await fetch(`${endpoint}${type}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IPoolsData[] = await response.json();

    const pools: IPoolData[] = data.map(item => {
      return {
        token: item?.token,
        tokenAddress: item?.tokenAddress,
        rebalancerAddress: item?.vaultAddress,
        tokenPriceInUsd: item?.tokenPrice,
        tokenPrice24HrChangeInPercentages: 1,
        tokenPrice24HrChangeInUsd: 1,
        apr: item?.highestMarket30DAvgAprDiffPercentage,
        funds: item?.funds,
        avgApr: item?.avgApr30D,
        earned: item?.earned,
        decimals: item?.tokenDecimals,
        deposit: 0,
        risk: 1,
        borrowRate: 12.5,
        borrowed: 1234334
      };
    });
    return [...pools];
  } catch (error: any) {
    console.error(`Failed to fetch pools: ${error.message}`);
    throw error;
  }
};

export const getTotalProfit = async (type: "lending" | "borrowing", address: string) => {
  try {
    const response = await fetch(`${endpoint}${type}/user-earned-overall/${address}`, {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: number = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch total profit: ${error.message}`);
    throw error;
  }
};

export const getProfitPool = async (
  type: "lending" | "borrowing",
  address: string,
  token: string
) => {
  try {
    const response = await fetch(`${endpoint}${type}/${token}/user-earned/${address}`, {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: number = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch profit pool: ${error.message}`);
    throw error;
  }
};

export const getChartData = async (
  interval: number,
  intervalsCount: number,
  token: string
): Promise<any> => {
  try {
    const highestMarketResponse = await fetch(
      `${endpoint}lending/${token}/highest-market-apr-ticks/${interval}/${intervalsCount}`,
      { cache: "no-store" }
    );
    const rebalanceAprResponse = await fetch(
      `${endpoint}lending/${token}/apr-ticks/${interval}/${intervalsCount}`,
      { cache: "no-store" }
    );

    if (!highestMarketResponse.ok) {
      throw new Error(`HTTP error! status: ${highestMarketResponse.status}`);
    }

    if (!rebalanceAprResponse.ok) {
      throw new Error(`HTTP error! status: ${rebalanceAprResponse.status}`);
    }

    const highestMarketData = await highestMarketResponse.json();
    const rebalanceAprData = await rebalanceAprResponse.json();

    const marketAprChart = highestMarketData.map((el: any) => ({
      lending: el.value || 0,
      date: el.from
    }));
    const rebalanceAprChart = rebalanceAprData.map((el: any) => ({
      lending: el.value || 0,
      date: el.from
    }));
    const chartData: ILendChartData[] = rebalanceAprData.map((el: any) => ({
      lending: el.value >= 0 && el.value ? el.value : 0,
      date: el.from
    }));
    const poolChart: any[] = [];

    for (let i = 0; i < marketAprChart.length; i++) {
      const marketValue = marketAprChart[i];
      const rebalanceValue = rebalanceAprChart[i];
      const chartPoint = {
        date: marketValue.date,
        lending: rebalanceValue.lending,
        borrowing: marketValue.lending
      };

      poolChart.push(chartPoint);
    }

    const rebalanceAvgApr = poolChart.reduce((acc, el) => acc + el.lending, 0) / intervalsCount;
    const aaveAvgApr = poolChart.reduce((acc, el) => acc + el.borrowing, 0) / intervalsCount;

    return { chartData: chartData, poolChart, rebalanceAvgApr, aaveAvgApr };
  } catch (error: any) {
    console.error(`Failed to fetch chart data: ${error.message}`);
    throw error;
  }
};

export const getUserEarnings = async (
  interval: number,
  intervalsCount: number,
  address: string
) => {
  try {
    const response = await fetch(
      `${endpoint}lending/user-earned-overall-ticks/${address}/${interval}/${intervalsCount}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IIntervalResponse[] = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Failed to fetch user earnings: ${error.message}`);
    throw error;
  }
};

const fetchHighestAprToken = async (dayInterval: number): Promise<string> => {
  try {
    const response = await fetch(`${endpoint}lending/highest-apr-token/${dayInterval}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  } catch (error: any) {
    console.error(`Failed to fetch highest apr token: ${error.message}`);
    throw error;
  }
};

const getChartDataAndEarnings = async (
  token: string,
  address?: string
): Promise<
  [
    ChartData,
    ChartData,
    ChartData,
    IIntervalResponse[]?,
    IIntervalResponse[]?,
    IIntervalResponse[]?
  ]
> => {
  const [monthData, halfYearData, yearData] = await Promise.all([
    getChartData(1, 30, token),
    getChartData(7, 26, token),
    getChartData(7, 52, token)
  ]);

  let monthEarning: IIntervalResponse[] | undefined;
  let halfYearEarning: IIntervalResponse[] | undefined;
  let yearEarning: IIntervalResponse[] | undefined;

  if (address) {
    [monthEarning, halfYearEarning, yearEarning] = await Promise.all([
      getUserEarnings(1, 30, address),
      getUserEarnings(7, 26, address),
      getUserEarnings(7, 52, address)
    ]);
  }

  return [monthData, halfYearData, yearData, monthEarning, halfYearEarning, yearEarning];
};

const mapUserEarnings = (
  data: ChartData["chartData"],
  earnings?: IIntervalResponse[]
): (ChartData["chartData"][0] & { userEarning?: number | null })[] => {
  if (!earnings) return data.reverse();
  return data.reverse().map(item => {
    // @ts-ignore
    const earning = earnings.find(el => el.from === item.date);
    return {
      ...item,
      userEarning: earning ? earning.value : null
    };
  });
};

const prepareChartData = (
  monthData: ChartData,
  halfYearData: ChartData,
  yearData: ChartData,
  monthEarning?: IIntervalResponse[],
  halfYearEarning?: IIntervalResponse[],
  yearEarning?: IIntervalResponse[]
): PreparedChartData => {
  return {
    poolChart: {
      "1m": {
        data: monthData.poolChart.reverse(),
        rebalanceAvg: monthData.rebalanceAvgApr,
        aaveAvg: monthData.aaveAvgApr
      },
      "6m": {
        data: halfYearData.poolChart.reverse(),
        rebalanceAvg: halfYearData.rebalanceAvgApr,
        aaveAvg: halfYearData.aaveAvgApr
      },
      "1y": {
        data: yearData.poolChart.reverse(),
        rebalanceAvg: yearData.rebalanceAvgApr,
        aaveAvg: yearData.aaveAvgApr
      }
    },
    chartData: {
      "1m": mapUserEarnings(monthData.chartData, monthEarning),
      "6m": mapUserEarnings(halfYearData.chartData, halfYearEarning),
      "1y": mapUserEarnings(yearData.chartData, yearEarning)
    }
  };
};

export const getAreaChartAllIntervalsWithoutToken = async (
  address?: string
): Promise<PreparedChartData> => {
  try {
    const highestAprTokenToday = await fetchHighestAprToken(1);

    const [monthData, halfYearData, yearData, monthEarning, halfYearEarning, yearEarning] =
      await getChartDataAndEarnings(highestAprTokenToday, address);

    return prepareChartData(
      monthData,
      halfYearData,
      yearData,
      monthEarning,
      halfYearEarning,
      yearEarning
    );
  } catch (error: any) {
    console.error(`Failed to fetch area chart data: ${error.message}`);
    throw error;
  }
};

export const getAreaChartAllIntervals = async (
  token: string = "usdt",
  address?: string
): Promise<PreparedChartData> => {
  try {
    const [monthData, halfYearData, yearData, monthEarning, halfYearEarning, yearEarning] =
      await getChartDataAndEarnings(token, address);

    return prepareChartData(
      monthData,
      halfYearData,
      yearData,
      monthEarning,
      halfYearEarning,
      yearEarning
    );
  } catch (error: any) {
    console.error(`Failed to fetch area chart data: ${error.message}`);
    throw error;
  }
};

export const getPersonalEarnings = async (
  interval: number,
  intervalsCount: number,
  address: string,
  token: string
) => {
  try {
    const userEarningsResponse = await fetch(
      `${endpoint}lending/${token}/user-earned-ticks/${address}/${interval}/${intervalsCount}`,
      { cache: "no-store" }
    );
    const avgAPRTiksResponse = await fetch(
      `${endpoint}lending/${token}/apr-ticks/${interval}/${intervalsCount}`,
      { cache: "no-store" }
    );

    if (!userEarningsResponse.ok) {
      throw new Error(`HTTP error! status: ${userEarningsResponse.status}`);
    }

    if (!avgAPRTiksResponse.ok) {
      throw new Error(`HTTP error! status: ${avgAPRTiksResponse.status}`);
    }

    const userEarningsData: IIntervalResponse[] = await userEarningsResponse.json();
    const avgAPRTicksData: IIntervalResponse[] = await avgAPRTiksResponse.json();

    const avgAPR =
      avgAPRTicksData.map(el => el.value || 0).reduce((acc, el) => acc + el, 0) / intervalsCount;
    const preparedUserEarnings = userEarningsData
      .map((el, index) => ({
        name: el.from,
        uv: el.value ? (el.value >= 0 ? el.value : 0) : 0,
        apr: avgAPRTicksData[index].value
      }))
      .reverse();

    return { userEarned: preparedUserEarnings, avgAPR };
  } catch (error: any) {
    console.error(`Failed to fetch personal earnings: ${error.message}`);
    throw error;
  }
};
