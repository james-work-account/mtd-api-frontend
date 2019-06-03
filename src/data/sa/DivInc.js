module.exports = {
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
    ],
    "scenarios": [
      "ONLY_UK", "ONLY_OTHER", "MATCHING_RESOURCE_NOT_FOUND"
    ]
  }
}
