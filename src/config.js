const getEnvVars = origin => {
  const part = origin.split('//')[1].split('.')[0];
  switch (part) {
    case 'app':
      return {
        API_URL: 'https://app.com',
      };
    default:
      return {
        API_URL: 'https://localhost:3000',
      };
  }
};

const { API_URL } = getEnvVars(window.origin);

export { API_URL };
