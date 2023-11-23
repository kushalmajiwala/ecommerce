import React from 'react'
import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';

const AddProduct = ({ navcolor, mode }) => {

  const [colorArr, setColorArr] = useState([]);
  const [color, setColor] = useState("#000000");
  const [featured, setFeatured] = useState(true);
  const [image, setImage] = useState("");

  const addColor = () => {
    setColorArr(prevColor => [...prevColor, color]);
  }

  const removeColor = () => {
    setColorArr([]);
  }

  const onImageSelected = (e) => {
    // alert(URL.createObjectURL(e.target.files[0]))
    let img_url = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img_url);
    reader.onload = (ee) => {
      alert(ee.target.result);
    }
    alert(image);
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
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Company Name</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
          </div>
          <div className='md:flex justify-around items-center md:h-20'>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Price</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Category</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
                {/* <input type="color" value="#ff0000" className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' /> */}
              </div>
            </div>
          </div>
          <div className='md:flex justify-around items-center md:h-40'>
            <div className='md:w-full flex justify-center'>
              <div className=''>
                <label htmlFor="value" className='text-black'>Product Description</label><br />
                <textarea type="text" rows="5" className='w-64 md:w-[65vw] bg-gray-200 pl-3 rounded-md' />
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
                            <div className='pl-5'>
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
                      <RadioButton name="rb1" value="true" checked={featured === true} onChange={(e) => setFeatured(e.target.value)} />
                    </span>
                  </div>
                  <div className="p-inputgroup flex-1 w-20 mt-3">
                    <InputText value='FALSE' disabled />
                    <span className="p-inputgroup-addon">
                      <RadioButton name="rb1" value="false" checked={featured === false} onChange={(e) => setFeatured(e.target.value)} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Stock</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
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
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
