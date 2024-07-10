import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../app/user/userSlice";
import OAuth from "../Components/OAuth";

const INITIAL_DATA ={
  email: "",
  password: "",
}

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_DATA);
  const dispatch = useDispatch();
  const { loading , error} = useSelector((state)=> state.user);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSubmit(e){
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(res.ok){
        setFormData({});
      }
      if (data.success === false) {
        dispatch(signInFailure(data?.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10 ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email.."
          className="border p-3 rounded-lg outline-none"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password.."
          className="border p-3 rounded-lg outline-none"
          onChange={handleChange}
          id="password"
        />
        <button disabled={loading} type="submit" className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white uppercase">
          {loading ? "loading..." : "sign in"}
        </button>
        <OAuth/>
        {/* <button className="bg-red-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white uppercase">
          continue with google
        </button> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default Signin;
