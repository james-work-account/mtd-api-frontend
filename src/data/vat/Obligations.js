module.exports = {
  "Retrieve VAT Obligations": {
    "header-url": "/{vrn}/obligations?from={from}&to={to}",
    "method": "GET",
    "grouping": "Obli",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "QUARTERLY_NONE_MET", "QUARTERLY_ONE_MET", "QUARTERLY_TWO_MET", "QUARTERLY_THREE_MET", "QUARTERLY_FOUR_MET", "MONTHLY_NONE_MET",
      "MONTHLY_ONE_MET", "MONTHLY_TWO_MET", "MONTHLY_THREE_MET", "MONTHLY_OBS_##_OPEN", "MONTHLY_OBS_12_FULFILLED", "QUARTERLY_OBS_##_OPEN",
      "QUARTERLY_OBS_04_FULFILLED", "MULTIPLE_OPEN_MONTHLY", "MULTIPLE_OPEN_QUARTERLY", "OBS_SPANS_MULTIPLE_YEARS", "NOT_FOUND"
    ]
  }
}
