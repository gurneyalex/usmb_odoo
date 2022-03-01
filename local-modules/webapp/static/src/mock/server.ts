// @ts-ignore
import cors from "cors"
import express, { Request } from "express"
import { generateProducts } from "./data"


// Server properties
const port = 3000

const defaultLocale = "en"
const locales = ["fr", "en", "de"]


// Generate data
const products = generateProducts(locales, 100)
const cart = [
    { id: 4,  package: 500, quantity: 4  },
    { id: 34, package: 500, quantity: 24 },
    { id: 6,  package: 500, quantity: 5  },
]
const users = [{id:0, username: "gentetw",favorite : [] as  any, password: "1234", cart : [{ id: 4, package: 500, quantity: 4 }, { id: 34, package: 500, quantity: 24 }, { id: 6, package: 500, quantity: 5 } ],hist:[{id:0,date:"12/01/2022",content:cart,price:0},{id:1,date:"13/01/2022",content: cart,price:0}]}, {id:1, username: "carrerat", password: "tropfort",favorite : [] as  any,cart : [],hist:[{id:0,date:"18/01/2022",content:cart,price:0},{id:1,date:"19/01/2022",content: cart,price:0}] }, {id:2, username: "jubardt", password: "bg",favorite : [] as  any,cart :[] ,hist:[{id:0,date:"20/01/2022",content:cart,price:0},{id:1,date:"21/01/2022",content: cart,price:0}]},]


// Localization filters
function localized(data: any, req: Request) {
    const locale = (req.query.locale as string) || defaultLocale

    return data.map((el: any) =>
        el[locale])
}

// Search filters
function filteredSearch(data: any, req: Request) {
    const search = ( (req.query.search as string) || "" ).toLowerCase()

    return data.filter((el: any) =>
        el.name.toLowerCase().indexOf(search) != -1)
}

function filteredDiscount(data: any, req: Request) {
    const filter = (req.query.discount || 0)

    return data.filter((el: any) =>
        el.discount >= filter)
}

function filteredCategory(data: any, req: Request) {
    const filter = (req.query.category || "")

    return data.filter((el: any) =>
        el.category.indexOf(filter) != -1)
}

function filteredOrigin(data: any, req: Request) {
    const filter = ( (req.query.origin as string) || "" ).toLowerCase()

    return data.filter((el: any) =>
        el.origin.toLowerCase().indexOf(filter) != -1)
}

function filteredSeasonal(data: any, req: Request) {
    const filter = (req.query.seasonal == "true" || false)

    return data.filter((el: any) =>
        !filter || el.seasonal == filter)
}

function filteredFavorite(data: any, req: Request) {
    const filter = (req.query.favorite == "true" || false)

    return data.filter((el: any) =>
        !filter || el.favorite == filter)
}


// Pagination filters
function paginated(data: any, req: Request, perPage: number) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1
    const first = (page - 1) * perPage

    return data.slice(first, first + perPage)
}

function totalPages(data: any, perPage: number) {
    return data.length > 0 ? Math.ceil(data.length / perPage) : 1
}


// Routes
const app = express()
app.options("*", cors())


// Get logged user
app.get("/me", (req, res) => {
    const locale = (req.query.locale as string) || defaultLocale

    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        user: (users[0] as any)[locale],
    })
})

// Get paginated catalog
app.get("/catalog", (req, res) => {
    const perPage = 10

    var filteredProducts = filteredSearch(filteredDiscount(filteredSeasonal(filteredCategory(filteredOrigin(filteredFavorite(
        localized(products, req),
        req
    ), req), req), req), req), req)
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        products: paginated(
            filteredProducts,
            req,
            perPage
        ),

        totalPages: totalPages(filteredProducts, perPage),
    })
})

// Get cart
app.get("/cart", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const u = users.filter(el => el.id == idUser)
    var cart: any = { data: [], total: 0 }
    if(u.length == 1){
        cart = cartToData(u[0].cart,req)
    }

    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        cart: cart
    })
})

// Add to cart
app.put("/cart", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const u = users.filter(el => el.id == idUser)
    var cart: any = { data: [], total: 0 }
    if(u.length == 1){
        cart = users.filter(el => el.id == idUser)[0].cart

        //check if the products exist in the cart
        const id = parseInt(req.query.id as string)
        const data = cart.filter((el: any) => el.id == id)
        const quantity = parseInt(req.query.quantity as string)
        const pkg = parseInt(req.query.package as string)
        if (!isNaN(id) && !isNaN(quantity) && !isNaN(pkg)) {
            if (data.length == 0) {
                cart.push({
                    id: id,
                    package: pkg,
                    quantity: quantity
                })
            } else {
                var found = 0
                for (var i = 0; i < data.length; i++) {
                    if (data[i].package === pkg) {
                        cart[cart.indexOf(data[i])].quantity += quantity
                        found = 1
                        break;
                    }
                }
                if (found === 0) {
                    cart.push({
                        id: id,
                        package: pkg,
                        quantity: quantity
                    })
                }
            }
        }
        cart = cartToData(u[0].cart,req)
    }

    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        cart: cart
    })
})

