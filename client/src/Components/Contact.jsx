/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Contact({ listing }) {

  const [landLord, setLandLord] = useState(null);
  const [error, setError] = useState(false);
  const[message , setMessage] = useState("");
  // eslint-disable-next-line react/prop-types
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${landLord?.email}&su=Regarding ${listing?.name}&body=${message}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const res = await fetch(`/api/user/${listing?.userRef}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(data?.message);
          return;
        }
        setLandLord(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react/prop-types
  }, [listing?.userRef]);
  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2 mt-3">
          <p className="text-lg">
            Contact <span className="font-semibold">{landLord?.username} </span>
            {/* // eslint-disable-next-line react/prop-types */}
            for <span className="font-semibold">{listing?.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            placeholder="Enter Your Message..."
            className="w-full p-3 border rounded-lg outline-none resize-none"
            onChange={(e)=> setMessage(e.target.value)}
          ></textarea>
          <Link className="border p-3 text-white bg-slate-700 text-center rounded-lg hover:bg-opacity-95"
          to={gmailLink || `mailto:${landLord?.email}?subject=Regrading ${listing?.name}&body=${message}`}
          target="_blank"
          >
            Send message
          </Link>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
