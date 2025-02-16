"use client"

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header" ;//ABSOLUTE PATH
import {DataGrid, GridColDef} from "@mui/x-data-grid"
// import Header from "../(components)/Header";

const columns: GridColDef[] = [
    {field: "userId", headerName: "ID", width: 90},
    // FIELD IS BASICALLY THE PROP THAT YOU GET FROM USEGETUSERSQUERY
    // SO THAT IT IDENTIFIES WHICH PROPERTY ALIGNS WITH WHICH COLUMN OF 
    // YOUR TABLE

    {field: "name", headerName: "Name", width: 200},
    {field: "email", headerName: "Email", width: 200},
    

]
const Users = () =>{

// BELOW IS PROVIDED BY REDUX TOOLKIT QUERY
const{ data: users, isError, isLoading } = useGetUsersQuery();
console.log("users:", users)

if(isLoading){
    return <div className="py-4">Loading...</div>
}
if(isError || !users){
    return(
        <div className="text-center text-red-500 py-4">
            Failed to fetch users.
        </div>
    )
}
    return <div className="flex flex-col">
        <Header name="Users" />
        <DataGrid 
        // ROWS IS WHAT WE BRINGING FROM THE BACKEND
            rows={users}
            columns={columns} 
            // WE NEED TO CHANGE OUR ROW ID BECAUSE BY DEFAULT IT TRIES TO 
            // GRAB THE ROW ID FOR OUR DATA USING THE ID STRING PROPERTY 
            // BUT INSTEAD WE NEED TO USE PRODUCT ID
            getRowId={(row) => row.userId} 
            checkboxSelection
            // PUTTING AN EXCLAMATION MARK BELOW OVERRIDES A SETTING
            className="bg-white shadow rounded-lg border-gray-200 mt-5 !text-gray-700"
        />
    </div>

}

export default Users;