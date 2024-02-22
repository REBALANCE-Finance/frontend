import "virtual:svg-icons-register";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// import { WagmiProvider } from "wagmi";
import AppRoutes from "./router/Routes";
import { themes } from "./themes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider theme={themes}>
      <QueryClientProvider client={queryClient}>
        {/* <WagmiProvider config={{}}> */}
        <AppRoutes />
        {/* </WagmiProvider> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
