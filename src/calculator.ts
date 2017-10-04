export class Calculator {

    public calculateMonthlyPayment(principal: number, interest: number, period: number) {
        const interestInterval = 12;

        interest = interest / 100;

        const i = interest / interestInterval;
        const n = interestInterval * period;
        
        const a = i * Math.pow(1 + i, n);
        const b = Math.pow(1 + i, n) - 1;
        
        const amount = principal * a / b;

        return amount;
    }
}