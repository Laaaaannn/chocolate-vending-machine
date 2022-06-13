import chalk from 'chalk';
import prompts from 'prompts';
import { DENOMINATIONS, PROMPT_PROPERTIES, CHOCOLATES } from './data.js';
import { killProcess, displayCurrentBalance } from './utilities.js';

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
   * Prompt for entering the amount
   */
  async promptInputCoins() {
    const { coins, confirm } = PROMPT_PROPERTIES;
    const { amount } = await prompts(coins);

    killProcess(amount);

    this.totalAmount = amount;
    console.log(displayCurrentBalance(this.totalAmount));

    if (this.totalAmount < 2.00) {
      console.log(chalk.cyanBright`  ------- Please input more coins --------
      `);
      
      await this.promptInputCoins();
    } else {
      const { confirmed } = await prompts(confirm);

      killProcess(confirmed === undefined ? false : true);

      if (confirmed) {
        await this.promptInputCoins();
      }
    }
  }

  /**
   * Prompt for selection of chocolates
   */
  async promptSelectChocolates() {
    const { chocolate } = await prompts(this.chocolateProperty);

    killProcess(chocolate);

    this.chocolate = chocolate;
  }

  get chocolateProperty() {
    const { chocolates } = PROMPT_PROPERTIES;

    return {
      ...chocolates,
      choices: chocolates.choices.map((choice) => {
        const { value } = choice;

        return {
          ...choice,
          disabled: CHOCOLATES[value] > Number(this.totalAmount) ? true : false,
        };
      }),
    }
  }
}
