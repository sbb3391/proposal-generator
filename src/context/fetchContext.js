import React, { createContext, useState } from 'react'
export const FetchContext = createContext()
const FetchContextProvider = (props) => {
    const [productionUrl, developmentUrl] = useState('somethingRandom')
    const Url = "http://localhost:3000"
    return (
         <SampleContext.Provider 
            value={{
                productionUrl,
                developmentUrl
             }}>
               {props.children}
         </SampleContext.Provider>
    )
}
export default FetchContextProvider