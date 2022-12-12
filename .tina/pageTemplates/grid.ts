import { Template } from "tinacms"

const GridTemplate: Template = {
  name: "grid",
  label: "Links",
  ui: {
    defaultItem: {
      title: "",
      layout: "grid",
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
      required: true,
      ui: {
        component: () => null,
      }
    },
    {
      name: "description",
      label: "Description",
      type: "string",
      description: "This text will show up at the top of the page in larger font",
    },
    {
      name: "permalink",
      label: "Permalink",
      type: "string",
      description: "This is the link to the page. If this is a \"subpage\" make sure you include the  parent page. For example: /services/custom-roasting/"
    },
    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.heading }),
      },
      fields: [
        {
          name: "link",
          label: "Link",
          type: "reference",
          collections: ["page", "feed"],
          description: "Select the page you want to link to"
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "heading",
          label: "Heading",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          ui: {
            component: "textarea"
          },
        }
      ],
      description: "This is a list of links to other pages. It will appear in a grid-format (with an image, title, and text)"
    }
  ]
}

export default GridTemplate;