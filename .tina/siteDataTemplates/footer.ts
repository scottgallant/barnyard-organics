import { Template } from "tinacms"

const FooterTemplate: Template = {
  name: "footer",
  label: "Footer",
  ui: {
    defaultItem: {
      Address: "",
      Phone: "",
      Email: "",
      social_media: []
    }
  },
  fields: [
    {
      name: "Address",
      label: "Address",
      type: "string",
    },
    {
      name: "Phone",
      label: "Phone",
      type: "string",
    },
    {
      name: "Email",
      label: "Email",
      type: "string",
    },
    {
      name: "social_media",
      label: "Social media",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          name: "",
          link: "",
        },
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
          isTitle: true,
          required: true,
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        }
      ],
    }
  ]
}

export default FooterTemplate;