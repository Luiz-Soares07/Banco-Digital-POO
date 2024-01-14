module.exports = class Deposit {
  constructor(value) {
    this.value = value;
    this.createDt = new Date();
  }
};
