const isProduction: boolean = false;

export const environment = {
  production: !!isProduction,
  interceptorConditions: {
    profiler: !isProduction,
    caching: !isProduction,
  },
};
