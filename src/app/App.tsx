import "virtual:svg-icons-register";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/index.scss";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { WagmiProvider } from "wagmi";

import { ModalContextController } from "../features/modals/ModalContextController";
import { ModalController } from "../features/modals/ModalController";
import { themes } from "../themes";
import { wagmiConfig } from "../utils/w3";
import AppRoutes from "./router/Routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider theme={themes}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </WagmiProvider>

      <ModalContextController />
      <ModalController />

      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </ChakraProvider>
  );
};

export default App;
