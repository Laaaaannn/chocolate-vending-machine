import { VendingMachine } from './src/VendingMachine.js';
import { displayMenu, displayCurrentBalance,displayReceipt } from './src/utilities.js'
import { CHOCOLATES } from './src/data.js'

(async () => {
  const ChocolateVendingMachine = new VendingMachine();

  console.log(displayMenu);

  await ChocolateVendingMachine.promptInputCoins();

  console.log(displayCurrentBalance(ChocolateVendingMachine.totalAmount));

  await ChocolateVendingMachine.promptSelectChocolates();

  const chocolate = ChocolateVendingMachine.chocolate;
  const price = Number(CHOCOLATES[chocolate]).toFixed(2);
  const totalAmount = ChocolateVendingMachine.totalAmount;
  const change = totalAmount - price;

  console.log(displayReceipt({
    totalAmount,
    price,
    change,
    chocolate,
  }));
})();
