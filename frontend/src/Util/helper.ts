const getDateOnlyInString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export { getDateOnlyInString };