// Remove from cart
app.delete("/cart", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const u = users.filter(el => el.id == idUser)
    var cart: any = { data: [], total: 0 }
    if(u.length == 1){
        cart = users.filter(el => el.id == idUser)[0].cart
        //check if the products exist in the cart
        const id = parseInt(req.query.id as string)
        const data = cart.filter((el: any) => el.id == id)
        const quantity = parseInt(req.query.quantity as string)
        const pkg = parseInt(req.query.package as string)

        if (!isNaN(id) && !isNaN(quantity) && !isNaN(pkg) && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].package === pkg) {
                    cart[cart.indexOf(data[i])].quantity -= quantity
                    if (cart[cart.indexOf(data[i])].quantity <= 0) { cart.splice(cart.indexOf(data[i]), 1) }
                    break;
                }
            }
        }
        cart = cartToData(u[0].cart,req)
    }

    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        cart: cart
    })
})

// set item from cart
app.patch("/cart", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const u = users.filter(el => el.id == idUser)
    var cart: any = { data: [], total: 0 }
    if(u.length == 1){
        cart = users.filter(el => el.id == idUser)[0].cart
        //check if the products exist in the cart
        const id = parseInt(req.query.id as string)
        const data = cart.filter((el: any) => el.id == id)
        const quantity = parseInt(req.query.quantity as string)
        const pkg = parseInt(req.query.package as string)
        if (!isNaN(id) && !isNaN(quantity) && !isNaN(pkg) && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var found = 0
                if (data[i].package === pkg) {
                    var pos = cart.indexOf(data[i])
                    cart[pos].quantity = quantity
                    if (cart[pos].quantity <= 0) { cart.splice(pos, 1) }
                    found = 1
                    break;
                }
                if (found === 0 && quantity > 0) {
                    cart.push({
                        id: id,
                        package: pkg,
                        quantity: quantity
                    })
                }
            }
        } else if (!isNaN(id) && !isNaN(quantity) && !isNaN(pkg) && data.length === 0 && quantity > 0) {
            cart.push({
                id: id,
                package: pkg,
                quantity: quantity
            })
        }
        cart = cartToData(u[0].cart,req)
    }

    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        cart: cart
    })
})


//user
app.get("/user-auth", (req, res) => {
    let user_auth = {id :-1,username : "",password:"",favori_list : []}
    const u = users.filter(el => el.username == req.query.username && el.password == req.query.password)
    if (u.length == 1) {
        user_auth ={id:  u[0].id , username: u[0].username , password :"",favori_list : u[0].favorite }
    }
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        user: user_auth
    })
})

//historic

app.get("/hist", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const u = users.filter(el => el.id == idUser)
    let r = []
    if(u.length == 1){
        r = clone(u[0].hist) as any[]
        for(var i = 0 ; i < r.length ; i ++){
            r[i].content = cartHist(r[i].content,req)
            r[i].price = totalCost(r[i].content)
        }
    }
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        hist : r
    })
})


//favori
app.get("/favori", (req, res) => {
    const idUser = parseInt(req.query.idUser as string)
    const idprod = parseInt(req.query.idProd as string)
    var u = users.filter(el => el.id == idUser)
    var r = [] as any
    if(u.length == 1){
       const fav = u[0].favorite.filter((el:any) => el == idprod)
       if(fav.length == 1){
            u[0].favorite.splice(u[0].favorite.indexOf(idprod),1)
       }else{
            u[0].favorite.push(idprod)
       }
       r = u[0].favorite
    }
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        user : r
    })
})

function clone(obj: Date | any[] | Record<any, any>): Date | any[] | Record<any, any> {
    var copy: any;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone((obj as Record<any, any>)[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}


// Start server
app.listen(port, () =>
    console.log(`Mock server listening at http://localhost:${port}`)
)

//convert cart to cart with more data
function cartToData(cart: any[], req: Request) {
    var data = []
    var prod = localized(products, req)
    for (var i = 0; i < cart.length; i++) {
        var p = prod.filter((el: any) => el.id === cart[i].id)[0]
        if (p != null) {
            var price = p.packages.filter((el: any) => el.quantity === cart[i].package)[0]
            if (price != null) {
                data.push({ id: p.id, name: p.name, image: p.image, quantity: cart[i].quantity, package: cart[i].package, price: price.price })
            }
        }
    }
    return { "data": data, "total": totalCost(data) }
}

//convert cart for historic
function cartHist(cart: any[], req: Request) {
    var data = []
    var prod = localized(products,req)
    for(var i = 0 ; i < cart.length ; i++){
       var p = prod.filter((el: any) => el.id === cart[i].id)[0]
       var price = p.packages.filter((el: any) => el.quantity === cart[i].package)[0].price
       var total = (price * cart[i].quantity).toFixed(2)
       data.push({"name" : p.name, "price" : price , "total" : total ,"package": cart[i].package ,"quantity" : cart[i].quantity })
    }
    return data
  }

//return the total cost of the cart
function totalCost(data: any) {
    var total = 0
    for (var i = 0; i < data.length; i++) {
        total += data[i].price * data[i].quantity
    }
    return total.toFixed(2)
}
