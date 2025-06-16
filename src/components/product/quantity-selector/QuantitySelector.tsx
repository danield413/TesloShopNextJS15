'use client'

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

  const onChange = ( value: number) => {
    const newQuantity = quantity + value;

    // Quantity must be at least 1
    if (newQuantity < 1) {
      return;
    }

    onQuantityChange(newQuantity);
  }

  return (
    <div className="flex">
        <button 
            className=""
            onClick={() => onChange(-1)}
        >
            <IoRemoveCircleOutline size={30} />
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
            { quantity }
        </span>

        <button 
            className=""
            onClick={() => onChange(1)}
        >
            <IoAddCircleOutline size={30} />
        </button>
        
    </div>
  )
}
