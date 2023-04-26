const isProduction: boolean = true;

export const environment = {
    production: !!isProduction,
    interceptorConditions: {
        profiler: !isProduction,
        caching: !isProduction
    }
}