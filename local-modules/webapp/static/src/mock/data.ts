import faker from "faker"
import foodItems from "./foodItems"

faker.locale = "en"


function generateLocalizedData(locales: string[], generate: () => any) {
    const previousLocale = faker.locale

    const data: Record<string, unknown> = {}
    locales.forEach(locale => {
        faker.locale = locale
        data[locale] = generate()
    })

    faker.locale = previousLocale
    return data
}


function generateUsers(locales: string[], count: number) {
    const users = []

    for (let i = 0; i < count; i++) {
        const el = {
            id: faker.datatype.number(),
        }

        users.push(
            generateLocalizedData(locales, () => ({
                ...el,

                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            }))
        )
    }

    return users
}


const foodImages = [
    "carrots.jpg",
    "green_bean.jpg",
    "tomato.jpg",
    "zucchini.jpg",
    "betteraves.jpg",
    "choufleur.jpg",
    "fraise.jpg",
    "pomme.jpg"
]

const foodCategory = [
    "citrus",
    "tuber",
    "seeds",
    "leaf",
    "root"
]

function randomFoodItems() {
    return foodItems[faker.datatype.number(foodItems.length - 1)]
}

function randomCategory() {
    return foodCategory[faker.datatype.number(foodCategory.length - 1)]
}


function randomFoodImage() {
    return foodImages[faker.datatype.number(foodImages.length - 1)]
}


function generatePackages(pricePerG: number) {
    const packages = []

    let quantity = 500
    for (let i = 0; i < faker.datatype.number(3) + 1; i++) {
        packages.push({
            quantity,
            price: (quantity * pricePerG).toFixed(2),
        })

        quantity *= 2
    }

    return packages
}

function randomSeasonal() {
    return faker.datatype.boolean();
}

function generateProducts(locales: string[], count: number) {
    const products = []

    for (let i = 0; i < count; i++) {
        const pricePerG = faker.datatype.number(5000) / 100000

        const el = {
            id: i,
            image: randomFoodImage(),
            pricePerKg: (pricePerG * 1000).toFixed(2),
            packages: generatePackages(pricePerG),
            seasonal: randomSeasonal(),
            discount: faker.datatype.number({ 'min': 0, 'max': 1 }) * faker.datatype.number({ 'min': 2, 'max': 8 }) * 10,
            favorite: false,
            category: randomCategory(),
        }

        products.push(
            generateLocalizedData(locales, () => ({
                ...el,
                name: randomFoodItems(),
                origin: faker.address.country(),
            }))
        )
    }

    return products
}


export { generateUsers, generateProducts }
