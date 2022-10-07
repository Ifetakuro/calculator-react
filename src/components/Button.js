import React from "react";
export default function Button ({value, click}) {
  return (
    <button onClick={click}>{value}</button>
  )
}