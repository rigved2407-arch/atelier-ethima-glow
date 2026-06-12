import { createContext, useContext, useCallback, useMemo, useReducer, type ReactNode } from "react"

export interface CartItem {
  variantSku: string
  productSlug: string
  productName: string
  metal: string
  price: number
  quantity: number
  image: string
}

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { variantSku: string } }
  | { type: "UPDATE_QTY"; payload: { variantSku: string; quantity: number } }
  | { type: "CLEAR" }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.variantSku === action.payload.variantSku)
      if (existing) {
        return state.map((i) =>
          i.variantSku === action.payload.variantSku
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i,
        )
      }
      return [...state, action.payload]
    }
    case "REMOVE":
      return state.filter((i) => i.variantSku !== action.payload.variantSku)
    case "UPDATE_QTY":
      return state.map((i) =>
        i.variantSku === action.payload.variantSku
          ? { ...i, quantity: action.payload.quantity }
          : i,
      )
    case "CLEAR":
      return []
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantSku: string) => void
  updateQuantity: (variantSku: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD", payload: item }), [])
  const removeItem = useCallback(
    (variantSku: string) => dispatch({ type: "REMOVE", payload: { variantSku } }),
    [],
  )
  const updateQuantity = useCallback(
    (variantSku: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { variantSku, quantity } }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), [])

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  const ctx = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice],
  )

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>
}

function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}

export { CartProvider, useCart }
