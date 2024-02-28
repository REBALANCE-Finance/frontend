import { Tabs as DefaultTabs, TabsProps } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";

interface ITabsProps extends PropsWithChildren {
  index: TabsProps["index"];
  onChange: TabsProps["onChange"];
}

export const Tabs: FC<ITabsProps> = ({ index, onChange, children }) => {
  return (
    <DefaultTabs
      isLazy
      display="flex"
      flexDirection="column"
      gap="24px"
      index={index}
      variant="unstyled"
      onChange={onChange}
    >
      {children}
    </DefaultTabs>
  );
};
