"use client"

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react"
import Header from "@/app/(components)/Header"; //ABSOLUTE PATH
// import Header from "../(components)/Header";
import { Product } from '../../../../.history/client/src/state/api_20250208190927';
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};

const Products = () => {

    // WE FIRST CREATE SOME STATE

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // IF WE WANT TO PASS A VALUE OR A PARAM TO OUR REDUX TOOLKIT HOOK YOU PASS IT 
    // TO useGetProductsQuery() E.G useGetProductsQuery(searchTerm)

    // searchTerm NEEDS TO BE INSTANTIATED BEFOREHAND BEFORE PUTTING THE useGetProducts 
    // SO THAT WE COULD SEND IT TO OUR BACKEND 

    // GRABBING THE GET PRODUCT LIST
    const{
        data: products, 
        isLoading, 
        isError 
    }= useGetProductsQuery(searchTerm);

        // CREATING THE CREATE PRODUCT MUTATION IN THE MAIN PAGE AND PASSING IT DOWN TO OUR MODEL WHICH GOES TO THE CODE INISIDE 
        // (CreateProductModal.tsx). WE CREATE OUR FORM STATE IN OUR FORM DATA AND SEND TO BACKEND USING 
        // (handleCreateProduct inside CreateProductModal.tsx)INSIDE OUR MODAL WE ARE CREATING OUR FORM STATE TO SEND TO THE BACKEND 
        // WHERE WE DO (handleSubmit) THAT  WILL TRIGGER MUTATION CALL CREATED EARLIER onCreate(formData)
        
    const[createProduct] = useCreateProductMutation();

    // CALLING THE API
    const handleCreateProduct = async(productData: ProductFormData) => {
        await createProduct(productData);
    }

    if(isLoading){
        return <div className="py-4">Loading...</div>
    }

    if(isError  || !products){
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        );
    }

    return <div className="mx-auto pb-5 w-full">
        {/* SEARCH BAR */}
        <div className="mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded">
                <SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
                <input 
                className="w-full py-2 px-4 rounded bg-white" 
                placeholder="Search products... " 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
        {/* HEADER BAR*/}
        <div className="flex justify-between items-center mb-6">
            <Header name="Products"/>
            <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold px-2 py-4 rounded"
            onClick={() =>setIsModalOpen(true)}>
                <PlusCircleIcon className="w-2 h-5 mr-2 !text-gray-200"/> Create Product
            </button>
        </div>
        {/* BODY PRODUCTS LIST */}
        {/* THE GRID HAS RESPONSIVE DESIGN BAKED IN AND YOU DON'T HAVE TO ADD ANY CLASSES ANYWHERE ELSE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
            {/* IS LOADING IS ONLY LOADING IN THE PRODUCT LIST AND NOT ANYWHERE ELSE */}
            {isLoading ? (<div>Loading...</div>) :(
                products?.map((product) => (
                    <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <img src="" alt="" />
                            <h3 className="text-lg text-gray-900 font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-800">${product.price.toFixed(2)}</p>
                            <div className="text-sm text-gray-600 mt-1">
                                Stock: {product.stockQuantity}
                            </div>
                            {product.rating && (
                                <div className="flex items-center mt-2">
                                    <Rating 
                                    rating={product.rating}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                ))
            )}
        </div>
        {/* MODAL */}
        <CreateProductModal 
        isOpen={isModalOpen} 
        onClose = {()=> setIsModalOpen(false)} 
        onCreate={handleCreateProduct}/>

    </div>
    }

   


export default Products