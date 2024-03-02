import React from 'react'
import { useParams } from 'react-router-dom'

export default function Cart() {
    const {id} = useParams();
  return (
    <div>
      Cart {id}
    </div>
  )
}
