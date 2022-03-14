import React from "react";
// import Select from "react-select"; Use it when createble custom events is false
import CreatableSelect from "react-select/creatable";

export default function Select({ options, name }) {
  const checkMulti = name.includes("dimension")
    ? true
    : false || name.includes("metric")
    ? true
    : false;
  const placeholder = name.includes("start")
    ? "Start Date"
    : null || name.includes("dimension")
    ? "Choose dimension(s)"
    : null || name.includes("metric")
    ? "Choose metric(s)"
    : null || name.includes("end")
    ? "End Date"
    : null;

  return (
    <CreatableSelect
      isClearable
      isMulti={checkMulti}
      isSearchable
      name={name}
      placeholder={placeholder}
      options={options}
      className="basic-multi-select m-2"
      classNamePrefix="select"
    />
  );
}
