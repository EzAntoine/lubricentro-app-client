import NavBar from "./Navbar";
import SimpleSlider from "./SimpleSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-8">
      <NavBar />
      <div className="w-full md:w-2/3 h-1/3 py-8 max-w-screen-md relative">
        <SimpleSlider />
      </div>
    </div>
  );
}
