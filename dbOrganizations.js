import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
  name: String,
  socialPage: String,
  type: String,
  establishmentYear: String,
  headQuarterInEgypt: String,
  headQuarterLocation: String,
  branchesLocation: String,
  operationStage: String,
  mainSector: String,
  employeesNumber: Number,
  insuredEmployees: String,
  genderBalance: String,
  annualSalesRevenue: Number,
  targetGrowthRate: Number,
  serviceDescription: String,
  contactName: String,
  contactPosition: String,
  contactEmail: String,
  contactPhone: String,
  organizationLegalStructure: String,
  receivedFunding: String,
  fundingSource: String,
  fundingSeek: String,
  threeChallenges: String,
  anyPartnerships: String,
  mainCompetitors: String,
  customers: String,
  // location: String,
  // governmentalPoliciesRate: String,
  // legalChallenges: String,
  // legalChallengesNature: String,
  // taxationPoliciesImpact: String,
  // primaryOperationalChallenges: [String],
  // energyCostsEffect: String,
  // operationalBottlenecks: String,
  // skilledLaborEffect: String,
  // investmentOpportunitiesRate: String,
  // financialManagementChallenges: [String],
  // challengesFaced: String,
  // marketDemand: String,
  // marketChallenges: [String],
  // scalingPotential: String,
  // marketExpansionStrategy: String,
  // technologyInnovationState: String,
  // primaryTechnologicalChallenges: [String],
  // sustainabilityPractices: String,
  // neededSupport: String,
  // externalSupport: String,
  // partnershipsAdvancing: String,
  // keyAreasCollaboration: [String],
  // challengesRankings: [String],
  // necessaryActions: String,
  // organizationsCurrentRole: String,
  // policyChanges: String,
  // primaryStrengths: [String],
  // sucessStory: String,
  // currentTrends: String,
  // shortTermGoals: String,
  // mediumTermGoals: String,
  // longTermGoals: String,
  // additionalInsights: String,
  // topicsNotCovered: String,
});

export default mongoose.model("organizations", organizationSchema);
