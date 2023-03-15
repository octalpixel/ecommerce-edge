import type {
    Product,
    Media,
    Image,
    SEO,
    Variant,
    VariantGroup,
    VariantOption,
    AdminUsers,
} from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env.mjs";

/**
 * Once you have your prisma.schema models set, you can import their generated types here from @prisma/client/edge
 */
export interface Database {
    Product: Product;
    Media: Media;
    Image: Image;
    SEO: SEO;
    Variant: Variant;
    VariantGroup: VariantGroup;
    VariantOption: VariantOption;
    AdminUsers: AdminUsers;
}

export const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        host: "aws-sa-east-1.connect.psdb.cloud",
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
    }),
});
