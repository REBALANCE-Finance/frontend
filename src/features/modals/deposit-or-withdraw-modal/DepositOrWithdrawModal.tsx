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

import { Modal } from "../../../components/modal";
import { Tabs } from "../../../components/tabs";
import { useTab } from "../../../hooks/useTab";
import { IDefaultModalProps } from "../types";
import { TABS_DEPOSIT_AND_WITHDRAW } from "../utils";
import { DepositTab } from "./components/DepositTab";
import { WithdrawTab } from "./components/WithdrawTab";

export const DepositOrWithdrawModal: FC<IDefaultModalProps> = ({ isOpen, onClose, pool, type }) => {
  const defaultIndex = TABS_DEPOSIT_AND_WITHDRAW.indexOf(type);
  const { tabIndex, handleTab } = useTab(defaultIndex);

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
          <TabPanels>
            <TabPanel p="0">
              <DepositTab pool={pool} />
            </TabPanel>
            <TabPanel p="0">
              <WithdrawTab pool={pool} />
            </TabPanel>
          </TabPanels>
        </ModalBody>
      </Tabs>
    </Modal>
  );
};
