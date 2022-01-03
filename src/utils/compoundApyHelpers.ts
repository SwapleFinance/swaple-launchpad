const roundToTwoDp = (number) => Math.round(number * 100) / 100

export const calculateCakeEarnedPerThousandDollars = ({ numberOfDays, farmApy, cakePrice }) => {
  // Everything here is worked out relative to a year, with the asset compounding daily
  // const timesCompounded = 365
  // //   We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  // const apyAsDecimal = farmApy / 100
  // const daysAsDecimalOfYear = numberOfDays / timesCompounded
  // //   Calculate the starting CAKE balance with a dollar balance of $1000.
   const principal = 1000 

   console.log("data : ", farmApy)

  // // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  // const finalAmount = principal * (1 + apyAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)

  // To get the cake earned, deduct the amount after compounding (finalAmount) from the starting CAKE balance (principal)
  const interestEarned = (principal * farmApy / 100) * numberOfDays
  return roundToTwoDp(interestEarned)
}

export const apyModalRoi = ({ amountEarned, amountInvested }) => {
  return amountEarned/10
}
