
import React, { useState,useEffect } from 'react';
import { axiosPrivate as axios } from '../../../API/axios';
import { useNavigate } from 'react-router-dom';
import { Button, CloseButton } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { UseruseContext } from '../../../Context/Context';
import Avatar from '../Avatar/Avatar';
import SimpleImageSlider from "react-simple-image-slider";
import { ToastContainer, toast } from 'react-toastify';

function Message(props) {
  const navigate = useNavigate();
  const { userDetails } = UseruseContext();
  const [message, setMessage] = useState('')
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  const [imageFile ,setimageFile]=useState([])
  const [loading,setLoding]=useState(false)
  const[fetchUser,setFetchUser]=useState('')
  const [imageUrls, setImageUrls] = useState([]);
  let urls=[]

  const setFile = ((event) => {

    const files=event.target.files
   
      console.log(files.type,'kfbfbsb');
      setimageFile(files)
      for (let i = 0; i < files.length; i++) {  
       const url = URL.createObjectURL(files[i]);
        urls.push(url);
      }
      setImageUrls(urls);
      console.log(image,'umgesss');
    
    

  });

  const uploadPost = (async (e) => { 
    e.preventDefault();
    console.log(imageFile,'imageFile');
     setLoding(true)
     const data = new FormData();
     for(let i=0 ;i<imageFile.length;i++){
       data.append('file', imageFile[i]);
     }
    data.append('message',message);
    data.append('userId',userId)
    console.log([...data]);
    try {
     
        const post= await axios.post('/api/posts', 
        data,
        {

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ) 
       props.onData(post)
       setimageFile([])
       urls=[]
       setImageUrls([]);
       setMessage('')
       setLoding(false)
    } catch (error) {
      alert(error)
    }
  });
  useEffect(() => {  
    const fetchUser=(async()=>{
      const response= await axios.get(`/api/user/getuserdetails/${userId}`)
      setFetchUser(response.data)
    
    }) 
   fetchUser()

}, []);
  return (
    <div className=" shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-4/3">
      <div className="flex gap-1">
        <div className="pt-2 pl-3 ">
          <Avatar url={fetchUser.profilePicture} />
        </div>
        <div className="p-6 w-full  ">
          <input
            placeholder={`What's in your mind ${user.userDetails.username}?`}
            type="text"
            className="shareInput focus:outline-none w-5/6  "
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          // ref={desc}
          />
        </div>
      </div>
      <hr className="w-full h-1  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {imageUrls.length>0 && (
        <>
        <CloseButton onClick={() =>{ 
          setimageFile([])
          setImageUrls([])
          }} />
         

         <SimpleImageSlider
         width={800}
         height={350}
        images={imageUrls}
         showBullets={true}
         showNavs={true}
        
         />
          
        </>
      )}
      {/* {imageFile && Object.values(imageFile).map((file) => (
        // <div className="">
        //   <img src={URL.createObjectURL(file)} alt="" className="h-64 w-full" />
        //   <CloseButton onClick={() => setimageFile(null)} />
        // </div>
         <SimpleImageSlider
        width={896}
        height={504}
        images={URL.createObjectURL(file)}
        showBullets={true}
        showNavs={true}
      />
      ))} */}

         
      <form onSubmit={uploadPost}>
        <label>
          <div className="flex">
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              accept="image/*"
              onChange={setFile}
              multiple={true}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-red-500 w-8 h-8 ml-10 mt-2  cursor-pointer" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            <div className="mt-3 ml-2">
              <h1 className="font-bold text-black">Photos or vedios</h1>
            </div>
          </div>
        </label>
        <div className="grow text-right ml-10 -mt-6 my-2 mr-2">
          <Button
            colorScheme="blue"
            size="sm"
            type="submit"
            isLoading={loading}
          >
           Share
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Message;
