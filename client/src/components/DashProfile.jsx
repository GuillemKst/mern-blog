import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux' 
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

{/*Serveix per selecionar dades de la DB*/ }
export default function DashProfile() {
  const {currentUser} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  };{/*Serveix per crear un event on devant un canvi es modifica la variable*/ }
{/*Hem canviat el codi de firebase/stoarge en la web de firebase*/ }


  useEffect(() =>{
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile])

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadingProgress(null);
        setImageFileUrl(null);
        setImageFile(null);

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

 
  




  return (
    <div className='w-full max-w-lg mx-auto p-3 '>
      <h1 className='my-8 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className=" relative w-48 h-48 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=> filePickerRef.current.click()}>
          {imageFileUploadingProgress  && (
            <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
              },
            }}/>
          )}
        <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightyellow]`}
         />
        </div> {/*QUan es cliki agafi la referencia del input de img*/ }
        <div className='flex flex-col items-center gap-4'>
          {imageFileUploadError && <Alert color={'failure'}>
            {imageFileUploadError}
          </Alert>}
          
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} style={{ textAlign: 'center' }} className='w-80'/>
        <TextInput type='email' id='email' placeholder='email@gmail.com' defaultValue={currentUser.email} style={{ textAlign: 'center' }} className='w-80'/>
        <TextInput type='password' id='password' placeholder='password' style={{ textAlign: 'center' }} className='w-80'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline className='shadow-md w-80'>
          Submit
        </Button>
        </div>

      </form>
      <div className='flex flex-col items-center'>
      <div className='text-red-500 items-center flex flex-row justify-between mt-5 w-80'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Delete Account</span>
      </div>
      </div>
    </div>
  )
}
