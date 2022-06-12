import { DENOMINATIONS, PROMPT_PROPERTIES, CHOCOLATES } from './data.js';
import prompts from 'prompts';
import chalk from 'chalk';

/**
 * @class VendingMachine
 */
export class VendingMachine {
  constructor() {
    this._totalAmount = 0;
    this._chocolate = '';
  }

  /**
   * setter for total amount
   * @param {number} amount
   * @returns {number} calculated total amount
   */
  set totalAmount(amount) {
    this._totalAmount = (
      Number(this._totalAmount) + Number(DENOMINATIONS[amount])
    ).toFixed(2);
  }

  /**
   * getter for total amount
   */
  get totalAmount() {
    return this._totalAmount;
  }

  /**
   * setter for chocolate value
   * @param {string} value
   */
  set chocolate(value) {
    this._chocolate = value;
  }

  /**
   * getter for chocolate value
   * @returns {string}
   */
  get chocolate() {
    return this._chocolate;
  }

  /**
   * Display current balance in the console.
   */
  displayCurrentBalance() {
    console.log(
      chalk.cyanBright(
        `==================================
` +
          'current balance:            $' +
          this.totalAmount +
          `
==================================
      `
      )
    );
  }

  /**
   * exits the program if ESC is clicked.
   * @param {string} value 
   */
  exitVendingMachine(value) {
    if (!value) {
      console.log(chalk.redBright`Exiting Vending Machine...`);
      process.exit(1);
    }
  }

  /**
   * Prompt for entering the amount
   */
  async inputCoins() {
    const { coins, confirm } = PROMPT_PROPERTIES;
    const { amount } = await prompts(coins);

    this.exitVendingMachine(amount);
    this.totalAmount = amount;

    // 2.00 lowest value of the chocolates
    if (this.totalAmount < 2.0) {
      console.log(chalk.cyanBright`
==================================
Please enter more coins.`);
      this.displayCurrentBalance();

      await this.inputCoins();
    } else {
      this.displayCurrentBalance();
      const { confirmed } = await prompts(confirm);

      this.exitVendingMachine(confirmed === undefined ? false : true);

      if (confirmed) {
        await this.inputCoins();
      }
    }
  }

  /**
   * Prompt for selection of chocolates
   */
  async selectChocolates() {
    const { chocolates } = PROMPT_PROPERTIES;
    const { chocolate } = await prompts({
      ...chocolates,
      choices: chocolates.choices.map((choice) => {
        const { value } = choice;

        return {
          ...choice,
          disabled: CHOCOLATES[value] > Number(this.totalAmount) ? true : false,
        };
      }),
    });

    this.chocolate = chocolate;
  }

  displayReceipt() {
    const title = {
      organicRaw: 'Organic Raw',
      hazelnut: 'Hazelnut',
      caramel: 'Caramel',
    };
    const price = Number(CHOCOLATES[this.chocolate]).toFixed(2);

    if (this.totalAmount >= price) {
      console.log(
        chalk.greenBright(`
=============================================
-------- Chocolate Vending Machine ----------
---------------------------------------------
${title[this.chocolate]} - - - - - - - - - - - - - $${price}
---------------------------------------------
Cash: - - - - - - - - - - - - - - $${this.totalAmount}
=============================================
Change: - - - - - - - - - - - - - -  $${Number(
          this.totalAmount - price
        ).toFixed(2)}
=============================================
      `)
      );
    }
  }
}
