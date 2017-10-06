export class Calculator {

    public calculateMonthlyPayment(amount: number, interest: number, periodInMonths: number): number {
        const interval = 12;

        return (interest / interval) * amount / (1 - Math.pow(1 + (interest / interval), -1 * periodInMonths));
    }

    public calculateRemainingBalance(amount: number, interest: number, numberOfPayments: number, paymentAmount: number): number {
        const interval = 12;
        return (amount * Math.pow(1 + (interest / interval), numberOfPayments)) - (paymentAmount / (interest / interval)) * (Math.pow(1 + (interest / interval), numberOfPayments) - 1);
    }

    public calculateDataSeriesForTotalMonthlyPayment(amount, interest, periodInMonths: number, addtionalPayments: number[]): number[] {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 2);
    }

    public calculateDataSeriesForRemainingBalance(amount: number, interest: number, periodInMonths: number, addtionalPayments: number[]): number[] {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 1);
    }

    public calculateDataSeriesForPaymentAmount(amount: number, interest: number, periodInMonths: number, addtionalPayments: number[]): number[] {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 3);
    }

    private calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(
        amount: number,
        interest: number,
        periodInMonths: number,
        addtionalPayments: number[],
        type: number): number[] {

        let paymentAmount: number = this.calculateMonthlyPayment(amount, interest, periodInMonths);

        let month = 1;
        let remainingBalance = this.calculateRemainingBalance(amount, interest, 0, paymentAmount);
        let totalPaymentAmount = 0;

        const dataRemainingBalance: number[] = [remainingBalance];
        const dataTotalPaymentAmount: number[] = [0];
        const dataPaymentAmount: number[] = [paymentAmount];

        while (Math.round(remainingBalance * 10000) / 10000 > 0) {


            let addtionalPayment = 0;

            if (month <= addtionalPayments.length) {
                addtionalPayment = addtionalPayments[month - 1];
            }

            if (addtionalPayment !== 0) {
                paymentAmount = this.calculateMonthlyPayment(remainingBalance - addtionalPayment, interest, periodInMonths - month);
            }

            remainingBalance = this.calculateRemainingBalance(remainingBalance - addtionalPayment, interest, 1, paymentAmount);

            totalPaymentAmount += paymentAmount + addtionalPayment;

            dataRemainingBalance.push(Math.round(remainingBalance * 10000) / 10000);
            dataTotalPaymentAmount.push(Math.round(totalPaymentAmount * 10000) / 10000);
            dataPaymentAmount.push(Math.round(paymentAmount * 10000) / 10000);

            month += 1;
        }

        switch (type) {
            case 1:
                return dataRemainingBalance;
            case 2:
                return dataTotalPaymentAmount;
            case 3:
                return dataPaymentAmount;
        }
    }
}