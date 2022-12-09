import { Template } from "tinacms"

const OrderFormTemplate: Template = {
  name: "order_form",
  label: "Order Form",
  ui: {
    defaultItem: {
      description: "",
    }
  },
  fields: [
    {
      name: "description",
      type: "rich-text",
      label: "page-description",
      description: "This text will show up at the top of the order form"
    },
    {
      type: "number",
      name: "hst",
      label: "HST Rate",
      description: "Current HST % (for items that require HST)"
    },
    {
      type: "object",
      name: "barnyard_organics",
      label: "Barnyard Organics",
      fields: [
        {
          type: "object",
          name: "products",
          label: "Products",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Name"
            },
            {
              type: "string",
              name: "description",
              label: "Description"
            },
            {
              type: "number",
              name: "price",
              label: "Price"
            },
            {
              type: "number",
              name: "price_retailers",
              label: "Price (retailers)"
            },
            {
              type: "boolean",
              name: "hst",
              label: "HST",
              description: "Charge HST on this item?"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "bio_ag",
      label: "Bio-ag",
      fields: [
        {
          type: "object",
          name: "products",
          label: "Products",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Name"
            },
            {
              type: "string",
              name: "description",
              label: "Description"
            },
            {
              type: "number",
              name: "price",
              label: "Price"
            },
            {
              type: "number",
              name: "price_retailers",
              label: "Price (retailers)"
            },
            {
              type: "boolean",
              name: "hst",
              label: "HST",
              description: "Charge HST on this item?"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "general_seed",
      label: "General Seed",
      fields: [
        {
          type: "object",
          name: "products",
          label: "Products",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Name"
            },
            {
              type: "string",
              name: "description",
              label: "Description"
            },
            {
              type: "number",
              name: "price",
              label: "Price"
            },
            {
              type: "number",
              name: "price_retailers",
              label: "Price (retailers)"
            },
            {
              type: "boolean",
              name: "hst",
              label: "HST",
              description: "Charge HST on this item?"
            }
          ]
        }
      ]
    }
  ]
}

export default OrderFormTemplate;