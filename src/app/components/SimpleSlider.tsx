"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import lubricanteImg from "../../../public/images/slider/lubricante.jpg";
import motorImg from "../../../public/images/slider/motor.jpg";
import varillaImg from "../../../public/images/slider/varilla.jpg";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <Slider {...settings}>
      <div className="flex items-center h-full">
        <Image
          src={lubricanteImg}
          alt="Lubricante"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex items-center h-full">
        <Image
          src={motorImg}
          alt="Motor"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex items-center h-full">
        <Image
          src={varillaImg}
          alt="Varilla"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </Slider>
  );
}
