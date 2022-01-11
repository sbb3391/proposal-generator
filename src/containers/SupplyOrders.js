import React, { Component, Fragment, useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import SupplyOrderHeader from '../components/SupplyOrderHeader'
import Filters from '../components/Filters'
import * as FaIcons from "react-icons/fa"
import { fetchUrl } from "../actions/fetches"


const SupplyOrders = (props) => {

  const [orders, setOrders] = useState([])
  const [columnHeaders, setColumnHeaders] = useState([
      {
        value: "Customer",
        key: "customer",
        sorted: "sort",
        date: false
      },
      {
        value: "Order Number",
        key: "order_number",
        sorted: "sort",
        date: false
      },
      {
        value: "Date Entered",
        key: "date_entered",
        sorted: "sort",
        date: true
      },
      {
        value: "Date Escalated",
        key: "date_escalated",
        sorted: "sort",
        date: true
      },
      {
        value: "Due Date",
        key: "due_date",
        sorted: "sort",
        date: true
      },
      {
        value: "Completed",
        key: "completed",
        sorted: "sort",
        date: false
      }
  ])

  useEffect( () => {
    if (orders.length === 0) {
      fetch(`${fetchUrl}/supply_orders`)
      .then( resp => resp.json())
      .then( json => {
        setOrders(json)
      })
    }
  })

  const changeDate = (value, orderId) => {
    const body = {
      due_date: value
    }

    fetch(`${fetchUrl}/supply_orders/${orderId}`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
        },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then( resp => resp.json())
    .then( json => {
      const newOrders = [...orders]

      newOrders.forEach( order => {
        if (order.id === json.id) {
          order.due_date = json.due_date
        }
      })

      setOrders(newOrders)
    })
  }

  const renderDateField = (dateValue, orderId) => {
    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker value={dateValue} format="MM/dd/yyyy" onChange={(newValue) => changeDate(newValue, orderId)}/>
      </MuiPickersUtilsProvider>
    )
  }

  const renderReadOnlyDateField = (dateValue) => {
    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker 
          value={dateValue}
          format="MM/dd/yyyy"
          readOnly
          style={{border: "none"}}
          InputProps={{
            disableUnderline: true,
            textAlign: "center"
           }}
        />
      </MuiPickersUtilsProvider>
    )
  }

  const renderSortIcon = (header) => {
    if (header.sorted === "sort") {
      return(<FaIcons.FaSort onClick={() => sortColumn(header)}/>)
    } else if (header.sorted === "up") {
      return(<FaIcons.FaSortUp onClick={() => sortColumn(header)} />) 
    } else if (header.sorted === "down") {
      return(<FaIcons.FaSortDown onClick={() => sortColumn(header)} />)
    }
  }

  const sortColumn = (header) => {
    const newOrders = [...orders]

    // if the column being sorted is a date change the data to type Date so it can actually be sorted
    if (header.date) {;
      newOrders.forEach( order => order[header.key] = new Date(order[header.key]))
    }

    const getSortFunction = (header) => {
      if (header.sorted === "sort") {
        return( (a,b) => a[header.key] - b[header.key] )
      } else if (header.sorted === "up") {
        return( (a,b) => b[header.key] - a[header.key])
      } else if (header.sorted === "down") {
        return( (a,b) => a[header.key] - b[header.key] )
      }
    }

    const setNewSortedValue = (sorted) => {
      if (sorted === "sort") return "up" 
      else if (sorted === "up") return "down"
      else if (sorted === "down") return "up"
    }


    newOrders.sort(getSortFunction(header))

    const newHeaders = [...columnHeaders].map( h => {
      if (h.value === header.value) {
        h.sorted = setNewSortedValue(h.sorted)
      } else {
        h.sorted = "sort"
      }
      return h
    })

    setOrders(newOrders)
    setColumnHeaders(newHeaders)
  }

  const checkToToggleCompleteButton = ord => {
    if (window.confirm("Uncomplete Supply Order?")) {
      toggleCompleteButton(ord)
    }
  }

  const toggleCompleteButton = (ord) => {
    const toggle = ord.completed ? false : true

    const newOrders = [...orders]

    newOrders.forEach( order => {
      if (order.id === ord.id) {
        order.completed = toggle
      }
    })

    setOrders(newOrders)

    const body = {
      completed: toggle
    }

    fetch(`${fetchUrl}/supply_orders/${ord.id}`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
        },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then( resp => resp.json())
    .then( json => {
    })
  }

  const renderCompleteButton = (order) => {
    if (order.completed) {
      return <FaIcons.FaCheckCircle color="Green" fontSize="28" onClick={() => {checkToToggleCompleteButton(order)}} />
    } else {
      return <FaIcons.FaTimes color="Tomato" fontSize="28" onClick={() => toggleCompleteButton(order)}/>
    }
  
  }

  const renderOrders = () => {
    return (
      orders.map( order => {
        return(
          <tr>
            <td>{order.customer}</td>
            <td>{order.order_number}</td>
            <td>{renderReadOnlyDateField(order.date_entered)}</td>
            <td>{renderReadOnlyDateField(order.date_escalated)}</td>
            <td>{renderDateField(order.due_date, order.id) }</td>
            <td align="center">
              <button className="">
                {renderCompleteButton(order)}
              </button>
            </td>
          </tr>
        )
      })
    )
  }

  return(
    <div className="w-full flex flex-col">
      <div className="w-full h-12">
        <Filters />
      </div>
      <div className="w-1/2">
        <table className="w-full">
          <colgroup>
            <col width="18%" />
            <col width="13%" />
            <col width="13%"/>
            <col width="13%"/>
            <col width="13%"/>
            <col width="10%"/>
          </colgroup> 
          <thead>
            <tr align="left">
              {
                columnHeaders.map( header => {
                  return(
                    <th>
                      {header.value}
                      <button className="pl-2">
                        {renderSortIcon(header)}
                      </button>
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          {renderOrders()}
        </table>
      </div>
      {/* <div className="flex space-x-12 pl-8">
        <span>{props.text}</span>
        <SupplyOrderHeader text={"Customer"} />
        <SupplyOrderHeader text={"Order Number"} />
        <SupplyOrderHeader text={"Date Entered"} />
        <SupplyOrderHeader text={"Date Escalated"} />
        <SupplyOrderHeader text={"Due Date"} />
      </div>
      <div className="flex flex-col space-y-3 mx-auto pt-4">
        {renderOrders()}
      </div> */}
    </div>
  )

}

export default SupplyOrders;