import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroTitle() {
  const [wordsOrder, setWordsOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordsOrder((prev) => {
        const newOrder = [...prev];

        // choose a random 2 words to swap
        const randomIndex1 = Math.floor(Math.random() * 3);
        let randomIndex2 = Math.floor(Math.random() * 3);
        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * 3);
        }

        // swap the words
        newOrder[randomIndex1] = prev[randomIndex2];
        newOrder[randomIndex2] = prev[randomIndex1];

        return newOrder;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const wordsInMixedOrder = wordsOrder.map((index, indexFinal) => {
    const word = ["Sort", "My", "Games"][index];
    return (
      <motion.span
        layout
        key={word}
        animate={{
          x: indexFinal * 36,
        }}
      >
        {word}
      </motion.span>
    );
  });

  return (
    <h1 className="text-9xl flex flex-col leading-[115px] mx-auto">
      {wordsInMixedOrder}
    </h1>
  );
}
