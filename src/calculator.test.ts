import { expect } from 'chai';
import 'mocha';

// Imports services
import { Calculator } from './calculator';

describe('Calculator', () => {

    let calculator: Calculator = null;
    const loanAmount: number = 1000000;
    const interest: number = 10.25 / 100;
    const periodInMonths: number = 20 * 12;
    const paymentAmount: number = 9816.433869864431;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('calculateMonthlyPayment', () => {
        it('should return monthly payment amount', () => {
            const result: number = calculator.calculateMonthlyPayment(loanAmount, interest, periodInMonths);

            expect(result).to.be.eq(paymentAmount);
        });
    });

    describe('calculateRemainingBalance', () => {
        it('should return remaining balance', () => {
            const result: number = calculator.calculateRemainingBalance(loanAmount, interest, 1, paymentAmount);

            expect(result).to.be.eq(loanAmount + (loanAmount * interest / 12) - paymentAmount);
        });
    });

    describe('calculateDataSeriesForTotalMonthlyPayment', () => {
        it('should return array starting at 0', () => {
            const result: number[] = calculator.calculateDataSeriesForTotalMonthlyPayment(loanAmount, interest, periodInMonths, []);

            expect(result[0]).to.be.eq(0);
        });

        it('should return array ending at total payment amount', () => {
            const result: number[] = calculator.calculateDataSeriesForTotalMonthlyPayment(loanAmount, interest, periodInMonths, []);

            expect(Math.round(result[result.length - 1])).to.be.eq(Math.round(paymentAmount * periodInMonths));
        });
    });

    describe('calculateDataSeriesForRemainingBalance', () => {
        it('should return array starting at loanAmount', () => {
            const result: number[] = calculator.calculateDataSeriesForRemainingBalance(loanAmount, interest, periodInMonths, []);

            expect(result[0]).to.be.eq(loanAmount);
        });

        it('should return array ending at 0', () => {
            const result: number[] = calculator.calculateDataSeriesForRemainingBalance(loanAmount, interest, periodInMonths, []);

            expect(result[result.length - 1]).to.be.eq(0);
        });
    });
});