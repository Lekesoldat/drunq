enum Distribution {
  MALE = 0.68,
  FEMALE = 0.55,
}

const ETHANOL_DENSITY = 0.789;

interface CalculationInputs {
  gender: "MALE" | "FEMALE";
  weight: number;
  percentage: number;
  volume: number;
  consumedAt: number;
}

export const calculateBACofDrink = ({
  gender,
  weight,
  percentage,
  volume,
  consumedAt,
}: CalculationInputs) => {
  const alcoholInGrams = volume * (percentage / 100) * ETHANOL_DENSITY * 1000;

  const metabolized = (consumedAt - new Date().getHours()) * 0.015;

  return (
    (alcoholInGrams / (Distribution[gender] * weight * 1000)) * 100 -
    metabolized
  );
};

// console.log(
//   "BAC: ",
//   calculateBACofDrink({
//     gender: "MAN",
//     consumedAt: new Date().getHours() - 1,
//     weight: 90,
//     percentage: 4.6,
//     volume: 0.33,
//   })
// );
