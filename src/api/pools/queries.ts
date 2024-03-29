import { IIntervalResponse, ILendChartData, IPoolData, IPoolsData } from "./types";

const endpoint = "https://rebalancerfinanceapi.net/";

// const mockData: IPoolData[] = [
//   {
//     token: "usdc",
//     tokenAddress: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
//     rebalancerAddress: "0xe97830116fD3f065696E4aDfb3a337f02AD233be",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: 1,
//     funds: 1020000,
//     avgApr: 1,
//     earned: 120,
//     decimals: 6,
//     deposit: 20000,
//     risk: 2,
//     borrowRate: 13.3,
//     borrowed: 532112
//   },
//   {
//     token: "weth",
//     tokenAddress: "",
//     rebalancerAddress: "",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: 1,
//     funds: 201010,
//     avgApr: 1,
//     earned: 1111,
//     decimals: 1,
//     deposit: 100,
//     risk: 3,
//     borrowRate: 9.22,
//     borrowed: 234320
//   },
//   {
//     token: "dai",
//     tokenAddress: "",
//     rebalancerAddress: "",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: -1,
//     funds: 2.45,
//     avgApr: 1,
//     earned: 1345,
//     decimals: 1,
//     deposit: 1200,
//     risk: 5,
//     borrowRate: 11.2,
//     borrowed: 1000000
//   }
// ];

export const getPools = async (type: "lending" | "borrowing"): Promise<IPoolData[]> => {
  const response = await fetch(`${endpoint}${type}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: IPoolsData[] = await response.json();

  const pools: IPoolData[] = data.map(item => {
    return {
      token: item?.token?.toString()?.toLowerCase(),
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
};

// export const mockData: IMockData[] = [
//   {
//     token: "usdt",
//     tokenAddress: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
//     rebalancerAddress: "0x58008140AE706D915fFcC44F26E919a20f296d9e",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: 1.5,
//     funds: 1230000022,
//     avgApr: 1.2,
//     earned: 1232323,
//     decimals: 1,
//     deposit: 0,
//     borrowRate: 12.5,
//     borrowed: 1234334,
//     risk: 5
//   },
//   {
//     token: "usdc",
//     tokenAddress: "",
//     rebalancerAddress: "",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: 1,
//     funds: 1020000,
//     avgApr: 1,
//     earned: 120,
//     decimals: 1,
//     deposit: 20000,
//     risk: 2,
//     borrowRate: 13.3,
//     borrowed: 532112
//   },
//   {
//     token: "weth",
//     tokenAddress: "",
//     rebalancerAddress: "",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: 1,
//     funds: 201010,
//     avgApr: 1,
//     earned: 1111,
//     decimals: 1,
//     deposit: 100,
//     risk: 3,
//     borrowRate: 9.22,
//     borrowed: 234320
//   },
//   {
//     token: "wbtc",
//     tokenAddress: "",
//     rebalancerAddress: "",
//     tokenPriceInUsd: 1,
//     tokenPrice24HrChangeInPercentages: 1,
//     tokenPrice24HrChangeInUsd: 1,
//     apr: -1,
//     funds: 2.45,
//     avgApr: 1,
//     earned: 1345,
//     decimals: 1,
//     deposit: 1200,
//     risk: 5,
//     borrowRate: 11.2,
//     borrowed: 1000000
//   }
// ];


export const getChartData = async (interval: number, intervalsCount: number, token: string): Promise<any> => {
  const highestMarketResponse = await fetch(`${endpoint}lending/${token.toUpperCase()}/highest-market-apr-ticks/${interval}/${intervalsCount}`);
  const rebalanceAprResponse = await fetch(`${endpoint}lending/${token.toUpperCase()}/apr-ticks/${interval}/${intervalsCount}`);

  if (!highestMarketResponse.ok) {
    throw new Error(`HTTP error! status: ${highestMarketResponse.status}`);
  }

  if (!rebalanceAprResponse.ok) {
    throw new Error(`HTTP error! status: ${rebalanceAprResponse.status}`);
  }

  const highestMarketData = await highestMarketResponse.json();
  const rebalanceAprData = await rebalanceAprResponse.json();

  const marketAprChart = highestMarketData.map((el: any) => ({ lending: el.value || 0, date: el.from }));
  const rebalanceAprChart = rebalanceAprData.map((el: any) => ({ lending: el.value || 0, date: el.from }));
  const chartData: ILendChartData[] = rebalanceAprData.map((el: any) => ({ lending: el.value >= 0 && el.value ? el.value : 0, date: el.from }));
  const poolChart: any[] = [];

  for (let i = 0; i < marketAprChart.length; i++) {
    const marketValue = marketAprChart[i];
    const rebalanceValue = rebalanceAprChart[i];
    const chartPoint = {
      date: marketValue.date,
      lending: rebalanceValue.lending,
      borrowing: marketValue.lending,
    }

    poolChart.push(chartPoint);
  }

  const rebalanceAvgApr = poolChart.reduce((acc, el) => acc + el.lending, 0) / intervalsCount;
  const aaveAvgApr = poolChart.reduce((acc, el) => acc + el.borrowing, 0) / intervalsCount;

  return {chartData: chartData, poolChart, rebalanceAvgApr, aaveAvgApr};
};

export const getAreaChartAllIntervals = async (token: string = 'usdt') => {
  const monthData = await getChartData(1, 30, token);
  const halfYearData = await getChartData(7, 26, token);
  const yearData = await getChartData(7, 52, token);

  const preparedChartData = {
    poolChart: {
      '1m': {
        data: monthData.poolChart.reverse(),
        rebalanceAvg: monthData.rebalanceAvgApr,
        aaveAvg: monthData.aaveAvgApr
      },
      '6m': {
        data: halfYearData.poolChart.reverse(),
        rebalanceAvg: halfYearData.rebalanceAvgApr,
        aaveAvg: halfYearData.aaveAvgApr
      },
      '1y': {
        data: yearData.poolChart.reverse(),
        rebalanceAvg: yearData.rebalanceAvgApr,
        aaveAvg: yearData.aaveAvgApr
      },
    },
    chartData: {
      '1m': monthData.chartData.reverse(),
      '6m': halfYearData.chartData.reverse(),
      '1y': yearData.chartData.reverse(),
    }
  };

  return preparedChartData;
}

export const getPersonalEarnings = async (interval: number, intervalsCount: number, address: string, token: string) => {
  const userEarningsResponse = await fetch(`${endpoint}lending/${token}/user-earned-ticks/${address}/${interval}/${intervalsCount}`);
  const avgAPRTiksResponse = await fetch(`${endpoint}lending/${token}/apr-ticks/${interval}/${intervalsCount}`);

  if (!userEarningsResponse.ok) {
    throw new Error(`HTTP error! status: ${userEarningsResponse.status}`);
  }

  if (!avgAPRTiksResponse.ok) {
    throw new Error(`HTTP error! status: ${avgAPRTiksResponse.status}`);
  }

  const userEarningsData: IIntervalResponse[] = await userEarningsResponse.json();
  const avgAPRTicksData: IIntervalResponse[] = await avgAPRTiksResponse.json();

  const avgAPR = avgAPRTicksData.map(el => el.value || 0).reduce((acc, el) => (acc + el), 0) / intervalsCount;
  const preparedUserEarnings = userEarningsData.map((el, index) => ({name: el.from, uv: el.value ? (el.value >= 0 ? el.value : 0) : 0, apr: avgAPRTicksData[index].value})).reverse()

  return { userEarned: preparedUserEarnings, avgAPR };
}