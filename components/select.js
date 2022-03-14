import React from "react";
// import Select from "react-select"; Use it when createble custom events is false
import CreatableSelect from "react-select/creatable";

export default function Select({ options, name }) {
  return (
    <CreatableSelect
      isClearable
      isMulti
      isSearchable
      name={name}
      placeholder={options[0].label}
      options={options}
      className="basic-multi-select m-2"
      classNamePrefix="select"
    />
  );
}
