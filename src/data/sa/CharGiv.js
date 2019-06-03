module.exports = {
  "Amend Charitable Giving": {
    "header-url": "/{nino}/charitable-giving/{dateRange}",
    "method": "PUT",
    "grouping": "CharGiv",
    "headers": [
      "Authorization", "Content-Type", "Accept"
    ]
  },
  "Retrieve Charitable Giving": {
    "header-url": "/{nino}/charitable-giving/{dateRange}",
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
