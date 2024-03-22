import { useConnect } from "wagmi";

import { ConnectorNames } from "../consts/connectors";

const defChainIdArbitrum = 42161;

export const useAuth = () => {
  const { connectAsync, connectors, ...rest } = useConnect();

  const login = async (connectorId: ConnectorNames) => {
    const findConnector = connectors.find(c => c.id === connectorId);
    if (!findConnector) {
      throw new Error("Connector not found");
    }

    return await connectAsync({ chainId: defChainIdArbitrum, connector: findConnector });
  };
  return {
    login,
    ...rest
  };
};
