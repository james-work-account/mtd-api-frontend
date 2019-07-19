const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "Amend Dividends Income": {
    "header-url": "/{nino}/dividends/{taxYear}",
    "method": "PUT",
    "grouping": "DivInc",
    "headers": [
      "Authorization", "Content-Type", "Accept"
    ],
    "body": stripIndent(`
    {
      "ukDividends": 1000.99,
      "otherUkDividends": 2000.35
    }`)
  },
  "Retrieve Dividends Income": {
    "header-url": "/{nino}/dividends/{taxYear}",
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
