import FetchingListings from "../Components/FetchingListings"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import { ImagesSliderDemo } from "../Components/Slider"
// import Slider from "../Components/Slider"


function Home() {
  return (
    <>
    <Hero/>
    <ImagesSliderDemo/>
    {/* <Slider/> */}
    <FetchingListings/>
    <Footer/>
    </>
  )
}

export default Home