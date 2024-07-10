import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,signOutUserFailure, signOutUserSuccess
} from "../app/user/userSlice";
import { Link } from "react-router-dom"

function Profile() {
  const fileref = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileUploadPerc, setFileUploadPerc] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListing , setUserListing] = useState([]);
  const [listingError , setListingError] = useState(false);

  const dispatch = useDispatch();

  const handleFileUplaod = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data?.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignout(){
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error?.message));
    }
  }


  const handleUserListing = async() =>{
    try {
      const res = await fetch(`/api/user/listing/${currentUser?._id}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteListing = async(listingID) =>{
    try {
      const res = await fetch(`/api/listing/delete/${listingID}`,{
        method : "DELETE"
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        console.log(data?.message);
        return;
      }
      setUserListing((prev) => {
        prev.filter((listing) => listing._id !== listingID);
      })
        
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUplaod(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden
          ref={fileref}
          accept="image/*"
        />
        <figure className="flex flex-col">
          <img
            onClick={() => fileref.current.click()}
            src={formData.avatar || currentUser?.avatar}
            alt="profile_picture"
            className="rounded-full h-24 w-24 object-cover self-center cursor-pointer"
          />
          <figcaption className="text-center mt-1">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Uploading File..(image must be less than 2 MB)
              </span>
            ) : fileUploadPerc > 0 && fileUploadPerc < 100 ? (
              <span>{`Uploading ${fileUploadPerc}%`}</span>
            ) : fileUploadPerc === 100 ? (
              <span className="text-green-700">File Uploaded Successfully</span>
            ) : (
              ""
            )}
          </figcaption>
        </figure>
        <input
          type="text"
          placeholder="username"
          className="rounded-lg p-3 outline-none border mt-2"
          id="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg p-3 outline-none border"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg p-3 outline-none border"
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white uppercase"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
        <Link to="/create-listing" className="bg-green-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white uppercase text-center">
        Create Listing
        </Link>

      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser} >Delete account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
      <p className="text-red-700 mt-2">{error}</p>
      <p className="text-green-700">
        {updateSuccess ? "User Updated Successfully" : ""}
      </p>
      <p className="text-green-700 text-center text-md hover:underline cursor-pointer mt-2" onClick={handleUserListing}>Show Listing</p>
        <p className='text-red-700 mt-5'>
        {listingError ? 'Error showing listings' : ''}
       </p>
       {
        userListing && userListing.length>0 && (
          <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )
       }

    </div>
  );
}

export default Profile;
