/// we can use these helper functions for convert and validate date to IOS date format
export const isValidISODate = (value: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) return false;
  const d = new Date(value);
  return d.toISOString() === value;
};

export const convertToISOFormat = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  date.setUTCHours(0, 0, 0, 0);

  return date.toISOString();
};
