import { defineConfig } from "tinacms";
import DefaultTemplate from "./pageTemplates/default";
import DefaultPDFTemplate from "./pageTemplates/defaultPdf";
import FaqTemplate from "./pageTemplates/faq";
import FeedProductTemplate from "./pageTemplates/feedProduct";
import GridTemplate from "./pageTemplates/grid";
import HomePageTemplate from "./pageTemplates/home";

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
        path: "source",
        format: "md",
        templates: [
          HomePageTemplate,
          FeedProductTemplate,
          DefaultTemplate,
          DefaultPDFTemplate,
          GridTemplate,
          FaqTemplate,
        ]
      },
    ],
  },
});
