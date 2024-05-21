import React, { useState } from "react";
import { motion } from "framer-motion";
import CardStack from "./CardStack";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ClipboardJS from "clipboard";

const CardStackControls = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      content: "<p>This is some content for John Doe's card.</p>",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Product Manager",
      content: "<p>This is some content for Jane Smith's card.</p>",
    },
    {
      id: 3,
      name: "Sam Johnson",
      designation: "Designer",
      content: "<p>This is some content for Sam Johnson's card.</p>",
    },
  ]);

  const [cardStyle, setCardStyle] = useState({
    width: 240,
    height: 240,
    opacity: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardStyle({ ...cardStyle, [name]: value });
  };

  const cardStackCode = `
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
              width: \`\${style.width}px\`,
              height: \`\${style.height}px\`,
              opacity: style.opacity,
              backgroundColor: style.backgroundColor,
              borderRadius: \`\${style.borderRadius}px\`,
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
  `;
  

  const clipboard = new ClipboardJS(".copy-button");

  clipboard.on("success", function (e) {
    e.clearSelection();
  });

  return (
    <div className="p-10">
      <div className="mb-6 space-y-4">
        {/* Input fields for card styling */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Width
          </label>
          <input
            type="range"
            name="width"
            min="100"
            max="400"
            value={cardStyle.width}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height
          </label>
          <input
            type="range"
            name="height"
            min="100"
            max="400"
            value={cardStyle.height}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opacity
          </label>
          <input
            type="range"
            name="opacity"
            min="0"
            max="1"
            step="0.01"
            value={cardStyle.opacity}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <input
            type="color"
            name="backgroundColor"
            value={cardStyle.backgroundColor}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Border Radius
          </label>
          <input
            type="range"
            name="borderRadius"
            min="0"
            max="50"
            value={cardStyle.borderRadius}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
      <motion.div
        className="relative h-60 w-60 md:h-60 md:w-96"
        animate={{
          scale: 1,
          transition: { duration: 0.5, type: "spring" },
        }}
      >
        <CardStack cards={cards} style={cardStyle} />
      </motion.div>

      {/* Code display and copy button */}
      <div className="mt-6">
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {cardStackCode}
        </SyntaxHighlighter>
        <button className="copy-button" data-clipboard-text={cardStackCode}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default CardStackControls;
