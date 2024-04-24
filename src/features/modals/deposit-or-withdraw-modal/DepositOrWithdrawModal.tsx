'use client'

import {
  Divider,
  HStack,
  ModalBody,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useAccount } from "wagmi";

import { Modal } from "../../../components/modal";
import { Tabs } from "../../../components/tabs";
import { useBalanceOfAsset } from "../../../hooks/useBalanceOfAsset";
import { useTab } from "../../../hooks/useTab";
import { IDefaultModalProps } from "../types";
import { TABS_DEPOSIT_AND_WITHDRAW } from "../utils";
import { DepositTab } from "./components/DepositTab";
import { WithdrawTab } from "./components/WithdrawTab";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { formatNumber } from "@/utils/formatNumber";

export const DepositOrWithdrawModal: FC<IDefaultModalProps> = ({ isOpen, onClose, pool, type }) => {
  const defaultIndex = TABS_DEPOSIT_AND_WITHDRAW.indexOf(type);
  const { tabIndex, handleTab } = useTab(defaultIndex);
  const { address } = useAccount();

  const { balance } = useBalanceOfAsset(pool?.rebalancerAddress, address ?? "0x", pool?.decimals);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Tabs index={tabIndex} onChange={handleTab}>
        <ModalHeader fontSize="lg" p="0">
          <TabList
            as={HStack}
            divider={<Divider orientation="vertical" borderColor="black.20" h="1.5rem" />}
          >
            {TABS_DEPOSIT_AND_WITHDRAW.map((elem, i) => {
              const isActive = tabIndex === i;
              return (
                <Tab key={elem} p="0" fontSize="xl" color={isActive ? "white" : "gray.100"}>
                  {elem}
                </Tab>
              );
            })}
          </TabList>
        </ModalHeader>

        <ModalBody p="0">
          {address && (
            <TabPanels>
              <TabPanel p="0">
                <DepositTab pool={pool} onClose={onClose} />
              </TabPanel>
              <TabPanel p="0">
                <WithdrawTab pool={pool} balance={+formatNumber(balance)} onClose={onClose} address={address} />
              </TabPanel>
            </TabPanels>
          )}
        </ModalBody>
      </Tabs>
    </Modal>
  );
};
