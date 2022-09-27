export declare function isDynamicRoute(route: string): boolean;
export declare function getRouteRegex(normalizedRoute: string): {
    re: RegExp;
    groups: Record<string, unknown>;
};
/**
 * Convert browser pathname to NextJs route.
 * This method is required for proper work of Dynamic routes  in NextJS.
 */
export declare function pathnameToRoute(cleanPathname: string, routes: string[]): string | undefined;
/**
 * Sort provided pages in correct nextjs order.
 * This sorting is required if you are using dynamic routes in your apps.
 * If order is incorrect then Nextjs may use dynamicRoute instead of exact page.
 */
export declare function sortNextPages(pages: string[]): string[];
