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
      fetch("http://localhost:3000/supply_orders")
      .then( resp => resp.json())
      .then( json => {
        setOrders(json)
      })
    }
  })

  const changeDate = (value, orderId) => {
    const body = {
      date: value
    }
    fetch(`http://localhost:3000/supply_orders/${orderId}`, {
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

  const renderDateField = (dateValue, orderId) => {
    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker value={dateValue} format="MM/dd/yyyy" onChange={() => changeDate(dateValue, orderId)}/>
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
    } else {
      return(<FaIcons.FaSortDown onClick={() => sortColumn(header)} />)
    }
  }

  const sortColumn = (header) => {
    const newOrders = [...orders]

    const convertDateToUTC = (date) => { 
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
    }

    // if the column being sorted is a date change the data to type Date so it can actually be sorted
    if (header.date) {;
      newOrders.forEach( order => order[header.key] = new Date(order[header.key]))
    }

    const getSortFunction = (header) => {
      if (header.sorted === "sort") {
        return( (a,b) => a[header.key] - b[header.key] )
      } else if (header.sorted === "up") {
        return( (a,b) => b[header.key] - a[header.key])
      } else {
        return( (a,b) => a )
      }
    }

    const setNewSortedValue = (sorted) => {
      if (sorted === "sort") return "up" 
      else if (sorted === "up") return "down"
      else return "sort"
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

  const renderCompleteButton = (completed) => {
    if (completed) {
      return <FaIcons.FaCheckCircle />
    } else {
      return <FaIcons.FaTimes color="Tomato" fontSize="28"/>
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
                {renderCompleteButton(order.completed)}
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