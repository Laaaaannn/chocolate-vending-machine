import chalk from 'chalk';
import { CHOCOLATE_TITLES } from './data.js';

/**
 * Display the menu
 * @returns {string}
 */
export const displayMenu = chalk.yellowBright`
***************************************************************
--------------  Chocolate Vending Machine ---------------------
|| Caramel  --------------------------------------->  $2.50 ||
|| Hazelnut  -------------------------------------->  $3.10 ||
|| Organic Raw ------------------------------------>  $2.00 ||
---------------------------------------------------------------
***************************************************************
`;

/**
 * Display current balance
 * @param {number} amount 
 * @returns {string}
 */
export const displayCurrentBalance = (amount = 0) => {
  return chalk.cyanBright(
`  ========================================
  Current balance: ----------- $${Number(amount).toFixed(2)}
  ========================================`
  );
};

/**
 * Kill process 
 * @param {boolean} escKeyTriggered 
 */
export const killProcess = (escKeyTriggered) => {
  if (!escKeyTriggered) {
    console.log(chalk.redBright`Exiting Vending Machine...`);
    process.exit(1);
  }
}

/**
 * Display the receipt
 * @param {Object} param 
 * @returns 
 */
export const displayReceipt = ({ price, totalAmount, change, chocolate}) => {
  return chalk.greenBright(`
  =============================================
  -------- Chocolate Vending Machine ----------
  ---------------------------------------------
  ${CHOCOLATE_TITLES[chocolate]} - - - - - - - - - - - - - $${price}
  ---------------------------------------------
  Cash: - - - - - - - - - - - - - - - $${totalAmount}
  =============================================
  Change: - - - - - - - - - - - - - -  $${Number(
            change
          ).toFixed(2)}
  =============================================
        `)
}