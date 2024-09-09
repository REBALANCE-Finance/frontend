import { Task as ITask } from "@/types";
import { Button, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";

type TaskProps = {
  pointsQty: number;
  ButtonProps?: {
    title: string;
    loading: boolean;
    onClick: VoidFunction;
  };
} & ITask;

export const Task = ({ name, complete, pointsQty, ButtonProps }: TaskProps) => {
  const [is600Up] = useMediaQuery("(min-width: 600px)");

  return (
    <Flex key={name} justify="space-between" maxH="24px">
      <Flex gap="8px" alignItems={is600Up ? "center" : "flex-start"}>
        <Image
          src={complete ? "assets/image/CompletedTask.svg" : "assets/image/UncompletedTask.svg"}
          width="16px"
          height="16px"
        />
        <Flex
          flexDir={is600Up ? "row" : "column"}
          alignItems={is600Up ? "center" : "flex-start"}
          gap="8px"
        >
          <Text textStyle={is600Up ? "text16" : "text12"} color={complete ? "#9FA2A8" : "#DEDEDE"}>
            {name}
          </Text>
          {!complete && (
            <Text textStyle={is600Up ? "text14" : "text10"} color="#4CFF94">
              +{pointsQty} points
            </Text>
          )}
        </Flex>
      </Flex>
      {complete && (
        <Text textStyle={is600Up ? "text14" : "text10"} color="#9FA2A8" textAlign="right">
          {pointsQty} points received
        </Text>
      )}
      {!complete && ButtonProps && (
        <Button
          isLoading={ButtonProps.loading}
          padding="4px 12px"
          bg="#DEDEDE"
          color="#09090B"
          borderRadius="4px"
          fontSize="14px"
          height="max-content"
          onClick={ButtonProps.onClick}
          minW="70px"
        >
          {ButtonProps.title}
        </Button>
      )}
    </Flex>
  );
};

export default Task;
