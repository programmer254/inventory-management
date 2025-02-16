"use client"

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header" ;//ABSOLUTE PATH
import {DataGrid, GridColDef} from "@mui/x-data-grid"
// import Header from "../(components)/Header";

const columns: GridColDef[] = [
    {field: "productId", headerName: "ID", width: 90},
    // FIELD IS BASICALLY THE PROP THAT YOU GET FROM USEGETPRODUCTQUERY 
    // SO THAT IT IDENTIFIES WHICH PROPERTY ALIGNS WITH WHICH COLUMN OF 
    // YOUR TABLE

    {field: "name", headerName: "Product Name", width: 200},
    {
        field: "price", 
        headerName: "Price", 
        width: 110, 
        type: "number", 
        // VALUEGETTER MAKES IT EASIER TO FORMAT VALUES THAT WE WANT IN THE ROWS
        valueGetter:(value, row)=>`$${row.price}`,
    },
    {
        field: "rating", 
        headerName: "Rating", 
        width: 110, 
        type: "number", 
        valueGetter:(value, row)=>row.rating? row.rating: "N/A",
    },
    {
        field: "stockQuantity", 
        headerName: "Stock Quantity", 
        width: 150, 
        type: "number", 
    },

]
const Inventory = () =>{

// BELOW IS PROVIDED BY REDUX TOOLKIT QUERY
const{ data: products, isError, isLoading } = useGetProductsQuery();
console.log("products:", products)

if(isLoading){
    return <div className="py-4">Loading...</div>
}
if(isError || !products){
    return(
        <div className="text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    )
}
    return <div className="flex flex-col">
        <Header name="Inventory" />
        <DataGrid 
        // ROWS IS WHAT WE BRINGING FROM THE BACKEND
            rows={products}
            columns={columns} 
            // WE NEED TO CHANGE OUR ROW ID BECAUSE BY DEFAULT IT TRIES TO 
            // GRAB THE ROW ID FOR OUR DATA USING THE ID STRING PROPERTY 
            // BUT INSTEAD WE NEED TO USE PRODUCT ID
            getRowId={(row) => row.productId} 
            checkboxSelection
            // PUTTING AN EXCLAMATION MARK BELOW OVERRIDES A SETTING
            className="bg-white shadow rounded-lg border-gray-200 mt-5 !text-gray-700"
        />
    </div>

}

export default Inventory;