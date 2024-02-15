import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Organizations from "./dbOrganizations.js";
import Cors from "cors";
import Parser from "json2csv";
import ExcelJS from "exceljs";

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
    .then(async (organizationData) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Survey Data");

      worksheet.columns = [
        { header: "Name", key: "name", width: 50 },
        { header: "Social Page", key: "socialPage", width: 50 },
        { header: "Type", key: "type", width: 50 },
        { header: "Establishment Year", key: "establishmentYear", width: 50 },
        {
          header: "Head Quarter In Egypt",
          key: "headQuarterInEgypt",
          width: 50,
        },
        {
          header: "Head Quarter Location",
          key: "headQuarterLocation",
          width: 50,
        },
        { header: "Branches Location", key: "branchesLocation", width: 50 },
        { header: "Operation Stage", key: "operationStage", width: 50 },
        { header: "Main Sector", key: "mainSector", width: 50 },
        { header: "Employees Number", key: "employeesNumber", width: 50 },
        { header: "Insured Employees", key: "insuredEmployees", width: 50 },
        { header: "Gender Balance", key: "genderBalance", width: 50 },
        {
          header: "Annual Sales Revenue",
          key: "annualSalesRevenue",
          width: 50,
        },
        { header: "Target Growth Rate", key: "targetGrowthRate", width: 50 },
        { header: "Service Description", key: "serviceDescription", width: 50 },
        { header: "Contact Name", key: "contactName", width: 50 },
        { header: "Contact Position", key: "contactPosition", width: 50 },
        { header: "Contact Email", key: "contactEmail", width: 50 },
        { header: "Contact Phone", key: "contactPhone", width: 50 },
        {
          header: "Organization Legal Structure",
          key: "organizationLegalStructure",
          width: 50,
        },
        { header: "Received Funding", key: "receivedFunding", width: 50 },
        { header: "Funding Source", key: "fundingSource", width: 50 },
        { header: "Funding Seek", key: "fundingSeek", width: 50 },
        { header: "Three Challenges", key: "threeChallenges", width: 50 },
        { header: "Any Partnerships", key: "anyPartnerships", width: 50 },
        { header: "Main Competitors", key: "mainCompetitors", width: 50 },
        { header: "Customers", key: "customers", width: 50 },
      ];

      organizationData.forEach((organization) => {
        worksheet.addRow(organization);
      });

      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=survey.xlsx");

      await workbook.xlsx.write(res);

      res.status(200).end();
      // let organizations = [];
      // organizationData.forEach((organization) => {
      //   const {
      //     name,
      //     socialPage,
      //     type,
      //     establishmentYear,
      //     headQuarterInEgypt,
      //     headQuarterLocation,
      //     branchesLocation,
      //     operationStage,
      //     mainSector,
      //     employeesNumber,
      //     insuredEmployees,
      //     genderBalance,
      //     annualSalesRevenue,
      //     targetGrowthRate,
      //     serviceDescription,
      //     contactName,
      //     contactPosition,
      //     contactEmail,
      //     contactPhone,
      //     organizationLegalStructure,
      //     receivedFunding,
      //     fundingSource,
      //     fundingSeek,
      //     threeChallenges,
      //     anyPartnerships,
      //     mainCompetitors,
      //     customers,
      //     // location,
      //     // governmentalPoliciesRate,
      //     // legalChallenges,
      //     // legalChallengesNature,
      //     // taxationPoliciesImpact,
      //     // primaryOperationalChallenges,
      //     // energyCostsEffect,
      //     // operationalBottlenecks,
      //     // skilledLaborEffect,
      //     // investmentOpportunitiesRate,
      //     // financialManagementChallenges,
      //     // challengesFaced,
      //     // marketDemand,
      //     // marketChallenges,
      //     // scalingPotential,
      //     // marketExpansionStrategy,
      //     // technologyInnovationState,
      //     // primaryTechnologicalChallenges,
      //     // sustainabilityPractices,
      //     // neededSupport,
      //     // externalSupport,
      //     // partnershipsAdvancing,
      //     // keyAreasCollaboration,
      //     // challengesRankings,
      //     // necessaryActions,
      //     // organizationsCurrentRole,
      //     // policyChanges,
      //     // primaryStrengths,
      //     // sucessStory,
      //     // currentTrends,
      //     // shortTermGoals,
      //     // mediumTermGoals,
      //     // longTermGoals,
      //     // additionalInsights,
      //     // topicsNotCovered,
      //   } = organization;
      //   organizations.push({
      //     name,
      //     socialPage,
      //     type,
      //     establishmentYear,
      //     headQuarterInEgypt,
      //     headQuarterLocation,
      //     branchesLocation,
      //     operationStage,
      //     mainSector,
      //     employeesNumber,
      //     insuredEmployees,
      //     genderBalance,
      //     annualSalesRevenue,
      //     targetGrowthRate,
      //     serviceDescription,
      //     contactName,
      //     contactPosition,
      //     contactEmail,
      //     contactPhone,
      //     organizationLegalStructure,
      //     receivedFunding,
      //     fundingSource,
      //     fundingSeek,
      //     threeChallenges,
      //     anyPartnerships,
      //     mainCompetitors,
      //     customers,
      //     // location,
      //     // governmentalPoliciesRate,
      //     // legalChallenges,
      //     // legalChallengesNature,
      //     // taxationPoliciesImpact,
      //     // primaryOperationalChallenges,
      //     // energyCostsEffect,
      //     // operationalBottlenecks,
      //     // skilledLaborEffect,
      //     // investmentOpportunitiesRate,
      //     // financialManagementChallenges,
      //     // challengesFaced,
      //     // marketDemand,
      //     // marketChallenges,
      //     // scalingPotential,
      //     // marketExpansionStrategy,
      //     // technologyInnovationState,
      //     // primaryTechnologicalChallenges,
      //     // sustainabilityPractices,
      //     // neededSupport,
      //     // externalSupport,
      //     // partnershipsAdvancing,
      //     // keyAreasCollaboration,
      //     // challengesRankings,
      //     // necessaryActions,
      //     // organizationsCurrentRole,
      //     // policyChanges,
      //     // primaryStrengths,
      //     // sucessStory,
      //     // currentTrends,
      //     // shortTermGoals,
      //     // mediumTermGoals,
      //     // longTermGoals,
      //     // additionalInsights,
      //     // topicsNotCovered,
      //   });
      // });

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

      // const CsvParser = Parser.Parser;
      // const csvParser = new CsvParser({ csvFields });

      // const csvData = csvParser.parse(organizations);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error ${err}` });
    });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
