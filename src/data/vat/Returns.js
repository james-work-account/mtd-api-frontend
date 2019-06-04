const stripIndent = require('common-tags/lib/stripIndent')

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
    ],
    "body": stripIndent(`
    {
      "periodKey": "A332",
      "vatDueSales": 105.50,
      "vatDueAcquisitions": -100.45,
      "totalVatDue": 5.05,
      "vatReclaimedCurrPeriod": 105.15,
      "netVatDue": 100.10,
      "totalValueSalesExVAT": 300,
      "totalValuePurchasesExVAT": 300,
      "totalValueGoodsSuppliedExVAT": 3000,
      "totalAcquisitionsExVAT": 3000,
      "finalised": true
    }`)
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
