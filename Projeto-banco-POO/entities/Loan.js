const Installment = require("./Installment.js");

module.exports = class Loan {
  static #fee = 1.05;
  constructor(value, installments) {
    this.value = value;
    this.createDt = new Date();
    this.installments = [];
    for (let i = 1; i <= installments; i++) {
      this.installments.push(
        new Installment((value * Loan.#fee) / installments, i)
      );
    }
  }

  static get fee() {
    return Loan.#fee;
  }

  static set fee(newFeePercent) {
    Loan.#fee = 1 + newFeePercent / 100;
  }
};
