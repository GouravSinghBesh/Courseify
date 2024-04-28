import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

const initialState = {
        cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
        total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
        totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}

const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        addToCart : (state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=>item.id === course._id);

            if(index >= 0){
                //course found in cart
                toast.error("course already in cart");
                return
            }
            
            //if the course is not in the cart add course in the cart
            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;

            //update it in the localStorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.cart.totalItems))

            toast.success("course added successfully")
        },

        removeFromCart : (state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=> item.id === course._id);

            if(index >= 0){
                //course found
                state.cart.splice(index,1);
                state.total -= course.price;
                state.totalItems--

                //update it in localstorage
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems".JOSN.stringify(state.totalItems));

                toast.success("course deleted successfully")
            }
        },

        resetCart : (state)=>{
            state.cart = []
            state.total = 0
            state.totalItems = 0

            // update it in localStorage
            localStorage.setItem("cart",state.cart);
            localStorage.setItem("total",state.total);
            localStorage.setItem("totalItems",state.totalItems)
        }
    }
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;

export default cartSlice.reducer;