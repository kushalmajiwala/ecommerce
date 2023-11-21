import React from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import AdminProductList from './AdminProductList';
import { useAdminContext } from '../context/admin_context';


const ViewProducts = ({ navcolor, mode }) => {

  const navigate = useNavigate();
  const { product, total_product } = useAdminContext();

  const goToAddProduct = () => {
    navigate("/adminhome/addproduct");
  }

  if (total_product === 0) {
    return (
      <>
        <div className='w-full'>
          <div className='w-full pt-3 pl-3'>
            <Button label="ADD NEW PRODUCT" icon="bi bi-plus-lg" onClick={goToAddProduct} />
          </div>
          <div className='mt-5 flex justify-center'>
            <div className='flex w-full'>
              <div className='flex w-full justify-center pt-[22vh]'>
                {
                  mode == "light" ?
                    <p className='font-semibold text-xl text-black'>NO PRODUCTS AVAILABLE</p>
                    :
                    <p className='font-semibold text-xl text-white'>NO PRODUCTS AVAILABLE</p>

                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } 

  return (
    <>
      <div className='w-full'>
        <div className='w-full pt-3 pl-3'>
          <Button label="ADD NEW PRODUCT" icon="bi bi-plus-lg" onClick={goToAddProduct} />
        </div>
        <div className='mt-5 w-full flex justify-center'>
          <AdminProductList products={product} navcolor={navcolor} mode={mode} />
        </div>
      </div>
    </>
  )
}

export default ViewProducts