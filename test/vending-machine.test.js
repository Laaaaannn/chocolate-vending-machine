import assert from 'assert';
import prompts from 'prompts';
import { DENOMINATIONS, PROMPT_PROPERTIES } from '../src/data.js';

describe('Array', function () {
  it('should test',async () => {
    prompts.inject([ '20c']);

    const { amount } = await prompts(PROMPT_PROPERTIES['coins']);
    
    assert.equal(true, PROMPT_PROPERTIES['coins'].validate(amount));
  })
});


describe('Chocolate Vending Machine', () => {
  Object.keys(DENOMINATIONS).forEach(denomination => {
    const property = PROMPT_PROPERTIES['coins'];

    it(`it should accept ${denomination} value`, () => {
      prompts.inject([denomination]);

      const { amount } = await prompts(property); 

      assert.deepEqual(true, property.validate(amount));
    });
  });
});