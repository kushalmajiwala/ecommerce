import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { Dialog } from 'primereact/dialog';
import ItemDetails from './ItemDetails';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { useAdminContext } from '../context/admin_context';

const AdminProductList = ({ products, navcolor, mode }) => {

  const { editProduct, getProductDetailsById, getProductStock } = useAdminContext();

  const [viewDetails, setViewDetails] = useState(false);
  const [viewDetailsId, setViewDetailsId] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [productDeleted, setProductDeleted] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editProductId, setEditProductId] = useState("");

  // Edit Product states
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [colorArr, setColorArr] = useState([]);
  const [color, setColor] = useState("#000000");
  const [featured, setFeatured] = useState(true);
  const [emptyField, setEmptyField] = useState(false);
  const [noColor, setNoColor] = useState(false);
  const [productEdited, setProductEdited] = useState(false);

  const addColor = () => {
    setColorArr(prevColor => [...prevColor, color]);
  }

  const removeColor = () => {
    setColorArr([]);
  }

  const openEditDialog = async (id) => {
    setEditProductId(id);
    setShowEditDialog(true);
    const all_details = await getProductDetailsById(id);
    const stock = await getProductStock(id);
    setProductName(all_details[0].name); 
    setCompanyName(all_details[0].company);
    setPrice(all_details[0].price);
    setCategory(all_details[0].category);
    setDescription(all_details[0].description);
    setColorArr(all_details[0].colors);
    setFeatured(all_details[0].featured);
    setStock(stock);
  }

  const validateFields = async () => {
    if (productName === "" || companyName === "" || price === "" || category === "" || description === "" || stock === "") {
      setEmptyField(true);
    }
    else if (colorArr.length < 1) {
      setNoColor(true);
    }
    else {
      await editProduct(editProductId, productName, companyName, price, category, description, colorArr, featured, stock);
      setProductName("");
      setCompanyName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setColorArr([]);
      setFeatured(true);
      setStock("");
      setProductEdited(true);
      editProductId("");
    }
  }

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

  const closeEditDialog = () => {
    setShowEditDialog(false);
    setProductName("");
    setCompanyName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setColorArr([]);
    setFeatured(true);
    setStock("");
  }

  const editSuccessfull = () => {
    setProductEdited(false);
    setShowEditDialog(false);
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
                        <img src={image} alt={name} className='w-5/6 md:w-[15vw] h-40' />
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
                            <button className='px-3 py-2.5 ml-2 text-sm bg-green-600 text-white hover:text-white hover:bg-green-700' onClick={() => openEditDialog(id)}>
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
            {/* Edit Dialog */}
            <Dialog visible={showEditDialog} draggable={false} className="w-11/12 md:w-11/12" onHide={closeEditDialog}>
              <div className='w-full pt-4 flex justify-center'>
                <div className={`color-white w-[90vw] md:w-[70vw] pb-14 shadow-md rounded-md border-2`}>
                  <div className='border-b-2 h-20 flex justify-center items-center pt-2'>
                    <p className='font-medium text-xl'>EDIT PRODUCT</p>
                  </div>
                  <div className='md:flex justify-around items-center md:h-20'>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Name</label><br />
                        <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={productName} onChange={(e) => setProductName(e.target.value)} />
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Company Name</label><br />
                        <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className='md:flex justify-around items-center md:h-20'>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Price</label><br />
                        <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Category</label><br />
                        <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={category} onChange={(e) => setCategory(e.target.value)} />
                        {/* <input type="color" value="#ff0000" className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' /> */}
                      </div>
                    </div>
                  </div>
                  <div className='md:flex justify-around items-center md:h-40'>
                    <div className='md:w-full flex justify-center'>
                      <div className=''>
                        <label htmlFor="value" className='text-black'>Product Description</label><br />
                        <textarea type="text" rows="5" className='w-64 md:w-[65vw] bg-gray-200 pl-3 rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className='md:flex justify-around items-center md:h-20'>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Color</label><br />
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' />
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-center items-center pt-4'>
                      <div className='flex justify-center mt-2'>
                        {
                          colorArr.length === 0
                            ?
                            <p className='font-bold text-lg text-black'>No Colors Added</p>
                            :
                            <div className='flex justify-center'>
                              {
                                colorArr.map((currColor, index) => {
                                  return (
                                    <div className='pl-5' key={index}>
                                      <p className="w-7 h-7 rounded-full" style={{ backgroundColor: currColor }}></p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <button className='bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600 shadow-lg text-white' onClick={addColor}>ADD COLOR</button>
                    <button className='bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 shadow-lg ml-3 text-white' onClick={removeColor}>REMOVE COLORS</button>
                  </div>
                  <div className='md:flex justify-around items-center md:h-20 mt-5'>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Featured</label><br />
                        <div className=''>
                          <div className="p-inputgroup flex-1 w-20">
                            <InputText value='TRUE' disabled />
                            <span className="p-inputgroup-addon">
                              <RadioButton inputId="ingredient1" name="rb1" value="true" checked={featured === true} onChange={(e) => setFeatured(true)} />
                            </span>
                          </div>
                          <div className="p-inputgroup flex-1 w-20 mt-3">
                            <InputText value='FALSE' disabled />
                            <span className="p-inputgroup-addon">
                              <RadioButton inputId="ingredient2" name="rb1" value="false" checked={featured === false} onChange={(e) => setFeatured(false)} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-center'>
                      <div>
                        <label htmlFor="value" className='text-black'>Product Stock</label><br />
                        <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={stock} onChange={(e) => setStock(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center mt-5'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-blue-600' onClick={validateFields}>EDIT PRODUCT</button>
                  </div>
                </div>
              </div>
              <div className='dialogs'>
                <Dialog visible={emptyField} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setEmptyField(false)}>
                  <div className='flex justify-center'>
                    <div className='text-center'>
                      <i className="bi bi-x-circle text-7xl text-red-500"></i>
                      <p className="font-bold text-lg mt-4">
                        Any of the fields should not be empty
                      </p>
                    </div>
                  </div>
                </Dialog>
                <Dialog visible={noColor} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setNoColor(false)}>
                  <div className='flex justify-center'>
                    <div className='text-center'>
                      <i className="bi bi-x-circle text-7xl text-red-500"></i>
                      <p className="font-bold text-lg mt-4">
                        Please choose atleast one product color
                      </p>
                    </div>
                  </div>
                </Dialog>
                <Dialog visible={productEdited} draggable={false} className="w-11/12 md:w-1/3" onHide={editSuccessfull}>
                  <div className='flex justify-center'>
                    <div className='text-center'>
                      <i className="bi bi-check-circle text-7xl text-green-500"></i>
                      <p className="font-bold text-lg mt-4">
                        Product Details Edited Successfully
                      </p>
                    </div>
                  </div>
                </Dialog>
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
                      <img src={image} alt={name} className='w-5/6 md:w-[15vw] h-40' />
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
                          <button className='px-3 py-2.5 ml-2 text-sm bg-green-600 text-white hover:text-white hover:bg-green-700' onClick={() => openEditDialog(id)}>
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
          {/* Edit Dialog */}
          <Dialog visible={showEditDialog} draggable={false} className="w-11/12 md:w-11/12" onHide={closeEditDialog}>
            <div className='w-full pt-4 flex justify-center'>
              <div className={`color-white w-[90vw] md:w-[70vw] pb-14 shadow-md rounded-md border-2`}>
                <div className='border-b-2 h-20 flex justify-center items-center pt-2'>
                  <p className='font-medium text-xl'>EDIT PRODUCT</p>
                </div>
                <div className='md:flex justify-around items-center md:h-20'>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Name</label><br />
                      <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Company Name</label><br />
                      <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='md:flex justify-around items-center md:h-20'>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Price</label><br />
                      <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Category</label><br />
                      <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={category} onChange={(e) => setCategory(e.target.value)} />
                      {/* <input type="color" value="#ff0000" className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' /> */}
                    </div>
                  </div>
                </div>
                <div className='md:flex justify-around items-center md:h-40'>
                  <div className='md:w-full flex justify-center'>
                    <div className=''>
                      <label htmlFor="value" className='text-black'>Product Description</label><br />
                      <textarea type="text" rows="5" className='w-64 md:w-[65vw] bg-gray-200 pl-3 rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='md:flex justify-around items-center md:h-20'>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Color</label><br />
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' />
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-center items-center pt-4'>
                    <div className='flex justify-center mt-2'>
                      {
                        colorArr.length === 0
                          ?
                          <p className='font-bold text-lg text-black'>No Colors Added</p>
                          :
                          <div className='flex justify-center'>
                            {
                              colorArr.map((currColor, index) => {
                                return (
                                  <div className='pl-5' key={index}>
                                    <p className="w-7 h-7 rounded-full" style={{ backgroundColor: currColor }}></p>
                                  </div>
                                )
                              })
                            }
                          </div>
                      }
                    </div>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <button className='bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600 shadow-lg text-white' onClick={addColor}>ADD COLOR</button>
                  <button className='bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 shadow-lg ml-3 text-white' onClick={removeColor}>REMOVE COLORS</button>
                </div>
                <div className='md:flex justify-around items-center md:h-20 mt-5'>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Featured</label><br />
                      <div className=''>
                        <div className="p-inputgroup flex-1 w-20">
                          <InputText value='TRUE' disabled />
                          <span className="p-inputgroup-addon">
                            <RadioButton inputId="ingredient1" name="rb1" value="true" checked={featured === true} onChange={(e) => setFeatured(true)} />
                          </span>
                        </div>
                        <div className="p-inputgroup flex-1 w-20 mt-3">
                          <InputText value='FALSE' disabled />
                          <span className="p-inputgroup-addon">
                            <RadioButton inputId="ingredient2" name="rb1" value="false" checked={featured === false} onChange={(e) => setFeatured(false)} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-center'>
                    <div>
                      <label htmlFor="value" className='text-black'>Product Stock</label><br />
                      <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='flex justify-center mt-5'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-blue-600' onClick={validateFields}>EDIT PRODUCT</button>
                </div>
              </div>
            </div>
            <div className='dialogs'>
              <Dialog visible={emptyField} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setEmptyField(false)}>
                <div className='flex justify-center'>
                  <div className='text-center'>
                    <i className="bi bi-x-circle text-7xl text-red-500"></i>
                    <p className="font-bold text-lg mt-4">
                      Any of the fields should not be empty
                    </p>
                  </div>
                </div>
              </Dialog>
              <Dialog visible={noColor} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setNoColor(false)}>
                <div className='flex justify-center'>
                  <div className='text-center'>
                    <i className="bi bi-x-circle text-7xl text-red-500"></i>
                    <p className="font-bold text-lg mt-4">
                      Please choose atleast one product color
                    </p>
                  </div>
                </div>
              </Dialog>
              <Dialog visible={productEdited} draggable={false} className="w-11/12 md:w-1/3" onHide={editSuccessfull}>
                <div className='flex justify-center'>
                  <div className='text-center'>
                    <i className="bi bi-check-circle text-7xl text-green-500"></i>
                    <p className="font-bold text-lg mt-4">
                      Product Details Edited Successfully
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default AdminProductList