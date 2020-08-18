const getEnvVars = origin => {
  const part = origin.split('//')[1].split('.')[0];
  switch (part) {
    case 'klika-expense-web':
      return {
        API_URL: 'https://klika-expense-api.herokuapp.com/api/v1',
      };
    default:
      return {
        API_URL: 'http://localhost:4000/api/v1',
      };
  }
};

const { API_URL } = getEnvVars(window.origin);

export { API_URL };
