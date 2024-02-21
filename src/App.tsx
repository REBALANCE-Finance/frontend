import { ChakraProvider } from "@chakra-ui/react";
// import { WagmiProvider } from "wagmi";
import Router from "./router/Router";
import { AppRoutes } from "./router/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { themes } from "./themes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <ChakraProvider theme={themes}>
        <QueryClientProvider client={queryClient}>
          {/* <WagmiProvider config={{}}> */}
          <AppRoutes />
          {/* </WagmiProvider> */}
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
