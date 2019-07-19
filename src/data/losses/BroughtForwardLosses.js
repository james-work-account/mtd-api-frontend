const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "List brought forward losses": {
    "header-url": "/{nino}/brought-forward-losses?taxYear={taxYear}&typeOfLoss={typeOfLoss}&selfEmploymentId={selfEmploymentId}",
    "method": "GET",
    "grouping": "BFLoss",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SELF_EMPLOYMENT", "UK_FHL_PROPERTY", "UK_NON_FHL_PROPERTY", "NOT_FOUND"
    ]
  },
  "Create a brought forward loss": {
    "header-url": "/{nino}/brought-forward-losses",
    "method": "POST",
    "grouping": "BFLoss",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SELF_EMPLOYMENT", "UK_FHL_PROPERTY", "UK_NON_FHL_PROPERTY", "NOT_FOUND"
    ],
    "body": stripIndent(`
    {
      "typeOfLoss":"self-employment-class4",
      "selfEmploymentId": "XGIS00000001319",
      "lossAmount": 12345.67,
      "taxYear": "2018-19"
    }`)
  },
  "Retrieve a brought forward loss": {
    "header-url": "/{nino}/brought-forward-losses/{lossId}",
    "method": "GET",
    "grouping": "BFLoss",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SELF_EMPLOYMENT", "CLASS_4", "UK_FHL_PROPERTY", "UK_NON_FHL_PROPERTY", "NOT_FOUND"
    ]
  },
  "Delete a brought forward loss": {
    "header-url": "/{nino}/brought-forward-losses/{lossId}",
    "method": "DELETE",
    "grouping": "BFLoss",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "DELETE_AFTER_CRYSTALLISATION", "NOT_FOUND"
    ]
  },
  "Amend a brought forward loss": {
    "header-url": "/{nino}/brought-forward-losses/{lossId}/change-loss-amount",
    "method": "POST",
    "grouping": "BFLoss",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ],
    "body": stripIndent(`
    {
      "lossAmount": 12345.67
    }`)
  }
}
