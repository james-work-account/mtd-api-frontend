module.exports = {
  "Submit VAT Return": {
    "header-url": "/{vrn}/returns",
    "method": "POST",
    "grouping": "Retu",
    "headers": [
      "Authorization", "Content-Type", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "INVALID_VRN", "INVALID_PERIODKEY", "INVALID_PAYLOAD", "DUPLICATE_SUBMISSION", "TAX_PERIOD_NOT_ENDED"
    ]
  },
  "View VAT Return": {
    "header-url": "/{vrn}/returns/{periodKey}",
    "method": "GET",
    "grouping": "Retu",
    "headers": [
      "Authorization", "Accept", "Gov-Test-Scenario"
    ],
    "scenarios": [
      "DATE_RANGE_TOO_LARGE"
    ]
  }
}
