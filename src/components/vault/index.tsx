"use client";
import { FC, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import VaultPlan from "./Plan";
import { VAULT_PLANS } from "@/consts";

type VaultDetailsProps = {
  imageUrl: string;
  title: string;
  btnTitle: string;
  description: {
    title: string;
    list: string[];
  };
  onOpenForm: VoidFunction;
};

const VaultDetails: FC<VaultDetailsProps> = ({
  imageUrl,
  title,
  btnTitle,
  description,
  onOpenForm
}) => {
  const [activePlanId, setActivePlanId] = useState(1);

  return (
    <Flex flexDir="column" alignItems="center">
      <Flex gap="44px" width="100%" mt={13}>
        <Image
          src={imageUrl}
          width={343}
          height={343}
          alt="vault"
          style={{
            flexShrink: 0,
            maxHeight: 343,
            maxWidth: 343
          }}
        />

        <Flex flexDir="column" gap={6} width="inherit">
          <Text fontFamily="dmSans" fontSize="30px" lineHeight="30px" fontWeight={500}>
            {title}
          </Text>

          <Flex gap={6}>
            {VAULT_PLANS.map(plan => (
              <VaultPlan
                key={plan.id}
                {...plan}
                isActive={plan.id === activePlanId}
                setIsActive={setActivePlanId}
              />
            ))}
          </Flex>

          <Button
            bg="black.0"
            borderRadius="4px"
            color="black.100"
            fontSize="16px"
            minH="44px"
            minW={190}
            onClick={onOpenForm}
          >
            {btnTitle}
          </Button>
        </Flex>
      </Flex>

      <Flex flexDir="column" gap={7} alignItems="center" mt={16}>
        <Text fontFamily="dmSans" fontSize="30px" lineHeight="30px" fontWeight={500}>
          {description.title}
        </Text>

        <Box as="ul" listStyleType="circle" listStylePosition="inside">
          {description.list.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: "16px",
                lineHeight: "29px",
                textAlign: "center"
              }}
            >
              {item}
            </li>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
};

export default VaultDetails;
