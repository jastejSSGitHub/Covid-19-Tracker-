import React from 'react'
import "./Table.css";
import numeral from "numeral";
import { prettyPrintStat } from "./util";


function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                    <strong>{prettyPrintStat(numeral(cases).format("0,0"))}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
