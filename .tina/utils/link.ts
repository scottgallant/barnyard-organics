import { SchemaField } from "tinacms";

const description: SchemaField = {
  name: "description",
  label: "Description",
  type: "string",
};

const image: SchemaField = {
  name: "image",
  label: "Image",
  type: "image",
};

declare type FieldOptions = {
  description?: boolean
  image?: boolean
}

const LinkField = (name: string, label: string, fieldOptions: FieldOptions): SchemaField => {
  const fields: SchemaField[] = [
    {
      name: "link",
      label: "Link",
      type: "reference",
      collections: ["page", "feed"]
    },
    {
      name: "heading",
      label: "Heading",
      type: "string",
    }
  ];

  if (fieldOptions?.description) {
    fields.push(description);
  }

  if (fieldOptions?.image) {
    fields.push(image);
  }

  return {
    name,
    label,
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item.heading }),
    },
    fields
  };
}

export default LinkField;
