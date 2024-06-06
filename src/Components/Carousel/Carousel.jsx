import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { assets } from "../../assets/assets.js";
import { GrPrevious, GrNext } from "react-icons/gr";

const Carousel = () => {
    const initialItems = [
        { src: assets.Carousel1, className: "gallery-item-1" },
        { src: assets.Carousel3, className: "gallery-item-2" },
        { src: assets.Carousel4, className: "gallery-item-3" },
    ];

    const [carouselItems, setCarouselItems] = useState(initialItems);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Change the interval time as needed (in milliseconds)

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    const updateGallery = (newItems) => {
        return newItems.map((item, index) => {
            return { ...item, className: `gallery-item-${index + 1} ` };
        });
    };

    const handleNext = () => {
        setCarouselItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.push(newItems.shift());
            return updateGallery(newItems);
        });
    };

    const handlePrevious = () => {
        setCarouselItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.unshift(newItems.pop());
            return updateGallery(newItems);
        });
    };

    return (
        <div className="gallery">
            <div className="gallery-container">
                {carouselItems.map((item, index) => (
                    <img
                        key={index}
                        className={`gallery-item ${item.className}`}
                        src={item.src}
                        alt={`Carousel ${index + 1}`}
                    />
                ))}
            </div>
            <div className='prev-next'>
                <button className="gallery-controls-previous" onClick={handlePrevious}>
                    <GrPrevious/>
                </button>
                <button className="gallery-controls-next" onClick={handleNext}><GrNext/></button>
            </div>
        </div>
    );
};

export default Carousel;
