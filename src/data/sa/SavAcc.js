module.exports = {
  "Add a UK savings account": {
    "header-url": "/{nino}/savings-accounts",
    "method": "POST",
    "grouping": "SavAcc",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "MAX_ACCOUNTS_LIMIT", "DUPLICATE_ACCOUNT_NAME"
    ]
  },
  "List all UK savings accounts": {
    "header-url": "/{nino}/savings-accounts",
    "method": "GET",
    "grouping": "SavAcc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SAVINGS_ACCOUNTS_LARGE", "NOT_FOUND"
    ]
  },
  "Retrieve a UK savings account": {
    "header-url": "/{nino}/savings-accounts/{accountId}",
    "method": "GET",
    "grouping": "SavAcc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ]
  },
  "Amend annual summary": {
    "header-url": "/{nino}/savings-accounts/{accountId}/{dateRange}",
    "method": "PUT",
    "grouping": "SavAcc",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ]
  },
  "Retrieve annual summary": {
    "header-url": "/{nino}/savings-accounts/{accountId}/{dateRange}",
    "method": "GET",
    "grouping": "SavAcc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "ONLY_TAXED_UK_INTEREST", "ONLY_UNTAXED_UK_INTEREST", "REMOVED_VALUES_EXAMPLE_1", "REMOVED_VALUES_EXAMPLE_2", "NOT_FOUND"
    ]
  }
}
