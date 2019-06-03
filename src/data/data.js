const selfAssessment = {
  TaxCalc: require('./sa/TaxCalc'),
  EOPS: require('./sa/EOPS'),
  Property: require('./sa/Property'),
  CharGiv: require('./sa/CharGiv'),
  DivInc: require('./sa/DivInc'),
  SavAcc: require('./sa/SavAcc'),
  Cryst: require('./sa/Cryst')
}

const vat = {
  Obligations: require('./vat/Obligations'),
  Returns: require('./vat/Returns'),
  PaymentsAndLiabilities: require('./vat/PaymentsAndLiabilities')
}

module.exports = {

  "self-assessment": {
    ...selfAssessment.TaxCalc,
    ...selfAssessment.EOPS,
    ...selfAssessment.Property,
    ...selfAssessment.CharGiv,
    ...selfAssessment.DivInc,
    ...selfAssessment.SavAcc,
    ...selfAssessment.Cryst
  },
  "vat": {
    ...vat.Obligations,
    ...vat.Returns,
    ...vat.PaymentsAndLiabilities
  }
}
