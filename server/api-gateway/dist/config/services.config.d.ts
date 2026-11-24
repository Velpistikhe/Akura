interface ServiceRouteConfig {
    prefix: string;
    target: string;
    gatewaySecret: string;
    authRequired: boolean;
    internalCaller?: 'finance-service' | 'auth-service' | 'fieldservice-service';
    pathRewrite: Record<string, string>;
    description: string;
}
export declare const servicesConfig: ServiceRouteConfig[];
export {};
