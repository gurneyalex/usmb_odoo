import axios from "axios"
import { ActionContext } from "vuex"
import { Product } from "../types/Product"
import LocalDatabase from "./LocalDatabase"


/**
 * Fetches the product list from the server and updates the local database.
 */
export async function syncProducts({state, commit}: ActionContext<any, any>) {
    const { db }: { db: LocalDatabase } = state
    commit("catalog.setLoading", true)

    try {
        const { data } = await axios.get("http://localhost:3000/catalog")
        const { products }: { products: Product[] } = data

        const localProducts = await db.products.toArray()

        commit("catalog.setProducts",
            products.map(product => {
                const localProduct = localProducts.find(el => el.id === product.id)

                return localProduct ?
                    {...product, favorite: localProduct.favorite}
                :
                    product
            })
        )
    }
    catch (e) {
        console.error(e)
    }

    commit("catalog.setLoading", false)
}

export function fetchProducts({state, commit}: ActionContext<any, any>) {
    commit("catalog.setLoading", true)
    axios
        .get("http://localhost:3000/catalog"
            + "?page=" + encodeURIComponent(state.catalog.lastPageLoaded + 1)
            + "&search=" + encodeURIComponent(state.catalog.filters.search.toLowerCase())
            + "&seasonal=" + encodeURIComponent(state.catalog.filters.seasonal)
            + "&discount=" + encodeURIComponent(state.catalog.filters.discount)
            + "&category=" + encodeURIComponent(state.catalog.filters.category)
            + "&origin=" + encodeURIComponent(state.catalog.filters.origin)
           // + "&favorite=" + encodeURIComponent(state.catalog.filters.favorite)
        )
        .then(res => {
            const newProducts = res.data.products

            if (newProducts.length > 0)
                commit("catalog.appendProducts", { newProducts, totalPages: res.data.totalPages })

            commit("catalog.setLoading", false)
        })
}

export function fetchCart({state, commit}: ActionContext<any, any>) {
    axios
        .get("http://localhost:3000/cart"
            + "?idUser=" + encodeURIComponent(state.user.id))
        .then(res => {
            commit("cart.getCart", res.data.cart)
        })
}

export function addToCart({state, commit}: ActionContext<any, any>) {
    axios
        .put("http://localhost:3000/cart"
            + "?idUser=" + encodeURIComponent(state.user.id)
            + "&id=" + encodeURIComponent(state.item.id)
            + "&package=" + encodeURIComponent(state.item.package)
            + "&quantity=" + encodeURIComponent(state.item.quantity)
        )
        .then(res => {
            commit("cart.getCart", res.data.cart)
        })
}

export function deleteToCart({state, commit}: ActionContext<any, any>) {
    axios
        .delete("http://localhost:3000/cart"
            + "?idUser=" + encodeURIComponent(state.user.id)
            + "&id=" + encodeURIComponent(state.item.id)
            + "&package=" + encodeURIComponent(state.item.package)
            + "&quantity=" + encodeURIComponent(state.item.quantity)
        )
        .then(res => {
            commit("cart.getCart", res.data.cart)
        })
}

export function setToCart({state, commit}: ActionContext<any, any>) {
    axios
        .patch("http://localhost:3000/cart"
            + "?idUser=" + encodeURIComponent(state.user.id)
            + "&id=" + encodeURIComponent(state.item.id)
            + "&package=" + encodeURIComponent(state.item.package)
            + "&quantity=" + encodeURIComponent(state.item.quantity)
        )
        .then(res => {
            commit("cart.getCart", res.data.cart)
        })
}

 export async function getUser({state, commit}: ActionContext<any, any>) {
    await axios
        .get("http://localhost:3000/user-auth"
            + "?username=" + encodeURIComponent(state.user.username)
            + "&password=" + encodeURIComponent(state.user.password))
        .then(res => {
            if (res.data.user === null) {
                commit("user.getUser", { id: -1, user: null, pwd: null,favori_list : [] })
            } else {
                commit("user.getUser", { id: res.data.user.id, user: res.data.user.user, pwd: "" ,favori_list : res.data.user.favori_list})
            }
        })
}

export function fetchHist({state, commit}: ActionContext<any, any>) {
    axios
        .get("http://localhost:3000/hist"
            + "?idUser=" + encodeURIComponent(state.user.id))
        .then(res => {
            commit("hist.getHist", res.data.hist)
        })
}

export async function setFavorite({state, commit}: ActionContext<any, any>) {
    await axios
        .get("http://localhost:3000/favori"
            + "?idUser=" + encodeURIComponent(state.user.id)
            + "&idProd=" + encodeURIComponent(state.favori))  
            .then(res => {
                commit("favori.setList", res.data.user)
            })
}
