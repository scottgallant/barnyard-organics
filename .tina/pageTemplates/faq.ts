import { Template } from "tinacms"

const FaqTemplate: Template = {
  name: "faq",
  label: "FAQs",
  ui: {
    defaultItem: {
      title: "Frequently Asked Questions",
      layout: "feed-subpage",
      permalink: "/faq/"
    }
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "layout",
      label: "Layout",
      type: "string",
    },
    {
      name: "permalink",
      label: "Permalink",
      type: "string",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
    {
      name: "body",
      label: "Body",
      type: "rich-text",
      isBody: true,
    }
  ]
}

export default FaqTemplate;