import React, { Fragment, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { findByDisplayValue } from "@testing-library/dom";

function KeyboardDatePickerExample(props) {

  const [date, setDate] = useState(props.date)

  const handleChange = (val, orderId) => {
    setDate(val)
    props.changeDate(val, orderId)
  }

  return (
    <Fragment>
      <KeyboardDatePicker
        value={date}
        onChange={(val) => handleChange(val, props.orderId)}
        format="MM/dd/yyyy"
      />
    </Fragment>
  );
}

export default KeyboardDatePickerExample;