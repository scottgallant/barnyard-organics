import { Template } from "tinacms"

const RetailersTemplate: Template = {
  name: "retailers",
  label: "Retailers",
  ui: {
    defaultItem: {
      new_brunswick: [],
      nova_scoti: [],
      pei: [],
    }
  },
  fields: [
    {
        type: "string",
        list: true,
        name: "NewBrunswick",
        label: "New Brunswick"
    },
    {
        type: "string",
        list: true,
        label: "Nova Scotia",
        name: "NovaScotia"
    },
    {
        type: "string",
        list: true,
        name: "Pei",
        label: "PEI"
    },
  ],
}

export default RetailersTemplate;