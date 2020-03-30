import React from 'react';

const DropdownSimple = ({filter}) => {
  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1"><h5>Filter by Resource</h5></label>
      <select onChange={(e) => filter(e.target.value)} className="form-control" id="exampleFormControlSelect1">
        <option value="">All</option>
        <option value="Face mask">Face mask</option>
        <option value="Gloves">Gloves</option>
      </select>
    </div>
  )
}

export default DropdownSimple;
