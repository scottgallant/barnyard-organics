import { Template } from "tinacms"

const ShoppingRatesTemplate: Template = {
  name: "shopping_rates",
  label: "Shopping Rates",
  fields: [
    {
      type: "number",
      name: "fuel_surcharge",
      label: "Fuel Surcharge"
    },
    {
      type: "number",
      name: "fuel_surcharge_10000",
      label: "Fuel Surcharge",
      description: "For shipments greater than 10,000 lbs"
    },
    {
      type: "object",
      name: "new_brunswick",
      label: "New Brunswick",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.location }),
      },
      fields: [
        {
          type: "string",
          name: "location",
          label: "Location"
        },
        {
          type: "number",
          name: "price_1000",
          label: "Price / 100 pounds",
          description: "For shipments between 1,000 - 1,999 pounds"
        },
        {
          type: "number",
          label: "Price / 100 pounds",
          name: "price_2000",
          description: "For shipments between 2,000 - 4,999 pounds"
        },
        {
          type: "number",
          name: "price_5000",
          label: "Price / 100 pounds",
          description: "For shipments between 5,000 - 9,999 pounds"
        },
        {
          type: "number",
          name: "price_10000",
          label: "Price / 100 pounds",
          description: "For shipments between 10,000 - X pounds"
        }
      ]
    },
    {
      type: "object",
      name: "nova_scotia",
      label: "Nova Scotia",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.location }),
      },
      fields: [
        {
          type: "string",
          name: "location",
          label: "Location"
        },
        {
          type: "number",
          name: "price_1000",
          label: "Price / 100 pounds",
          description: "For shipments between 1,000 - 1,999 pounds"
        },
        {
          type: "number",
          label: "Price / 100 pounds",
          name: "price_2000",
          description: "For shipments between 2,000 - 4,999 pounds"
        },
        {
          type: "number",
          name: "price_5000",
          label: "Price / 100 pounds",
          description: "For shipments between 5,000 - 9,999 pounds"
        },
        {
          type: "number",
          name: "price_X",
          label: "Price / 100 pounds",
          description: "For shipments between 10,000 - X pounds"
        }
      ]
    },
    {
      type: "object",
      name: "pei",
      label: "PEI",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.location }),
      },
      fields: [
        {
          type: "string",
          name: "location",
          label: "Location"
        },
        {
          type: "number",
          name: "price_1000",
          label: "Price / 100 pounds",
          description: "For shipments between 1,000 - 1,999 pounds"
        },
        {
          type: "number",
          label: "Price / 100 pounds",
          name: "price_2000",
          description: "For shipments between 2,000 - 4,999 pounds"
        },
        {
          type: "number",
          name: "price_5000",
          label: "Price / 100 pounds",
          description: "For shipments between 5,000 - 9,999 pounds"
        },
        {
          type: "number",
          name: "price_X",
          label: "Price / 100 pounds",
          description: "For shipments between 10,000 - X pounds"
        }
      ]
    }
  ],
}

export default ShoppingRatesTemplate;
