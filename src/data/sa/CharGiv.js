const stripIndent = require('common-tags/lib/stripIndent')

module.exports = {
  "Amend Charitable Giving": {
    "header-url": "/{nino}/charitable-giving/{dateRange}",
    "method": "PUT",
    "grouping": "CharGiv",
    "headers": [
      "Authorization", "Content-Type", "Accept"
    ],
    "body": stripIndent(`
    {
      "giftAidPayments": {
        "specifiedYear": 10000.01,
        "oneOffSpecifiedYear": 1000.5,
        "specifiedYearTreatedAsPreviousYear": 300.65,
        "followingYearTreatedAsSpecifiedYear": 400.00,
        "nonUKCharities": 2000.10,
        "nonUKCharityNames": [
          "International Charity A",
          "International Charity B"
        ]
      },
      "gifts": {
        "landAndBuildings": 700,
        "sharesOrSecurities": 600.99,
        "investmentsNonUKCharities": 300.6,
        "investmentsNonUKCharityNames": [
          "International Charity C",
          "International Charity D"
        ]
      }
    }`)
  },
  "Retrieve Charitable Giving": {
    "header-url": "/{nino}/charitable-giving/{taxYear}",
    "method": "GET",
    "grouping": "CharGiv",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "WITHOUT_NON_UK_CHARITIES", "ZERO_NON_UK_CHARITIES", "ONLY_GIFT_AID_PAYMENTS", "ONLY_GIFTS", "REMOVED_VALUES_EXAMPLE_1", "REMOVED_VALUES_EXAMPLE_2",
      "MATCHING_RESOURCE_NOT_FOUND"
    ]
  }
}
