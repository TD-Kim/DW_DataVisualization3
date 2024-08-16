export const parseFirestoreFields = (fields) => {
  const parsed = {};
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (field.stringValue !== undefined) {
      parsed[key] = field.stringValue;
    } else if (field.integerValue !== undefined) {
      parsed[key] = Number(field.integerValue);
    } else if (field.doubleValue !== undefined) {
      parsed[key] = Number(field.doubleValue);
    } else if (field.booleanValue !== undefined) {
      parsed[key] = field.booleanValue;
    } else if (field.timestampValue !== undefined) {
      parsed[key] = new Date(field.timestampValue);
    } else if (field.mapValue !== undefined) {
      parsed[key] = parseFirestoreFields(field.mapValue.fields);
    } else if (field.arrayValue !== undefined) {
      parsed[key] = field.arrayValue.values.map((value) =>
        parseFirestoreFields(value.mapValue.fields || value)
      );
    }
  });
  return parsed;
};

export const toFirestoreFields = (obj) => {
  const fields = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        fields[key] = { integerValue: value };
      } else {
        fields[key] = { doubleValue: value };
      }
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    } else if (value instanceof Date) {
      fields[key] = { timestampValue: value.toISOString() };
    } else if (Array.isArray(value)) {
      fields[key] = {
        arrayValue: {
          values: value.map((v) => toFirestoreFields({ temp: v }).temp),
        },
      };
    } else if (typeof value === 'object') {
      fields[key] = { mapValue: { fields: toFirestoreFields(value) } };
    }
  });

  return fields;
};
