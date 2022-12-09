import { Template } from "tinacms"
import LinkField from "../utils/link";

const HomePageTemplate: Template = {
  name: "home",
  label: "Home Page",
  ui: {
    defaultItem: {
      title: "Homepage",
      layout: "",
      main_heading: "",
      ecofm_heading: "",
      ecofm_links: [],
      chicken_eggs: [],
      services: [],
    }
  },
  fields: [
    {
      name: "title",
      type: "string",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      name: "permalink",
      label: "Permalink",
      type: "string",
    },
    {
      name: "layout",
      label: "Layout",
      type: "string",
    },
    {
      name: "background",
      label: "Background",
      type: "image",
    },
    {
      name: "main_heading",
      label: "Main heading",
      type: "string",
    },
    {
      name: "ecofm_image",
      label: "Ecofm image",
      type: "image",
    },
    {
      name: "ecofm_heading",
      label: "Ecofm heading",
      type: "string",
    },
    LinkField("ecofm_links", "Ecofm links", { description: true }),
    LinkField("chicken_eggs", "Chicken eggs", { image: true }),
    LinkField("services", "Services", { description: true, image: true }),
  ]
}

export default HomePageTemplate;