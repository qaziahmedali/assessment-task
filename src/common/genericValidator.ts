import { ValidationRule } from './interface';

export const genericValidator = (
  data: Record<string, any>,
  rules: Record<string, ValidationRule[]>
) => {
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];

    // Check if the field is optional and skip validation if it's missing
    const isOptional = fieldRules.some((rule) => rule.optional);

    // If the field is optional and the value is missing or empty, skip validation
    if (isOptional && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Validate all rules for the field
    for (const rule of fieldRules) {
      if (!rule.validator(value)) {
        const errorMessage =
          typeof rule.message === 'function'
            ? rule.message(value)
            : rule.message;
        return { error: errorMessage };
      }
    }
  }
  return null;
};
