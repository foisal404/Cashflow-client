"use client";
import Image from "next/image";
import React, { use } from "react";
import Button from "./Button";

function HeroTitle() {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pt-10 text-start">
      Managing finances has <br /> never been easier
    </h1>
  );
}

function HeroSection() {
  return (
    <div className="bg-lime-300 h-[90vh] px-10">
      <HeroTitle />
      <div className="flex flex-col-reverse md:flex md:flex-row justify-end">
        <div className="flex gap-5 mt-10 h-fit relative lg:top-64 justify-center">
          <Button>Get Start</Button>
          <Button>Learn More</Button>
        </div>
        <Image src="/bgcon.png" alt="Hero Image" width={600} height={400} />
      </div>
    </div>
  );
}

export default HeroSection;
