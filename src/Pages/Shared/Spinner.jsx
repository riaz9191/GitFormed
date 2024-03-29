import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#111828] z-50">
      <div className="flex items-center justify-center space-x-2">
      <div className="box-of-star1">
    <div className="star star-position1"></div>
    <div className="star star-position2"></div>
    <div className="star star-position3"></div>
    <div className="star star-position4"></div>
    <div className="star star-position5"></div>
    <div className="star star-position6"></div>
    <div className="star star-position7"></div>
  </div>
  <div className="box-of-star2">
    <div className="star star-position1"></div>
    <div className="star star-position2"></div>
    <div className="star star-position3"></div>
    <div className="star star-position4"></div>
    <div className="star star-position5"></div>
    <div className="star star-position6"></div>
    <div className="star star-position7"></div>
  </div>
  <div className="box-of-star3">
    <div className="star star-position1"></div>
    <div className="star star-position2"></div>
    <div className="star star-position3"></div>
    <div className="star star-position4"></div>
    <div className="star star-position5"></div>
    <div className="star star-position6"></div>
    <div className="star star-position7"></div>
  </div>
  <div className="box-of-star4">
    <div className="star star-position1"></div>
    <div className="star star-position2"></div>
    <div className="star star-position3"></div>
    <div className="star star-position4"></div>
    <div className="star star-position5"></div>
    <div className="star star-position6"></div>
    <div className="star star-position7"></div>
  </div>
  <div data-js="astro" className="astronaut">
    <div className="head"></div>
    <div className="arm arm-left"></div>
    <div className="arm arm-right"></div>
    <div className="body">
      <div className="panel"></div>
    </div>
    <div className="leg leg-left"></div>
    <div className="leg leg-right"></div>
    <div className="schoolbag"></div>
  </div>
      </div>
    </div>
  );
};

export default Spinner;
