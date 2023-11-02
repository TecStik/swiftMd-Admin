import React from 'react'
import {Pagination} from "@mui/material";

const PaginationComponent = ({totalPages,page,onChange}) => {
  return (
    <div style={{display:"flex",justifyContent:'center',alignItems:"center",marginTop:"30px"}}>
        <Pagination count={totalPages} page={page} color='primary' onChange={onChange}/>
    </div>
  )
}

export default PaginationComponent
