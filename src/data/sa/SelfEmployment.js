const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "Submit Self Employment EOPS Declaration": {
    "header-url": "/{nino}/self-employments/{selfEmploymentId}/end-of-period-statements/from/{from}/to/{to}",
    "method": "POST",
    "grouping": "SelfEmp",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND", "RULE_ALREADY_SUBMITTED", "RULE_EARLY_SUBMISSION", "RULE_LATE_SUBMISSION", "RULE_MISMATCH_START_DATE", "RULE_MISMATCH_END_DATE",
      "RULE_CLASS4_OVER_16", "RULE_CLASS4_PENSION_AGE", "RULE_CONSOLIDATED_EXPENSES", "MULTIPLE_ERRORS", "MULTIPLE_BUSINESS_ERRORS"
    ],
    "body": stripIndent(`
    {
      "finalised": true
    }`)
  }
}
