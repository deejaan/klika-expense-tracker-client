import React, { useEffect, useState } from 'react';
import Loader from './Loader';

export default importComponent => props => {
  const [asyncComponent, setAsyncComponent] = useState(null);
  useEffect(() => {
    (async () => {
      const { default: component } = await importComponent();
      setAsyncComponent({ component });
    })();
  }, []);

  const Component = asyncComponent ? asyncComponent.component : null;
  return Component ? <Component {...props} /> : <Loader />;
};
