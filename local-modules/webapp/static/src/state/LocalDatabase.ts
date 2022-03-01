import Dexie, { Table } from "dexie"
import { Product } from "../types/Product"


export default class LocalDatabase extends Dexie {

    products!: Table<Product>
    cart!: Table<Product>


    constructor() {
        super("localDatabase")

        this.version(1).stores({
            products: "++id, image, origin, category, pricePerKg, packages, seasonal, discount, favorite, localizedData",
            cart: "++id, image, origin, category, pricePerKg, packages, seasonal, discount, favorite, localizedData",
        })
    }

}
