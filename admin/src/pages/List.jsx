import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { backendUrl, currency } from "../App";
import assets from "../assets/assets";

const List = ({token}) => {
  const [list, setList] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl + `/api/product/remove`,{id}, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        {/* ------------ List Table Title ---------------*/}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----------- List Table Items ------------ */}
        {list.map((item, index) => (
          <div className="grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm" key={index}>
            <img src={item.image[0]} className="w-38 h-38 object-cover" alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg text-orange-600">X</p>
          </div>
        ))}
      </div>
      {showScrollTop && (
        <div
          className="fixed bottom-8 right-12 bg-black cursor-pointer hover:scale-110 transition-all ease-in-out duration-200 hover:bg-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-50"
          onClick={handleScrollToTop}
        >
          <img src={assets.dropdown_icon} alt="Dropdown Icon" className="h-5 -rotate-90" />
        </div>
      )}
    </div>
  );
};

export default List;
