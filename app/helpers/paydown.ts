export const calcAnnualInterestCost = (bal: number, int: number): number => {
  return (bal * int) / 100;
};

export const calcMonthlyInterestCost = (annualCost: number): number => {
  return annualCost / 12;
};

export const calcMonthsToPayDown = (
  payment: number,
  balance: number,
  interest: number
): { count: number; totalInterest: number } => {
  let count = 0;
  let totalInterest = 0;
  let updatedBalance = balance;
  while (updatedBalance > 0) {
    const interestCost = calcMonthlyInterestCost(
      calcAnnualInterestCost(updatedBalance, interest)
    );
    totalInterest = totalInterest + interestCost;
    updatedBalance = updatedBalance - payment + interestCost;
    if (updatedBalance < balance) {
      count++;
    } else {
      return { count: -1, totalInterest: -1 };
    }
  }
  return { count, totalInterest };
};
