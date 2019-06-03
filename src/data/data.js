const TaxCalc = require('./sa/TaxCalc')
const EOPS = require('./sa/EOPS')
const CharGiv = require('./sa/CharGiv')
const DivInc = require('./sa/DivInc')
const SavAcc = require('./sa/SavAcc')
const Cryst = require('./sa/Cryst')

module.exports = {

  "self-assessment": {
    ...TaxCalc,
    ...EOPS,
    ...CharGiv,
    ...DivInc,
    ...SavAcc,
    ...Cryst
  },
  "vat": {
    "Retrieve VAT Obligations": {
      "header-url": "/{vrn}/obligations?from={from}&to={to}",
      "method": "GET",
      "grouping": "Obli",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Submit VAT Return": {
      "header-url": "/{vrn}/returns",
      "method": "POST",
      "grouping": "Retu",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "View VAT Return": {
      "header-url": "/{vrn}/returns/{periodKey}",
      "method": "GET",
      "grouping": "Retu",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve VAT payments": {
      "header-url": "/{vrn}/payments?from={from}&to={to}",
      "method": "GET",
      "grouping": "PayLi",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve VAT liabilities": {
      "header-url": "/{vrn}/liabilities?from={from}&to={to}",
      "method": "GET",
      "grouping": "PayLi",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    }
  }
}
