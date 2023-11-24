import React from 'react'
import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from 'primereact/dialog';
import { useAdminContext } from '../context/admin_context';

const supabase = createClient("https://ngaxtqtjphtkyssalygr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODM4NjI4MywiZXhwIjoyMDAzOTYyMjgzfQ.xeYb9sOv7xv0IsOjEoKj9vTyUxi3K29PHjsHj00HJRU")
const storage_url = "https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images"

const AddProduct = ({ navcolor, mode }) => {

  const { addNewProduct } = useAdminContext();

  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [colorArr, setColorArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [color, setColor] = useState("#000000");
  const [featured, setFeatured] = useState(true);
  const [image, setImage] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [noColor, setNoColor] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const addColor = () => {
    setColorArr(prevColor => [...prevColor, color]);
  }

  const removeColor = () => {
    setColorArr([]);
  }

  const onImageSelected = async (e) => {
    let img = e.target.files[0];
    const { data, error } = await supabase.storage
      .from('images')
      .upload(uuidv4() + ".jpg", img, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) console.log(error);
    const image_url = storage_url + "/" + data.path;
    setImageArr(prevImage => [...prevImage, image_url]);
  }

  const validateFields = () => {
    if (productName === "" || companyName === "" || price === "" || category === "" || description === "" || stock === "") {
      setEmptyField(true);
    }
    else if (colorArr.length < 1) {
      setNoColor(true);
    }
    else if (imageArr.length < 4) {
      setNoImage(true);
    }
    else {
      addNewProduct(productName, companyName, price, category, description, colorArr, featured, stock, imageArr);
      setProductName("");
      setCompanyName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setColorArr([]);
      setFeatured(true);
      setStock("");
      setImageArr([]);
      setProductAdded(true);
    }
  }

  return (
    <>
      <div className='w-full pt-4 flex justify-center'>
        <div className='bg-white w-[90vw] md:w-[70vw] pb-14 shadow-md rounded-md'>
          <div className='border-b-2 h-20 flex justify-center items-center pt-2'>
            <p className='font-medium text-xl text-black'>ADD NEW PRODUCT</p>
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
                    <p className='font-bold text-lg'>No Colors Added</p>
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
          <div className='mt-3'>
            <div className='w-full md:mt-16 flex justify-center'>
              <p className='font-bold text-xl'>UPLOAD 4 IMAGES TO DISPLAY</p>
            </div>
            <div className='w-full flex justify-center'>
              {/* <FileUpload name="files" onSelect={(e) => onImageSelected(e)} onBeforeUpload={() => alert("Uploading...")} accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0 flex justify-center">Drag and drop files to here to upload.</p>} /> */}
              <div className='w-full px-8 md:px-40'>
                <label class="block text-xl font-medium text-gray-900" for="default_size">Select Image</label>
                <input class="block w-full mb-5 text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" value={image} name='file' onChange={(e) => onImageSelected(e)} />
              </div>
            </div>
            <div className='md:flex md:justify-around'>
              {
                imageArr.length === 0
                  ?
                  <p className='font-bold text-lg flex justify-center'>No Image Added</p>
                  :
                  imageArr.map((currImage, index) => {
                    return (
                      <div className='flex justify-center mt-2' key={index}>
                        <img src={currImage} alt="no-image" className=' w-48 h-40' />
                      </div>
                    )
                  })
              }
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-blue-600' onClick={validateFields}>ADD PRODUCT</button>
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
        <Dialog visible={noImage} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setNoImage(false)}>
          <div className='flex justify-center'>
            <div className='text-center'>
              <i className="bi bi-x-circle text-7xl text-red-500"></i>
              <p className="font-bold text-lg mt-4">
                Please Select 4 images to display
              </p>
            </div>
          </div>
        </Dialog>
        <Dialog visible={productAdded} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setProductAdded(false)}>
          <div className='flex justify-center'>
            <div className='text-center'>
              <i className="bi bi-check-circle text-7xl text-green-500"></i>
              <p className="font-bold text-lg mt-4">
                Product Added Successfully
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default AddProduct
