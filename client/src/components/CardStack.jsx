import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardStack = ({ cards = [], style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="relative">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute dark:bg-black bg-white rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
          style={{
            top: index === currentIndex ? 0 : index * -10,
            zIndex: index === currentIndex ? cards.length : cards.length - index,
            width: `${style.width}px`,
            height: `${style.height}px`,
            opacity: style.opacity,
            backgroundColor: style.backgroundColor,
            borderRadius: `${style.borderRadius}px`,
            transformOrigin: "top center",
            scale: index === currentIndex ? 1 : 0.94, // Decrease scale for cards that are behind
          }}
          animate={{
            top: index === currentIndex ? 0 : index * -10,
            scale: index === currentIndex ? 1 : 0.94, // Decrease scale for cards that are behind
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {card.content}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card.name}
            </p>
            <p className="text-neutral-400 font-normal dark:text-neutral-200">
              {card.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardStack;
