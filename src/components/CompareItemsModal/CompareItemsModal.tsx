import { useItemsList } from "@/lib/contexts/ItemsList.context";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const variants = {
  hideInitial: { opacity: 0, scale: 0.8 },
  hideWorse: {
    opacity: 0,
    y: 50,
  },
  hideBetter: {
    opacity: 0,
    y: -50,
  },
  visible: { opacity: 1, y: 0, scale: 1 },
};

Modal.setAppElement("#root");
export function CompareItemsModal() {
  const {
    comparisonFlowOpen,
    maxItemsToCompare,
    itemsToCompare,
    userComparisonChoiceHandler,
  } = useItemsList();

  const [numOfComparisonsMade, setNumOfComparisonsMade] = useState(0);
  const [showGreenOverlay, setShowGreenOverlay] = useState(false);

  const [winnerLoserChoice, setWinnerLoserChoice] = useState<
    [string, string] | null
  >(null);

  const itemsToCompareKey = itemsToCompare?.map((item) => item.id).join("-");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    setNumOfComparisonsMade(0);
  }

  const onItemChoose = (itemId: number | string) => {
    if (itemsToCompare![0].id === itemId) {
      setWinnerLoserChoice(["win", "lose"]);
    } else {
      setWinnerLoserChoice(["lose", "win"]);
    }

    setShowGreenOverlay(true);
    setTimeout(() => {
      setShowGreenOverlay(false);
    }, 100);

    setNumOfComparisonsMade(numOfComparisonsMade + 1);
  };

  const onAnimationComplete = () => {
    if (winnerLoserChoice === null) return;

    if (winnerLoserChoice[0] === "win") {
      userComparisonChoiceHandler!(-1);
    } else {
      userComparisonChoiceHandler!(1);
    }
    setWinnerLoserChoice(null);
  };

  const progressCompleted =
    maxItemsToCompare - numOfComparisonsMade <= 1 && itemsToCompare === null;

  const progressPercentage = progressCompleted
    ? 100
    : Math.min(
        Math.max((numOfComparisonsMade / maxItemsToCompare) * 100, 3),
        98
      );

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          onItemChoose(itemsToCompare![1].id);
        } else if (e.key === "ArrowLeft") {
          onItemChoose(itemsToCompare![0].id);
        }
      }}
    >
      <Modal
        isOpen={comparisonFlowOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
        className="absolute inset-1/2 bg-gray-800 rounded-md p-5 py-9 w-[min(100%-32px,720px)] outline-none text-center overflow-hidden space-y-9"
      >
        {progressCompleted && (
          <div className="space-y-8">
            <p className="text-3xl">Successfully Added!</p>
            <svg
              fill="#000000"
              viewBox="0 0 36 36"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-400 mx-auto w-12 md:w-20"
            >
              <path
                fill="currentColor"
                className="clr-i-outline clr-i-outline-path-1"
                d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
              ></path>
              <path
                fill="currentColor"
                className="clr-i-outline clr-i-outline-path-2"
                d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"
              ></path>
              <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
            </svg>
          </div>
        )}
        {!progressCompleted && (
          <>
            <h2 className="text-2xl md:text-4xl">
              Choose the one you prefer more
            </h2>

            <div className="w-full max-w-[min(60%,240px)] mx-auto h-2 relative rounded-lg bg-gray-900 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-blue-700 rounded-xl"
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: `${progressPercentage - 100}%`,
                  backgroundColor: progressCompleted ? "#4caf50" : "#0b77cd",
                }}
                transition={{
                  ease: "easeOut",
                }}
              ></motion.div>
            </div>

            {itemsToCompare && (
              <div
                key={itemsToCompareKey}
                className="flex gap-4 flex-wrap justify-around items-center"
              >
                <motion.button
                  onClick={() => onItemChoose(itemsToCompare[0].id)}
                  className="w-40 space-y-4 group"
                  variants={variants}
                  initial="hideInitial"
                  animate={
                    winnerLoserChoice === null
                      ? "visible"
                      : winnerLoserChoice[0] === "win"
                      ? "hideBetter"
                      : "hideWorse"
                  }
                  onAnimationComplete={onAnimationComplete}
                >
                  <div className="relative">
                    <img
                      src={itemsToCompare[0].image ?? ""}
                      className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                      alt={itemsToCompare[0].name}
                    />
                    {winnerLoserChoice?.[0] === "win" && showGreenOverlay && (
                      <div className="absolute inset-0 bg-green-400 bg-opacity-50"></div>
                    )}
                  </div>
                  <span className="inline-block">{itemsToCompare[0].name}</span>
                </motion.button>
                <span className="text-3xl font-bold italic max-md:w-full">
                  VS
                </span>
                <motion.button
                  onClick={() => onItemChoose(itemsToCompare[1].id)}
                  className="w-40 space-y-4 group"
                  variants={variants}
                  initial="hideInitial"
                  animate={
                    winnerLoserChoice === null
                      ? "visible"
                      : winnerLoserChoice[1] === "win"
                      ? "hideBetter"
                      : "hideWorse"
                  }
                >
                  <div className="relative">
                    <img
                      src={itemsToCompare[1].image ?? ""}
                      className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                      alt={itemsToCompare[1].name}
                    />
                    {winnerLoserChoice?.[1] === "win" && showGreenOverlay && (
                      <div className="absolute inset-0 bg-green-400 bg-opacity-50"></div>
                    )}
                  </div>
                  <span className="inline-block">{itemsToCompare[1].name}</span>
                </motion.button>
              </div>
            )}

            <p className="text-gray-400 mt-8">
              You could use the{" "}
              <span className="font-bold text-gray-200">Left</span> and{" "}
              <span className="font-bold text-gray-200">Right</span> arrow keys
              to choose
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
