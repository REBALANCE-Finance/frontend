import { Button, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import Icon from "../../icon";
import { ICON_NAMES } from "@/consts";
import { DataSwitcher } from "@/components/data-switcher/DataSwitcher";
import VaultFormInput from "./Input";
import { SelectOption } from "./Select";

const tokens: SelectOption[] = [
  {
    label: "USDC",
    value: "USDC",
    imageUrl: "/assets/icons/USDC-icon.svg"
  },

  {
    label: "USDT",
    value: "USDT",
    imageUrl: "/assets/icons/USDT-icon.svg"
  }
];

const amounts: SelectOption[] = [
  {
    label: "$50",
    value: "50"
  },
  {
    label: "$100",
    value: "100"
  },
  {
    label: "$250",
    value: "250"
  },
  {
    label: "$500",
    value: "500"
  },
  {
    label: "$750",
    value: "750"
  },
  {
    label: "$1000",
    value: "1000"
  }
];

type VaultFormProps = {
  title: string;
  onClose: VoidFunction;
  startAmount: {
    token: number;
    usd: number;
  };
  projectedProfit: {
    token: number;
    usd: number;
  };
  apy: number;
};

const VaultForm: FC<VaultFormProps> = ({ title, onClose, startAmount, projectedProfit, apy }) => {
  const tiers = ["Tier 1", "Tier 2", "Tier 3"];
  const [selectedToken, setSelectedToken] = useState<SelectOption>(tokens[0]);
  const [selectedAmount, setSelectedAmount] = useState<SelectOption>(amounts[0]);

  const isButtonDisabled = true;

  return (
    <Flex justify="center" alignItems="center" minH="calc(100vh - 204px)">
      <Flex flexDir="column" gap={6} padding={6} w="100%" maxW={500}>
        <Flex justify="space-between" alignItems="center">
          <Text fontSize="20px" lineHeight="22px" fontWeight={500} color="#EAEAEA">
            {title}
          </Text>

          <IconButton
            aria-label="close"
            icon={<Icon name={ICON_NAMES.close} />}
            boxSize="24px"
            minW={0}
            onClick={onClose}
          />
        </Flex>

        <Flex justify="space-between" alignItems="center">
          <Text fontSize="16px" lineHeight="18px" color="black.0">
            Your tier
          </Text>

          <DataSwitcher data={tiers} value={tiers[0]} onChange={() => {}} width="inherit" />
        </Flex>

        <VaultFormInput
          token={{
            value: selectedToken,
            items: tokens,
            handleChange: setSelectedToken
          }}
          amount={{
            value: selectedAmount,
            items: amounts,
            handleChange: setSelectedAmount
          }}
          isValid={false}
          error="You have only 45.5 USDC in your wallet"
        />

        <Divider />

        <Flex justify="space-between" alignItems="center">
          <Text>Start amount</Text>

          <Flex gap={3} alignItems="center">
            <Text fontFamily="mono" fontWeight={500}>
              {startAmount.token} RBLN
            </Text>

            <Text fontFamily="mono" fontSize="12px" lineHeight="14px" color="darkGray">
              ${startAmount.usd}
            </Text>
          </Flex>
        </Flex>

        <Divider />

        <Flex justifyContent="space-between" alignItems="center">
          <Text>Projected profit (365 days)</Text>

          <Flex gap={3} alignItems="center">
            <Text fontFamily="mono" fontWeight={500} color="#4CFF94">
              + {projectedProfit.token} RBLN
            </Text>

            <Text fontFamily="mono" fontSize="12px" lineHeight="14px" color="darkGray">
              ${projectedProfit.usd}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="space-between" alignItems="center">
          <Text>APY</Text>

          <Text fontFamily="mono" fontWeight={500} color="#4CFF94">
            {apy}%
          </Text>
        </Flex>

        <Button
          w="100%"
          h="44px"
          bg={isButtonDisabled ? "#151619" : "white"}
          color={isButtonDisabled ? "gray.400" : "black.100"}
          disabled={isButtonDisabled}
          _disabled={{
            cursor: "not-allowed",
            opacity: 0.8
          }}
        >
          Activate
        </Button>
      </Flex>
    </Flex>
  );
};

export default VaultForm;
