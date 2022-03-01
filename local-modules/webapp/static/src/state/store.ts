import { createStore } from "vuex"
import LocalDatabase from "./LocalDatabase"
import { addToCart, deleteToCart, fetchCart, fetchHist, fetchProducts, getUser, setToCart ,setFavorite} from "./products"


const store = createStore({

    state: () => ({
        db: new LocalDatabase(),
        sideMenuShown: false,

        cart: { data: [], total: 0 },
        user: {id :-1,username : "",password:"",favori_list:[]},
        item: {
            id: -1,
            package: -1,
            quantity: -1
        },
        hist : [],

        favori : -1,


        catalog: {
            loading: false,
            lastPageLoaded: 0,
            totalPages: 1,
            products: [] as any[],

            filters: {
                search: "",
                seasonal: false,
                discount: 0,
                origin: "",
                category: "",
                favorite: false,
            },
        },
    }),


    mutations: {
        "sideMenu.open": state => {
            state.sideMenuShown = true
        },

        "sideMenu.close": state => {
            state.sideMenuShown = false
        },


        "catalog.setLoading": (state, loading) => {
            state.catalog.loading = loading
        },

        "catalog.setProducts": (state, {newProducts}) => {
            state.catalog.products = newProducts
        },

        "catalog.appendProducts": (state, {newProducts, totalPages}) => {
            state.catalog.lastPageLoaded++
            state.catalog.totalPages = totalPages
            state.catalog.products = [...state.catalog.products, ...newProducts]
        },

        "catalog.resetProducts": state => {
            state.catalog.lastPageLoaded = 0
            state.catalog.totalPages = 1
            state.catalog.products = []
        },

        "catalog.updateFilters": (state, filters) => {
            state.catalog.filters = {...state.catalog.filters, ...filters}
        },


        "cart.setItem": (state,item) => {
            state.item.id = item.id
            state.item.package = item.pack
            state.item.quantity = item.qt
        },

        "cart.getCart": (state, res) => {
            state.cart = res
        },
        "user.getUser": (state, u) => {
            state.user.id = u.id
            state.user.username = u.user
            state.user.password = u.pwd
            state.user.favori_list = u.favori_list
        },


        "hist.getHist": (state, res) => {
            state.hist = res
        },
        "favori.setFav": (state, res) => {
            state.favori = res
        },
        "favori.setList": (state, res) => {
            state.user.favori_list = res
        },
    },


    actions: {
        // Fetches the next page of the catalog
        "catalog.fetchProducts": fetchProducts,

        // Updates the given filters and fetches the first page of products
        "catalog.updateFilters": ({ commit, dispatch }, filters) => {
            commit("catalog.updateFilters", filters)
            commit("catalog.resetProducts")

            dispatch("catalog.fetchProducts")
        },

        //cart
        "cart.fetchCart": fetchCart,

        "cart.addCart": addToCart,
        "cart.rmCart": deleteToCart,
        "cart.setCart": setToCart,
        "cart.addItem": ({ commit, dispatch }, item) => {
            commit("cart.setItem", item)

            dispatch("cart.addCart")
            dispatch("cart.fetchCart")
        },
        "cart.deleteItem": ({ commit, dispatch }, item) => {
            commit("cart.setItem", item)

            dispatch("cart.rmCart")
            dispatch("cart.fetchCart")
        },
        "cart.setItemCart": ({ commit, dispatch }, item) => {
            commit("cart.setItem", item)

            dispatch("cart.setCart")
            dispatch("cart.fetchCart")
        },

        //connexion
        "user-auth.getUser": getUser,
        "user-auth.connect": async ({ commit, dispatch }, u) => {
            commit("user.getUser", u)

            await dispatch("user-auth.getUser")
            dispatch("cart.fetchCart")
        },
        //hist
        "hist.fetchHist": fetchHist,


        //favori
        "favori.sendFav": setFavorite,
        "favori.setFavori":({ commit, dispatch }, fav) => {
            commit("favori.setFav", fav)
            dispatch("favori.sendFav")
            
        },
    },

})
export default store
