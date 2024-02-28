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
import { TABS_BORROW_AND_REPAY } from "../utils";
import { BorrowTab } from "./components/BorrowTab";
import { RepayTab } from "./components/RepayTab";

export const BorrowOrRepayModal: FC<IDefaultModalProps> = ({ isOpen, onClose, type }) => {
  const defaultIndex = TABS_BORROW_AND_REPAY.indexOf(type);
  const { tabIndex, handleTab } = useTab(defaultIndex);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Tabs index={tabIndex} onChange={handleTab}>
        <ModalHeader fontSize="lg" p="0">
          <TabList
            as={HStack}
            divider={<Divider orientation="vertical" borderColor="black.20" h="1.5rem" />}
          >
            {TABS_BORROW_AND_REPAY.map((elem, i) => {
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
            <TabPanel>
              <BorrowTab />
            </TabPanel>
            <TabPanel>
              <RepayTab />
            </TabPanel>
          </TabPanels>
        </ModalBody>
      </Tabs>
    </Modal>
  );
};
