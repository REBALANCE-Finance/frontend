// import { parseUnits } from 'ethers';
// import React, { useState, useEffect } from 'react';
// import { useAccount, usePublicClient } from 'wagmi';

// function GasEstimator({ contractAddress, functionName, transactionAmount } : { contractAddress: string, functionName: string, transactionAmount: number }) {
//   const { address } = useAccount();
//   const provider = usePublicClient ();
//   const [gasEstimate, setGasEstimate] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!address || !provider) {
//       setError('Account or provider is not ready');
//       return;
//     }

//     const estimateGas = async () => {
//       setIsLoading(true);
//       try {
//         const data = await provider.getSigner().estimateGas({
//           from: address,
//           to: contractAddress,
//           data: provider.getSigner().interface.encodeFunctionData(functionName, [parseUnits(transactionAmount.toString(), 'ether')])
//         });

//         setGasEstimate(data.toString());
//         setIsLoading(false);
//       } catch (err) {
//         setError('Error estimating gas: ' + err.message);
//         setIsLoading(false);
//       }
//     };

//     estimateGas();
//   }, [address, provider, contractAddress, functionName, transactionAmount]);

//   return (
//     <div>
//       <h1>Gas Estimate</h1>
//       {isLoading ? (
//         <p>Estimating...</p>
//       ) : gasEstimate ? (
//         <p>Estimated Gas: {gasEstimate}</p>
//       ) : (
//         <p>{error || "No estimate available"}</p>
//       )}
//     </div>
//   );
// }

// export default GasEstimator;
