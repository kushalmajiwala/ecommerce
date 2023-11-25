import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { Dialog } from 'primereact/dialog';
import ItemDetails from './ItemDetails';
import { useState } from 'react';
import { Button } from 'primereact/button';

const AdminProductList = ({ products, navcolor, mode }) => {

  const [viewDetails, setViewDetails] = useState(false);
  const [viewDetailsId, setViewDetailsId] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [productDeleted, setProductDeleted] = useState(false);

  const openViewDetailsDialog = (id) => {
    setViewDetails(true);
    setViewDetailsId(id);
  }

  const openConfirmDeleteProductDialog = (id) => {
    setDeleteProduct(true);
    setDeleteProductId(id);
  }

  const deleteProductConfirmed = () => {
    setProductDeleted(true);
    setDeleteProduct(false);
  }

  const closeDeleteProductDialog = () => {
    setDeleteProduct(false);
    setDeleteProductId("");
  }


  if (mode === "light") {
    return (
      <>
        <div className='w-full flex justify-center'>
          <div className='-mt-7'>
            {
              products.map((curElem, index) => {
                const { id, name, image, price, description, category } = curElem;
                return (
                  <div key={index} className='bg-white w-11/12 md:w-5/6 ml-[4vw] md:ml-[6vw] p-2 md:flex  md:pt-5 mt-4 shadow-md'>
                    <div className=''>
                      <figure className='w-full md:w-[200px] flex items-center justify-center md:justify-start px-2 pt-2 mr-5'>
                        <img src={image} alt={name} className='w-180px md:w-[15vw] h-40' />
                      </figure>
                    </div>
                    <div className='pr-5 flex justify-start items-center'>
                      <div className='w-full -mt-2'>
                        <p className='text-2xl -mt-1'>{name}</p>
                        <p className='text-sm -mt-2 text-gray-400'><FormatPrice price={price} /></p>
                        <p className='test-sm -mt-4 text-justify'>{description.slice(0, 110)}</p>
                        <div className='md:flex'>
                          <div className='flex justify-around md:block'>
                            <button className='px-3 py-2.5 text-sm bg-blue-500 text-white hover:text-white hover:bg-blue-600' onClick={() => openViewDetailsDialog(id)}>
                              VIEW DETAILS
                            </button>
                            <button className='px-3 py-2.5 ml-2 text-sm bg-green-600 text-white hover:text-white hover:bg-green-700'>
                              EDIT DETAILS
                            </button>
                          </div>
                          <div className='flex justify-center md:block mt-2 md:mt-0'>
                            <button className='px-3 py-2.5 ml-2 text-sm md:-mt-2 bg-red-500 text-white hover:text-white hover:bg-red-600' onClick={() => openConfirmDeleteProductDialog(id)}>
                              DELETE PRODUCT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='dialogs'>
            <Dialog visible={viewDetails} draggable={false} className="w-11/12" onHide={() => setViewDetails(false)}>
              <div className='flex justify-center'>
                <ItemDetails id={viewDetailsId} />
              </div>
            </Dialog>
            <Dialog visible={deleteProduct} draggable={false} className="w-11/12 md:w-[37vw]" onHide={() => setDeleteProduct(false)}>
              <div className='flex justify-center'>
                <div className='text-center'>
                  <i className="bi bi-exclamation-circle text-7xl text-orange-400"></i>
                  <p className="font-bold text-lg mt-4">
                    Are you sure you want to delete this product?
                  </p>
                </div>
              </div>
              <div className='flex justify-end'>
                <span><Button label="YES, DELETE IT" severity="danger" className='mr-2' onClick={deleteProductConfirmed} /></span>
                <span className='ml-3'><Button label="NO" onClick={closeDeleteProductDialog} /></span>
              </div>
            </Dialog>
            <Dialog visible={productDeleted} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setProductDeleted(false)}>
              <div className='flex justify-center'>
                <div className='text-center'>
                  <i className="bi bi-check-circle text-7xl text-green-500"></i>
                  <p className="font-bold text-lg mt-4">
                    Product Deleted Successfully
                  </p>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='-mt-7'>
          {
            products.map((curElem, index) => {
              const { id, name, image, price, description, category } = curElem;
              return (
                <div key={index} className={`${navcolor} w-11/12 md:w-5/6 ml-[4vw] md:ml-[6vw] p-2 md:flex md:justify-center md:pt-5 border-2 border-gray-100 mt-4 shadow-md`}>
                 <div className=''>
                      <figure className='w-full md:w-[200px] flex items-center justify-center md:justify-start px-2 pt-2 mr-5'>
                        <img src={image} alt={name} className='w-180px md:w-[15vw] h-40' />
                      </figure>
                    </div>
                  <div className='pr-5 flex items-center'>
                    <div className='w-full -mt-2'>
                      <p className='text-2xl -mt-1 text-white'>{name}</p>
                      <p className='text-sm -mt-2 text-orange-400'><FormatPrice price={price} /></p>
                      <p className='test-sm -mt-4 text-justify text-white'>{description.slice(0, 110)}</p>
                      <div className='md:flex'>
                        <div className='flex justify-around md:block'>
                          <button className='px-3 py-2.5 text-sm bg-blue-500 text-white hover:text-white hover:bg-blue-600' onClick={() => openViewDetailsDialog(id)}>
                            VIEW DETAILS
                          </button>
                          <button className='px-3 py-2.5 ml-2 text-sm bg-green-600 text-white hover:text-white hover:bg-green-700'>
                            EDIT DETAILS
                          </button>
                        </div>
                        <div className='flex justify-center md:block mt-2 md:mt-0'>
                          <button className='px-3 py-2.5 ml-2 text-sm md:-mt-2 bg-red-500 text-white hover:text-white hover:bg-red-600' onClick={() => openConfirmDeleteProductDialog(id)}>
                            DELETE PRODUCT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='dialogs'>
          <Dialog visible={viewDetails} draggable={false} className="w-11/12" onHide={() => setViewDetails(false)}>
            <div className='flex justify-center'>
              <ItemDetails id={viewDetailsId} />
            </div>
          </Dialog>
          <Dialog visible={deleteProduct} draggable={false} className="w-11/12 md:w-[37vw]" onHide={() => setDeleteProduct(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-exclamation-circle text-7xl text-orange-400"></i>
                <p className="font-bold text-lg mt-4">
                  Are you sure you want to delete this product?
                </p>
              </div>
            </div>
            <div className='flex justify-end'>
              <span><Button label="YES, DELETE IT" severity="danger" className='mr-2' onClick={deleteProductConfirmed} /></span>
              <span className='ml-3'><Button label="NO" onClick={closeDeleteProductDialog} /></span>
            </div>
          </Dialog>
          <Dialog visible={productDeleted} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setProductDeleted(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                <p className="font-bold text-lg mt-4">
                  Product Deleted Successfully
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default AdminProductList