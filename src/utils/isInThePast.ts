const isInThePast = (date: Date) => {
  const now = new Date(Date.now());
  return date < now;
};

export default isInThePast;
