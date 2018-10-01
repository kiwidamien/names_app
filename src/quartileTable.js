import React from 'react';

const quartileTable = (props) => {
  return(
    <div className='quartileTable'>
    <table>
    <tbody>
      <tr><th>Name</th><th>Gender</th><th colSpan='3'>Percentiles</th></tr>
      <tr><th></th><th></th><th>25th</th><th>Median</th><th>75th</th></tr>
      <tr>
        <td>{props.name}</td>
        <td>{props.gender}</td>
        <td>{props.quartiles[0]} yrs</td>
        <td>{props.quartiles[1]} yrs</td>
        <td>{props.quartiles[2]} yrs</td>
      </tr>
    </tbody>
    </table>
    </div>
  )
}

export default quartileTable;
