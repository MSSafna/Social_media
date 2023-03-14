/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, CloseButton } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { UseruseContext } from '../../../Context/Context';
import Avatar from '../Avatar/Avatar';
import { CLOUDINARY_BASEURL } from '../../../cloudinary';

// dotenv.config();
function Message() {
  const navigate = useNavigate();
  const { userDetails } = UseruseContext();
  const [pic, setPic] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = jwtDecode(userDetails);
  const setFile = ((file) => {
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'social_media');
    data.append('cloud_name', 'do4my2sxk');
    fetch(CLOUDINARY_BASEURL, {
      method: 'post',
      body: data,
    }).then((res) => {
      // eslint-disable-next-line no-shadow
      res.json().then((data) => {
        setPic(data.url.toString());
        setLoading(false);
      });
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  });

  const uploadPost = (async (e) => {
    e.preventDefault();
    try {
      // const config = {
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      // };
      // eslint-disable-next-line no-unused-expressions
      pic || message ? await axios.post('/api/posts', {
        pic, message, userDetails,
      }) : navigate('/home');
      location.reload();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-4/3">
      <div className="flex gap-1">
        <div className="pt-2 pl-3 ">
          <Avatar url={user.id.profilePicture} />
        </div>
        <div className="p-6 w-full">
          <input
            type="text"
            placeholder={`What's in your mind ${user.id.username}?`}
            className="shareInput focus:outline-none w-5/6  "
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          // ref={desc}
          />
        </div>
      </div>
      <hr className="w-full h-1  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {pic && (
        <div className="">
          <img src={pic} alt="" className=" h-64 w-full" />
          <CloseButton onClick={() => setPic(null)} />
        </div>
      )}
      <form onSubmit={uploadPost}>
        <label>
          <div className="flex">
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-red-500 w-8 h-8 ml-10 mt-2  cursor-pointer" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            <div className="mt-3 ml-2">
              <h1 className="font-bold">Photos or vedios</h1>
            </div>
          </div>
        </label>
        <div className="grow text-right ml-10 -mt-6 my-2 mr-2">
          <Button
            colorScheme="green"
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
