import prompts from 'prompts';

/**
 * @class ChocolateVendingMachine
 */
class ChocolateVendingMachine {
  constructor() {
    this.total = 0;
    this.chocolateBar = '';
  }

get denominations() {
    return {
      '10c': .10,
      '20c': .20,
      '50c': .50,
      '$1': 1,
      '$2': 2
    }
  }

  get chocolateBars() {
    return {
      caramel: 2.50,
      hazelnut: 3.10,
      organicRaw: 2.00,
    }
  }
}


(async () => {
  const { denominations, total } = new ChocolateVendingMachine();
  let amount = 0;
  let d = true;
 
  while (d) {
    const { coins } = await prompts([
      {
        type: 'text',
        name: 'coins',
        message: 'Please enter a valid amount (10c, 20c, 50c, $1, $2)',
        validate: (value) =>  denominations[value] ? denominations[value] : 'Invalid amount',
      },
    ]);
    const { confirmed } = await prompts([
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'Do you want to add more?'
    },
  ]);
   
    d = confirmed;
    amount = (Number(amount) + Number(denominations[coins])).toFixed(2);
  }

  const { chocolateBar } = await prompts([
    {
      type: 'select',
      name: 'chocolateBar',
      message: 'Select your favorite chocolate',
      choices: [
          { title: 'Caramel', description: '$2.50,', value: 'caramel' },
          { title: 'Hazelnut', description: '$3.10,', value: 'hazelnut' },
          { title: 'Organic Raw', description: '$2.00,', value: 'Organic Raw'},
      ]
    },
  ]);

  // const { denominations, coins } = new ChocolateVendingMachine();
  
  console.log(amount);

})();
