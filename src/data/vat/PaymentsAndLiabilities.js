module.exports = {
  "Retrieve VAT payments": {
    "header-url": "/{vrn}/payments?from={from}&to={to}",
    "method": "GET",
    "grouping": "PayLi",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SINGLE_PAYMENT", "MULTIPLE_PAYMENTS", "SINGLE_PAYMENT_2018_19", "MULTIPLE_PAYMENTS_2018_19"
    ]
  },
  "Retrieve VAT liabilities": {
    "header-url": "/{vrn}/liabilities?from={from}&to={to}",
    "method": "GET",
    "grouping": "PayLi",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SINGLE_LIABILITY", "MULTIPLE_LIABILITIES", "SINGLE_LIABILITY_2018_19", "MULTIPLE_LIABILITIES_2018_19"
    ]
  }
}
