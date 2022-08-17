import React from "react"
import loaderStyles from "../styles/Loader.module.css"


const Loader: React.FC = () => {
  return (
    <div className={loaderStyles.loader_wrapper} data-testid="loader">
      <div className={loaderStyles.loader}></div>
    </div>
  )
}

export default Loader
