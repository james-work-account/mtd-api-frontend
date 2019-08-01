const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "Trigger a tax calculation v1.0": {
    "header-url": "/{nino}/calculations",
    "method": "POST",
    "grouping": "TaxCalc",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "AGENT_NOT_SUBSCRIBED", "AGENT_NOT_AUTHORIZED", "CLIENT_NOT_SUBSCRIBED"
    ],
    "body": stripIndent(`
    {
      "taxYear": "2017-18"
    }`)
  },
  "Retrieve a tax calculation": {
    "header-url": "/{nino}/calculations/{calculationId}",
    "method": "GET",
    "grouping": "TaxCalc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SELF_EMPLOYMENT", "ALL_FIELDS_TEST_ONLY", "ERRORS_AND_WARNINGS", "RESPONSE_BEING_PREPARED", "NOT_FOUND"
    ]
  },
  "Retrieve tax calculation messages": {
    "header-url": "/{nino}/calculations/{calculationId}/validation-messages",
    "method": "GET",
    "grouping": "TaxCalc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "ERRORS_AND_WARNINGS", "WARNINGS_ONLY", "ERRORS_ONLY", "NO_MESSAGES", "NOT_FOUND"
    ]
  },
  "test api": {
    "header-url": "/{nino}/{goat}",
    "method": "GET",
    "grouping": "TaxCalc",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SELF_EMPLOYMENT", "ALL_FIELDS_TEST_ONLY", "ERRORS_AND_WARNINGS", "RESPONSE_BEING_PREPARED", "NOT_FOUND"
    ]
  }
}
