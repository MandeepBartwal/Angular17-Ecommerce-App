export interface credentials {
  username: string
  password: string
}

export interface userInfo {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export interface accessInfo {
  accessToken: string
  userID: number
  isLoogedIn: boolean
}

export interface productData {
  limit: number
  skip: number
  total: number
  products: product[]
}

export interface product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}
