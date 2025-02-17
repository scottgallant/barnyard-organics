import { Template } from "tinacms";

const DefaultPDFTemplate: Template = {
  name: "default_pdfs",
  label: "Default page with pdfs",
  ui: {
    defaultItem: {
      title: "",
      layout: "default_pdfs",
      pdf_description:
        '<p>To place an order, <a href="info@barnyardorganics.com">email</a>   or call Barnyard Organics (902-887-3188).</p>',
    },
  },
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string",
      required: true,
      ui: {
        component: () => null,
      },
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
      searchable: true,
    },
    {
      name: "permalink",
      label: "Permalink",
      type: "string",
    },
    {
      name: "pdf_heading",
      type: "string",
      label: "PDF Heading",
      description: "This is the heading above your list of PDFs",
    },
    {
      name: "pdf_description",
      type: "string",
      label: "PDF Description",
      description:
        "This is the description below the heading and above the list of PDFs",
    },
    {
      type: "object",
      label: "PDFs",
      name: "pdfs",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.title }),
      },
      description: "List of links to PDFs",
      fields: [
        {
          name: "title",
          type: "string",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          label: "PDF File",
          name: "link",
          description: "Upload the PDF that you want to link to",
        },
      ],
    },
  ],
};

export default DefaultPDFTemplate;
