import { Template } from "tinacms"

const DefaultTemplate: Template = {
  name: "default",
  label: "Default",
  ui: {
    defaultItem: {
      title: "",
      layout: "default",
    }
  },
  fields: [
    {
      name: "title",
      type: "string",
      label: "Title"
    },
    {
      name: "date",
      type: "datetime",
      label: "Date",
    },
    {
      name: "description",
      type: "string",
      label: "Description",
      ui: {
        component: "textarea",
      },
      description: "This text will show up at the top of the page in larger font"
    },
    {
      name: "permalink",
      type: "string",
      label: "Permalink",
    },
    {
      name: "layout",
      type: "string",
      label: "Layout",
    }
  ]
}

export default DefaultTemplate;