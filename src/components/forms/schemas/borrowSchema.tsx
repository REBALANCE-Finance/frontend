import * as Yup from "yup";

export const borrowSchema = () => {
  return Yup.object().shape({
    borrow: Yup.string().required("Borrow amount is required"),
    //   .test({
    //     name: "check-minimum-amount",
    //     message: "Borrow amount is below the minimum allowed",
    //     test: function (value) {
    //       return +value >= 0.001; // Adjust the multiplier as needed for the minimum ratio
    //     }
    //   })
    //   .test({
    //     name: "max borrow",
    //     message: `Borrow amount is above the maximum allowed ${maxDeposit}`,
    //     test: function (value) {
    //       return Number(value) <= Number(maxDeposit); // Adjust the multiplier as needed for the maximum ratio
    //     }
    //   })
    //   .test({
    //     name: "max user balance",
    //     message: `The deposit amount exceeds your balance ${balance}`,
    //     test: function (value) {
    //       return Number(value) <= Number(balance); // Adjust the multiplier as needed for the maximum ratio
    //     }
    //   }),
    collateral: Yup.string().required("Collateral amount is required")
    //   .test({
    //     name: "check-minimum-amount",
    //     message: "Deposit amount is below the minimum allowed",
    //     test: function (value) {
    //       return +value >= 0.001; // Adjust the multiplier as needed for the minimum ratio
    //     }
    //   })
    //   .test({
    //     name: "max deposit",
    //     message: `Deposit amount is above the maximum allowed ${maxDeposit}`,
    //     test: function (value) {
    //       return Number(value) <= Number(maxDeposit); // Adjust the multiplier as needed for the maximum ratio
    //     }
    //   })
    //   .test({
    //     name: "max user balance",
    //     message: `The deposit amount exceeds your balance ${balance}`,
    //     test: function (value) {
    //       return Number(value) <= Number(balance); // Adjust the multiplier as needed for the maximum ratio
    //     }
    //   })
  });
};
