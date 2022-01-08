import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa"

function Filters() {

  const [filterView, setFilters] = useState(false)

  const showFilters = () => setFilters(!filterView)
  
  return (
    <>
      <div className="filters-window">
        <FaIcons.FaBars onClick={showFilters}/>
      </div>
    </>
  )
}

export default Filters
