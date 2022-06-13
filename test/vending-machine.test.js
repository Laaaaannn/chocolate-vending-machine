import assert from 'assert';
import prompts from 'prompts';
import { expect } from 'chai';
import { DENOMINATIONS, PROMPT_PROPERTIES } from '../src/data.js';
import { VendingMachine } from '../src/VendingMachine.js';
import { displayCurrentBalance, displayMenu, displayReceipt } from '../src/utilities.js';

describe('Chocolate Vending Machine', () => {
  const properties = PROMPT_PROPERTIES.coins;

  it('should display the menu', () => {
    expect(displayMenu).to.contains('Caramel');
    expect(displayMenu).to.contains('Hazelnut');
    expect(displayMenu).to.contains('Organic Raw');
    expect(displayMenu).to.contains('$2.50');
    expect(displayMenu).to.contains('$3.10');
    expect(displayMenu).to.contains('$2.00');
  })

  it('should display the formatted current balance', () => {
    const currentBalance = displayCurrentBalance(10);

    expect(currentBalance).contains('$10.00');
  })

  it('should display the receipt', () => {
    const receipt = displayReceipt({
      totalAmount: 5.00,
      price: 2,
      change: 3,
      chocolate: 'organicRaw',
    })

    expect(receipt).contains('Organic Raw');
    expect(receipt).contains('Chocolate Vending Machine');
  });

  Object.keys(DENOMINATIONS).forEach(denomination => {
    it(`should accept ${denomination} amount`, async () => {
      prompts.inject([denomination]);

      const { amount } = await prompts(properties);

      assert.equal(true, properties.validate(amount));
    });
  });

  it('should not accept invalid currency or amount',async () => {
    const invalidAmountText = 'Invalid amount. Please choose one (10c, 20c, 50c, $1, $2)';
    const invalidInputs = ['5c', '321', 'abc'];

    invalidInputs.forEach(input => {
      expect(properties.validate(input)).to.contain(invalidAmountText)
    })
  });

  it('should disable the choices if totalAmount less than to its value', async () => {
    const vendingClassTest = new VendingMachine();

    vendingClassTest.totalAmount = '$2';

    expect(vendingClassTest.chocolateProperty.choices[0].disabled).to.be.true
    expect(vendingClassTest.chocolateProperty.choices[1].disabled).to.be.true
    expect(vendingClassTest.chocolateProperty.choices[2].disabled).to.be.false
  });

  it('should set & format the totalAmount if setter is triggered' , () => {
    const vendingClassTest = new VendingMachine();

    vendingClassTest.totalAmount = '$2';

    expect(vendingClassTest.totalAmount).to.be.eq('2.00');
  })

  it('should get the totalAmount value if getter is triggered' , () => {
    const vendingClassTest = new VendingMachine();

    vendingClassTest.totalAmount = '$2';

    expect(vendingClassTest.totalAmount).to.be.eq('2.00');
  });
});
