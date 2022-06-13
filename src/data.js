export const CHOCOLATES = {
  caramel: 2.50,
  hazelnut: 3.10,
  organicRaw: 2.0,
};

export const CHOCOLATE_TITLES = {
  organicRaw: 'Organic Raw',
  hazelnut: 'Hazelnut',
  caramel: 'Caramel',
};

export const DENOMINATIONS = {
  '10c': 0.10,
  '20c': 0.20,
  '50c': 0.50,
  '$1': 1,
  '$2': 2,
};

export const PROMPT_PROPERTIES = {
  coins: {
    type: 'text',
    name: 'amount',
    message: 'Please enter a valid amount (10c, 20c, 50c, $1, $2)',
    validate: (value) =>
      DENOMINATIONS[value]
        ? true
        : 'Invalid amount. Please choose one (10c, 20c, 50c, $1, $2)',
  },
  confirm: {
    type: 'confirm',
    name: 'confirmed',
    message: 'Do you want to add more coins?',
  },
  chocolates: {
    type: 'select',
    name: 'chocolate',
    message: 'Select your favorite chocolate',
    choices: [
      { title: 'Caramel', description: '$2.50,', value: 'caramel' },
      { title: 'Hazelnut', description: '$3.10,', value: 'hazelnut' },
      { title: 'Organic Raw', description: '$2.00,', value: 'organicRaw' },
    ],
  },
};
