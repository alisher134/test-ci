export const setToLS = <T>(key: string, value: T) => {
  const transformedValue = typeof value === 'string' ? value : JSON.stringify(value);

  localStorage.setItem(key, transformedValue);
};

export const getFromLS = (key: string) => localStorage.getItem(key);

export const getJSONFromLS = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const removeFromLS = (key: string) => {
  localStorage.removeItem(key);
};
