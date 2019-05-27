module.exports = {
  "self-assessment": {
    "Trigger a tax calculation v1.0": {
      "header-url": "/{nino}/calculations",
      "method": "POST",
      "grouping": "TaxCalc",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve a tax calculation": {
      "header-url": "/{nino}/calculations/{calculationId}",
      "method": "GET",
      "grouping": "TaxCalc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve tax calculation messages": {
      "header-url": "/{nino}/calculations/{calculationId}/validation-messages",
      "method": "GET",
      "grouping": "TaxCalc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve EOPS Obligations": {
      "header-url": "/{nino}/uk-properties/end-of-period-statements/obligations?from={from}&to={to}",
      "method": "GET",
      "grouping": "PropertyEOPS",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Submit Property EOPS Declaration": {
      "header-url": "/{nino}/uk-properties/end-of-period-statements/from/{from}/to/{to}",
      "method": "POST",
      "grouping": "PropertyEOPS",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Submit Self Employment EOPS Declaration": {
      "header-url": "/{nino}/self-employments/{selfEmploymentId}/end-of-period-statements/from/{from}/to/{to}",
      "method": "POST",
      "grouping": "SEEOPS",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Amend Charitable Giving": {
      "header-url": "/{nino}/charitable-giving/{dateRange}",
      "method": "PUT",
      "grouping": "CharGiv",
      "headers": [
        "Authorization", "Content-Type", "Accept"
      ]
    },
    "Retrieve Charitable Giving": {
      "header-url": "/{nino}/charitable-giving/{dateRange}",
      "method": "GET",
      "grouping": "CharGiv",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Amend Dividends Income": {
      "header-url": "/{nino}/dividends/{dateRange}",
      "method": "PUT",
      "grouping": "DivInc",
      "headers": [
        "Authorization", "Content-Type", "Accept"
      ]
    },
    "Retrieve Dividends Income": {
      "header-url": "/{nino}/dividends/{dateRange}",
      "method": "GET",
      "grouping": "DivInc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Add a UK savings account": {
      "header-url": "/{nino}/savings-accounts",
      "method": "POST",
      "grouping": "SavAcc",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "List all UK savings accounts": {
      "header-url": "/{nino}/savings-accounts",
      "method": "GET",
      "grouping": "SavAcc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve a UK savings account": {
      "header-url": "/{nino}/savings-accounts/{accountId}",
      "method": "GET",
      "grouping": "SavAcc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Amend annual summary": {
      "header-url": "/{nino}/savings-accounts/{accountId}/{dateRange}",
      "method": "PUT",
      "grouping": "SavAcc",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve annual summary": {
      "header-url": "/{nino}/savings-accounts/{accountId}/{dateRange}",
      "method": "GET",
      "grouping": "SavAcc",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Intent to crystallise": {
      "header-url": "/{nino}/{dateRange}/intent-to-crystallise",
      "method": "POST",
      "grouping": "Cryst",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Crystallisation": {
      "header-url": "/{nino}/{dateRange}/crystallisation",
      "method": "POST",
      "grouping": "Cryst",
      "headers": [
        "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
      ]
    },
    "Retrieve a Crystallisation Obligations": {
      "header-url": "/{nino}/crystallisation/obligations?from={from}&to={to}",
      "method": "GET",
      "grouping": "Cryst",
      "headers": [
        "Authorization", "Accept", "Gov-Test-Scenario"
      ]
    }
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
