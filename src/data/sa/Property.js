module.exports = {
  "Retrieve EOPS Obligations": {
    "header-url": "/{nino}/uk-properties/end-of-period-statements/obligations?from={from}&to={to}",
    "method": "GET",
    "grouping": "PropertyEOPS",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NONE_MET", "ALL_MET", "AGENT_NOT_SUBSCRIBED", "AGENT_NOT_AUTHORIZED", "CLIENT_NOT_SUBSCRIBED"
    ]
  },
  "Submit Property EOPS Declaration": {
    "header-url": "/{nino}/uk-properties/end-of-period-statements/from/{from}/to/{to}",
    "method": "POST",
    "grouping": "PropertyEOPS",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND", "RULE_ALREADY_SUBMITTED", "RULE_EARLY_SUBMISSION", "RULE_LATE_SUBMISSION", "RULE_MISMATCH_START_DATE", "RULE_MISMATCH_END_DATE",
      "RULE_CLASS4_OVER_16", "RULE_CLASS4_PENSION_AGE", "RULE_CONSOLIDATED_EXPENSES", "RULE_FHL_PRIVATE_USE_ADJUSTMENT", "RULE_NON_FHL_PRIVATE_USE_ADJUSTMENT",
      "MULTIPLE_ERRORS", "MULTIPLE_BUSINESS_ERRORS"
    ]
  }
}
