

export interface IBrand {
    name: string;
    slug: string;
    createdBy: string;
    image: string;

}
export type HydratedBrand = IBrand & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};