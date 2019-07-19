const selfAssessment = {
  TaxCalc: require('./sa/TaxCalc'),
  SelfEmployment: require('./sa/SelfEmployment'),
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

const losses = {
  BroughtForwardLosses: require('./losses/BroughtForwardLosses'),
  LossClaims: require('./losses/LossClaims')
}

module.exports = {

  "self-assessment": {
    ...selfAssessment.TaxCalc,
    ...selfAssessment.SelfEmployment,
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
  },
  "losses": {
    ...losses.BroughtForwardLosses,
    ...losses.LossClaims
  }
}
