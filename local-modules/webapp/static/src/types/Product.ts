import { assert } from "console"
import { find, omit } from "lodash"
import { Package } from "./Package"


/**
 * Non-localized data fields of any product.
 */
type ProductData = {
    id: number,
    image: string,
    origin: string,
    category: string,
    pricePerKg: number,
    packages: Package[],
    seasonal: boolean,
    discount: number,
    favorite: boolean,
}

/**
 * Localized data fields of any product.
 */
type LocalizedProductData = {
    name: string,
}


/**
 * A raw product object, usually stored in the database.
 * Contains the localized data fields for every locale.
 */
type Product =
    ProductData &
    { localizedData: Record<string, LocalizedProductData> }

/**
 * A localized product object, usually passed to the front-end.
 * Contains the localized data fields for a specific locale.
 */
type LocalizedProduct =
    { locale: string } &
    ProductData &
    LocalizedProductData


/**
 * Turns a product into a localized product for a given locale.
 * @param product Product to convert
 * @param locale Locale for the new localized product
 * @returns LocalizedProduct
 */
function toLocalizedProduct(product: Product, locale: string): LocalizedProduct {
    assert(product.localizedData[locale], "Locale " + locale + " does not exist on this product.")

    return {
        locale,
        ...omit(product, ["localizedData"]),
        ...product.localizedData[locale],
    }
}

/**
 * Turns a localized product into a product by searching for its equivalent in a given product list.
 * @param localizedProduct Localized product to convert
 * @param products List of products
 * @returns Product or null if no equivalent product exists within the given list
 */
function toProduct(localizedProduct: LocalizedProduct, products: Product[]): Product | null {
    return find(
        products,
        product => product.id === localizedProduct.id,
    ) || null
}


export {
    Product, LocalizedProduct,

    toLocalizedProduct,
    toProduct,
}
