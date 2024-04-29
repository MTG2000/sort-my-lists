import { useGamesList } from "@/lib/contexts/GamesList.context";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    y: 100,
  },
  hideBetter: {
    opacity: 0,
    y: -100,
  },
  visible: { opacity: 1, y: 0, scale: 1 },
};

Modal.setAppElement("#root");
export function CompareGamesModal() {
  const {
    comparisonFlowOpen,
    maxGamesToCompare,
    gamesToCompare,
    userComparisonChoiceHandler,
  } = useGamesList();

  const [numOfComparisonsMade, setNumOfComparisonsMade] = useState(0);

  const [winnerLoserChoice, setWinnerLoserChoice] = useState<
    [string, string] | null
  >(null);

  const gamesToCompareKey = gamesToCompare?.map((game) => game.id).join("-");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    setNumOfComparisonsMade(0);
  }

  const onGameChoose = (gameId: number) => {
    if (gamesToCompare![0].id === gameId) {
      setWinnerLoserChoice(["win", "lose"]);
    } else {
      setWinnerLoserChoice(["lose", "win"]);
    }

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
    maxGamesToCompare - numOfComparisonsMade <= 1 && gamesToCompare === null;

  const progressPercentage = progressCompleted
    ? 100
    : Math.min(
        Math.max((numOfComparisonsMade / maxGamesToCompare) * 100, 3),
        98
      );

  return (
    <div>
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
            <p className="text-3xl">Game Added!</p>
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
              <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
            </svg>
          </div>
        )}
        {!progressCompleted && (
          <>
            <h2 className="text-2xl md:text-4xl">
              Choose the game you prefer more
            </h2>

            <div className="w-full max-w-[60%] mx-auto h-4 relative rounded-lg bg-gray-900 overflow-hidden">
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

            {gamesToCompare && (
              <div
                key={gamesToCompareKey}
                className="flex gap-4 flex-wrap justify-around items-center"
              >
                <motion.button
                  onClick={() => onGameChoose(gamesToCompare[0].id)}
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
                  <img
                    src={gamesToCompare[0].cover?.url}
                    className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                    alt={gamesToCompare[0].name}
                  />
                  <span className="inline-block">{gamesToCompare[0].name}</span>
                </motion.button>
                <span className="text-3xl font-bold italic max-md:w-full">
                  VS
                </span>
                <motion.button
                  onClick={() => onGameChoose(gamesToCompare[1].id)}
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
                  <img
                    src={gamesToCompare[1].cover?.url}
                    className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                    alt={gamesToCompare[1].name}
                  />
                  <span className="inline-block">{gamesToCompare[1].name}</span>
                </motion.button>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
