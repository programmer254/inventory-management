import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

// EVERYTIME WE SENDING IT BACK, WE DONT SEND BACK THE PRODUCT ID BECAUSE WE DO NOT NEED IT

export interface NewProduct {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  // WHAT WE GET FROM SOURCE CONTROLLERS req.json GETS SAVED INTO DASHBOARDMETRICS TAGS
  // YOU SPECIFY IT YOURSELF SO THAT INCASE LATER ON IF YOU WANT TO INVALIDATE E.G EXAMPLE
  // UPDATE SAY YOU HAD A POST DASHBOARD AND WE NEED TO MODIFY IT FROM FRONT END FOR EXAMPLE
  // WE HAD POST DASHBOARD METRICS AND WE HAVE SOME INVALIDATE TAG PROPERTY I.E providesTags
  // WE CAN REFRESH THE tagTypes "DASHBOARDMETRICS" ANY TIME YOU MAKE A POST REQUEST. THIS IS
  // THE POWER OF BOTH REACT QUERY AND REDUX TOOLKIT QUERY. THIS BASICALLY ALLOWS YOU TO
  // DETERMINE WHEN IT GETS INVALIDATED MEANING YOU REFETCH THAT API TO GET AN UPDATED SET OF
  // DATA WHICH IS VERY USEFUL
  // SO YOU DONT ALWAYS WANT TO MAKE A POST REQUEST TO THE BACKEND AND THEN HAVE TO GET A
  // DASHBOARD METRICS CALL AGAIN MANUALLY. YOU DONT ALWAYS WANT TO DO THAT. THIS WILL MANAGE
  // IT FOR YOU

  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  // API CALLS
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      transformResponse: (response: any) => {
    console.log("Transformed Response:", response);
    return response; // Ensure `salesSummary` is returned properly
  },
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        // OPTIONALLY IT EXISTS OR IT'S AN EMPTY OBJECT
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        // OPTIONALLY IT EXISTS OR IT'S AN EMPTY OBJECT
        method: "POST",
        body: newProduct,
      }),
      // UPDATING OUR LIST OF PRODUCTS
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
        query:() => "/users",
        providesTags:["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"]
    })
  }),
});

// BELOW WILL HIT END POINTS IN OUR ROTUES FILES
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
