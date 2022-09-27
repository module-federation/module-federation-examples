/**
 * This class provides a logic of sorting dynamic routes in NextJS.
 *
 * It was copied from
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/utils/sorted-routes.ts
 */
export declare class UrlNode {
    placeholder: boolean;
    children: Map<string, UrlNode>;
    slugName: string | null;
    restSlugName: string | null;
    optionalRestSlugName: string | null;
    insert(urlPath: string): void;
    smoosh(): string[];
    private _smoosh;
    private _insert;
}
