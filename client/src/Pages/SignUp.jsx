import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

const INITIAL_DATA ={
  username: "",
  email: "",
  password: "",
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_DATA);
  const[error , setError] = useState(null);
  const[loading , setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSubmit(e){
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
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
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10 ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username.."
          className="border p-3 rounded-lg outline-none"
          onChange={handleChange}
          id="username"
        />
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
          {loading ? "loading..." : "sign up"}
        </button>
        <button className="bg-red-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white uppercase">
          continue with google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignUp;
