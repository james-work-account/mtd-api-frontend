module.exports = {
  "Intent to crystallise": {
    "header-url": "/{nino}/{dateRange}/intent-to-crystallise",
    "method": "POST",
    "grouping": "Cryst",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NO_SUBMISSIONS_EXIST", "FINAL_DECLARATION_RECEIVED"
    ]
  },
  "Crystallisation": {
    "header-url": "/{nino}/{dateRange}/crystallisation",
    "method": "POST",
    "grouping": "Cryst",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND", "INCOME_SOURCES_CHANGED", "RECENT_SUBMISSIONS_EXIST", "RESIDENCY_CHANGED", "FINAL_DECLARATION_RECEIVED"
    ]
  },
  "Retrieve a Crystallisation Obligations [test only]": {
    "header-url": "/{nino}/crystallisation/obligations?from={from}&to={to}",
    "method": "GET",
    "grouping": "Cryst",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "OBLIGATION_OPEN", "OBLIGATION_FULFILLED", "NOT_FOUND"
    ]
  }
}
