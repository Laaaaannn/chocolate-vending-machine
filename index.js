import chalk from 'chalk';
import { VendingMachine } from './src/VendingMachine.js';

(async () => {
  const ChocolateVendingMachine = new VendingMachine();

  console.log(chalk.yellowBright`
  ***************************************************************
  --------------  Chocolate Vending Machine ---------------------
  || Caramel  --------------------------------------->  $2.50 ||
  || Hazelnut  -------------------------------------->  $3.10 ||
  || Organic Raw ------------------------------------>  $2.00 ||
  ---------------------------------------------------------------
  ***************************************************************
  `);

  await ChocolateVendingMachine.inputCoins();

  console.log(
    chalk.cyanBright(
      `
==================================
` +
      'Current balance:           $' +
      ChocolateVendingMachine.totalAmount +
      `
==================================
      `
    )
  );

  await ChocolateVendingMachine.selectChocolates();

  ChocolateVendingMachine.displayReceipt();
})();
