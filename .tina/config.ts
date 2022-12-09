import { defineConfig } from "tinacms";
import FeedCollection from "./feedProduct";
import DefaultTemplate from "./pageTemplates/default";
import DefaultPDFTemplate from "./pageTemplates/defaultPdf";
import FaqTemplate from "./pageTemplates/faq";
import GridTemplate from "./pageTemplates/grid";
import HomePageTemplate from "./pageTemplates/home";
import FooterTemplate from "./siteDataTemplates/footer";
import OrderFormTemplate from "./siteDataTemplates/orderForm";
import RetailersTemplate from "./siteDataTemplates/retailers";
import ShoppingRatesTemplate from "./siteDataTemplates/shoppingRates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null,   // Get this from tina.io
  token: null,      // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "source",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "source",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "source/_pages",
        format: "md",
        templates: [
          HomePageTemplate,
          DefaultTemplate,
          DefaultPDFTemplate,
          GridTemplate,
          FaqTemplate,
        ]
      },
      FeedCollection,
      {
        name: "data",
        label: "Site Data",
        path: "source/_data",
        format: "json",
        templates: [
          FooterTemplate,
          OrderFormTemplate,
          RetailersTemplate,
          ShoppingRatesTemplate,
        ]
      },
    ],
  },
});
