const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "List loss claims": {
    "header-url": "/{nino}/loss-claims?taxYear={taxYear}&typeOfLoss={typeOfLoss}&selfEmploymentId={selfEmploymentId}",
    "method": "GET",
    "grouping": "LossClaims",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ]
  },
  "Create a loss claim": {
    "header-url": "/{nino}/loss-claims",
    "method": "POST",
    "grouping": "LossClaims",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "DUPLICATE", "NOT_FOUND"
    ],
    "body": stripIndent(`
    {
      "typeOfLoss":"self-employment",
      "selfEmploymentId": "XGIS00000001319",
      "typeOfClaim": "carry-forward",
      "taxYear": "2019-20"
    }`)
  },
  "Retrieve a loss claim": {
    "header-url": "/{nino}/loss-claims/{claimId}",
    "method": "GET",
    "grouping": "LossClaims",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "SE_FORWARD", "SE_SIDEWAYS", "NONFHL_FORWARD", "NONFHL_SIDEWAYS", "NONFHL_SIDEWAYS_FHL", "NONFHL_FORWARD_TO_SIDEWAYS", "NOT_FOUND"
    ]
  },
  "Delete a loss claim": {
    "header-url": "/{nino}/brought-forward-losses/{claimId}",
    "method": "DELETE",
    "grouping": "LossClaims",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ]
  },
  "Amend a loss claim": {
    "header-url": "/{nino}/loss-claims/{claimId}/change-claim-type",
    "method": "POST",
    "grouping": "LossClaims",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "NOT_FOUND"
    ],
    "body": stripIndent(`
    {
      "typeOfClaim": "carry-forward"
    }`)
  }
}
