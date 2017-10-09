(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BondRepaymentVisualizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculator {
    calculateMonthlyPayment(amount, interest, periodInMonths) {
        const interval = 12;
        return (interest / interval) * amount / (1 - Math.pow(1 + (interest / interval), -1 * periodInMonths));
    }
    calculateRemainingBalance(amount, interest, numberOfPayments, paymentAmount) {
        const interval = 12;
        return (amount * Math.pow(1 + (interest / interval), numberOfPayments)) - (paymentAmount / (interest / interval)) * (Math.pow(1 + (interest / interval), numberOfPayments) - 1);
    }
    calculateDataSeriesForTotalMonthlyPayment(amount, interest, periodInMonths, addtionalPayments) {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 2);
    }
    calculateDataSeriesForRemainingBalance(amount, interest, periodInMonths, addtionalPayments) {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 1);
    }
    calculateDataSeriesForPaymentAmount(amount, interest, periodInMonths, addtionalPayments) {
        return this.calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, 3);
    }
    calculateDataSeriesForRemainingBalanceOrTotalPaymentAmountOrPaymentAmount(amount, interest, periodInMonths, addtionalPayments, type) {
        let paymentAmount = this.calculateMonthlyPayment(amount, interest, periodInMonths);
        let month = 1;
        let remainingBalance = this.calculateRemainingBalance(amount, interest, 0, paymentAmount);
        let totalPaymentAmount = 0;
        const dataRemainingBalance = [remainingBalance];
        const dataTotalPaymentAmount = [0];
        const dataPaymentAmount = [paymentAmount];
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
exports.Calculator = Calculator;

},{}]},{},[1])(1)
});