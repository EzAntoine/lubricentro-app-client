import NavBar from "./Navbar";
import SimpleSlider from "./SimpleSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-8">
      <NavBar />
      <div className="w-full md:w-2/3 h-1/3 my-8 max-w-screen-md relative">
        <SimpleSlider />
      </div>
      <p></p>
      <div className="relative h-1">
        <div className="absolute top-0 left-0 w-1-4 h-1 bg-[#e84c3c]"></div>
        <div className="absolute top-0 left-0 w-1-4 h-1 bg-[#eceef1]"></div>
        <div className="absolute top-0 left-0 w-1-4 h-1 bg-[#2dcc70]"></div>
      </div>
    </div>
  );
}
