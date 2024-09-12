import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";

const DepositButton = ({
  isDisabled,
  variant,
  onDeposit,
  title,
  id
}: {
  isDisabled: boolean;
  variant: string;
  onDeposit: VoidFunction;
  title?: string;
  id?: string;
}) => {
  return (
    <motion.div
      id={id}
      initial={{ backgroundColor: !isDisabled ? "rgba(76, 255, 148, .3)" : "rgb(21, 22, 25)" }}
      animate={{
        backgroundColor: !isDisabled
          ? ["rgba(76, 255, 148, .7)", "rgba(76, 255, 148, .3)"]
          : "rgb(21, 22, 25)"
      }}
      transition={{
        duration: 1.2,
        repeat: !isDisabled ? Infinity : 0,
        repeatType: "reverse",
        // repeatType: "loop",  // Циклическое повторение
        ease: "linear" // Равномерное изменение анимации
      }}
      style={{ borderRadius: "4px" }}
    >
      <Button
        width={"100%"}
        variant={"#4CFF94"}
        type="submit"
        isDisabled={isDisabled}
        onClick={onDeposit}
      >
        {title || "Deposit"}
      </Button>
    </motion.div>
  );
};

export default DepositButton;
