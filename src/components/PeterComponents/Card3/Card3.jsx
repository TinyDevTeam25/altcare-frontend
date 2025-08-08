import React from 'react'
import { Link } from 'react-router-dom'
function Card3 ({
    pix,
    topic,
    tn,
    da,
    re,
    pr,
    cbc,
    date1,
    nor1,
    nor2,
    Dr1,
    vd1,
    vd2,
    vd3,
    cp,
    date2,
    ldl,
    Dr2,
    Dr3,
     color1,
   color2,
   color3,
    ur,
    date3,
    vw,
    arrow,})
    {

  return (
    <div className="results-container">
      <div className='results-header'>
        <img src={pix} alt="" />
        <h2 className='topi'>{topic}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>{tn}</th>
            <th>{da}</th>
            <th>{re}</th>
            <th>{pr}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cbc}</td>
            <td>{date1}</td>
            <td className="normal" style={{ color: color1 }}>
              {nor1}
            </td>
            <td>{Dr1}</td>
            <td>
              <span className="view-link" style={{ color: color3 }}>
                {vd1}
              </span>
            </td>
          </tr>
          <tr>
            <td>{cp}</td>
            <td>{date2}</td>
            <td className="elevated" style={{ color: color2 }}>
              {ldl}
            </td>
            <td>{Dr2}</td>
            <td>
              <span className="view-link" style={{ color: color3 }}>
                {vd2}
              </span>
            </td>
          </tr>
          <tr>
            <td>{ur}</td>
            <td>{date3}</td>
            <td className="normal" style={{ color: color1 }}>
              {nor2}
            </td>
            <td>{Dr3}</td>
            <td>
              <span className="view-link" style={{ color: color3 }}>
                {vd3}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="" className="view-all">
        {vw}
        {arrow}
      </Link>
    </div>
  );
}
export default Card3;





