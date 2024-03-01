import * as Yup from "yup";

export const withdrawSchema = (userDeposit: number | string | undefined) =>
  Yup.object().shape({
    withdraw: Yup.string()
      .required("Withdraw amount is required")
      .test({
        name: "check-minimum-amount",
        message: "Withdraw amount is below the minimum allowed",
        test: function (value) {
          return !!+value;
          // Adjust the multiplier as needed for the minimum ratio
        }
      })
      .test({
        name: "check-maximum-amount",
        message: `Withdraw amount is above the maximum allowed`,
        test: function (value) {
          return +value <= Number(userDeposit); // Adjust the multiplier as needed for the maximum ratio
        }
      })
    // .matches(/^(\d*)\.?\d{1,5}$/, "Amount must not exceed 5 decimals")
  });
