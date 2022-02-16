import React, { Component } from 'react';

const BusinessSelect = (props) => {
    return (
        <select className = "form-control text-center"
            onChange={(e) => props.change(e)} 
            value = {props.val}>
            <option>_______Select Business_______</option>
            {props.businessArr.map((business, idx) => (
                <option key = {idx}>{business.businessname}</option>
            ))}
        </select>
    )
}

export default BusinessSelect;