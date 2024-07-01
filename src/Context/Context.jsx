import { createContext, useContext } from "react"


const Context = createContext()

export const useContextCar = () => {
    const context = useContext(Context)
    if (!context) throw new Error('There is no Context provider')
    return context
}



export function ProviderContext({ children }) {

    return (
        <Context.Provider
            value={{



            }}

        >
            {children}
        </Context.Provider>
    )

}