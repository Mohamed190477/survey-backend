import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Organizations from "./dbOrganizations.js";
import Cors from "cors";
import Parser from "json2csv";

// environment vairables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT;
const connection_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bm4sxph.mongodb.net/?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url);

// API endpoints
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/api/organization/create-organization", (req, res) => {
  const dbOrganization = req.body;
  Organizations.create(dbOrganization)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/api/organization/fetch-organizations", (req, res) => {
  Organizations.find({})
    .then((organizationData) => {
      let organizations = [];
      organizationData.forEach((organization) => {
        const {
          name,
          socialPage,
          type,
          establishmentYear,
          headQuarterInEgypt,
          headQuarterLocation,
          branchesLocation,
          operationStage,
          mainSector,
          employeesNumber,
          insuredEmployees,
          genderBalance,
          annualSalesRevenue,
          targetGrowthRate,
          serviceDescription,
          contactName,
          contactPosition,
          contactEmail,
          contactPhone,
          organizationLegalStructure,
          receivedFunding,
          fundingSource,
          fundingSeek,
          threeChallenges,
          anyPartnerships,
          mainCompetitors,
          customers,
          // location,
          // governmentalPoliciesRate,
          // legalChallenges,
          // legalChallengesNature,
          // taxationPoliciesImpact,
          // primaryOperationalChallenges,
          // energyCostsEffect,
          // operationalBottlenecks,
          // skilledLaborEffect,
          // investmentOpportunitiesRate,
          // financialManagementChallenges,
          // challengesFaced,
          // marketDemand,
          // marketChallenges,
          // scalingPotential,
          // marketExpansionStrategy,
          // technologyInnovationState,
          // primaryTechnologicalChallenges,
          // sustainabilityPractices,
          // neededSupport,
          // externalSupport,
          // partnershipsAdvancing,
          // keyAreasCollaboration,
          // challengesRankings,
          // necessaryActions,
          // organizationsCurrentRole,
          // policyChanges,
          // primaryStrengths,
          // sucessStory,
          // currentTrends,
          // shortTermGoals,
          // mediumTermGoals,
          // longTermGoals,
          // additionalInsights,
          // topicsNotCovered,
        } = organization;
        organizations.push({
          name,
          socialPage,
          type,
          establishmentYear,
          headQuarterInEgypt,
          headQuarterLocation,
          branchesLocation,
          operationStage,
          mainSector,
          employeesNumber,
          insuredEmployees,
          genderBalance,
          annualSalesRevenue,
          targetGrowthRate,
          serviceDescription,
          contactName,
          contactPosition,
          contactEmail,
          contactPhone,
          organizationLegalStructure,
          receivedFunding,
          fundingSource,
          fundingSeek,
          threeChallenges,
          anyPartnerships,
          mainCompetitors,
          customers,
          // location,
          // governmentalPoliciesRate,
          // legalChallenges,
          // legalChallengesNature,
          // taxationPoliciesImpact,
          // primaryOperationalChallenges,
          // energyCostsEffect,
          // operationalBottlenecks,
          // skilledLaborEffect,
          // investmentOpportunitiesRate,
          // financialManagementChallenges,
          // challengesFaced,
          // marketDemand,
          // marketChallenges,
          // scalingPotential,
          // marketExpansionStrategy,
          // technologyInnovationState,
          // primaryTechnologicalChallenges,
          // sustainabilityPractices,
          // neededSupport,
          // externalSupport,
          // partnershipsAdvancing,
          // keyAreasCollaboration,
          // challengesRankings,
          // necessaryActions,
          // organizationsCurrentRole,
          // policyChanges,
          // primaryStrengths,
          // sucessStory,
          // currentTrends,
          // shortTermGoals,
          // mediumTermGoals,
          // longTermGoals,
          // additionalInsights,
          // topicsNotCovered,
        });
      });

      const csvFields = [
        "name",
        "socialPage",
        "type",
        "establishmentYear",
        "headQuarterInEgypt",
        "headQuarterLocation",
        "branchesLocation",
        "operationStage",
        "mainSector",
        "employeesNumber",
        "insuredEmployees",
        "genderBalance",
        "annualSalesRevenue",
        "targetGrowthRate",
        "serviceDescription",
        "contactName",
        "contactPosition",
        "contactEmail",
        "contactPhone",
        "organizationLegalStructure",
        "receivedFunding",
        "fundingSource",
        "fundingSeek",
        "threeChallenges",
        "anyPartnerships",
        "mainCompetitors",
        "customers",
        // "location",
        // "governmentalPoliciesRate",
        // "legalChallenges",
        // "legalChallengesNature",
        // "taxationPoliciesImpact",
        // "primaryOperationalChallenges",
        // "energyCostsEffect",
        // "operationalBottlenecks",
        // "skilledLaborEffect",
        // "investmentOpportunitiesRate",
        // "financialManagementChallenges",
        // "challengesFaced",
        // "marketDemand",
        // "marketChallenges",
        // "scalingPotential",
        // "marketExpansionStrategy",
        // "technologyInnovationState",
        // "primaryTechnologicalChallenges",
        // "sustainabilityPractices",
        // "neededSupport",
        // "externalSupport",
        // "partnershipsAdvancing",
        // "keyAreasCollaboration",
        // "challengesRankings",
        // "necessaryActions",
        // "organizationsCurrentRole",
        // "policyChanges",
        // "primaryStrengths",
        // "sucessStory",
        // "currentTrends",
        // "shortTermGoals",
        // "mediumTermGoals",
        // "longTermGoals",
        // "additionalInsights",
        // "topicsNotCovered",
      ];

      const CsvParser = Parser.Parser;
      const csvParser = new CsvParser({ csvFields });

      const csvData = csvParser.parse(organizations);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=survey.csv");

      res.status(200).end(csvData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
