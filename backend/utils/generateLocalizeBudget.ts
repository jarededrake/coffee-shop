import { faker } from '@faker-js/faker';

export default function generateLocalizedBudget() {
  const currencyData = faker.finance.currency(); 

  const budgetAmount = faker.finance.amount({ 
    min: 10, 
    max: 100, 
    dec: 2,                     
    symbol: currencyData.symbol 
  });

  return {
    currencyCode: currencyData.code,   
    formattedBudget: budgetAmount       
  };
}
