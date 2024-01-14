const Deposit = require("./Deposit.js");
const Transfer = require("./Transfer.js");
const User = require("./User.js");
const Loan = require("./Loan.js");

module.exports = class App {
  static #userApp = [];

  static findUser(email) {
    const user = this.#userApp.find((user) => user.email === email);
    return user ?? null;
  }

  static createNewUser(email, fullName) {
    const userExists = App.findUser(email);
    if (!userExists) {
      this.#userApp.push(new User(email, fullName));
    }
  }

  static deposit(email, value) {
    const user = App.findUser(email);
    if (user) {
      const newDeposit = new Deposit(value);
      user.account.addDeposit(newDeposit);
    }
  }

  static transfer(fromUserEmail, toUserEmail, value) {
    const fromUser = App.findUser(fromUserEmail);
    const toUser = App.findUser(toUserEmail);
    if (fromUser && toUser) {
      const newTransfer = new Transfer(fromUser, toUser, value);
      fromUser.account.addTransfer(newTransfer);
      toUser.account.addTransfer(newTransfer);
    }
  }

  static takeLoan(email, value, numberOfInstallments) {
    const user = App.findUser(email);
    if (user) {
      const newLoan = new Loan(value, numberOfInstallments);
      user.account.addLoan(newLoan);
    }
  }

  static changeLoanFee(newFeePercent) {
    Loan.fee = newFeePercent;
  }
};
