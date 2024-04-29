import { useGamesList } from "@/lib/contexts/GamesList.context";
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

Modal.setAppElement("#root");

export function CompareGamesModal() {
  const { comparisonFlowOpen, gamesToCompare, userComparisonChoiceHandler } =
    useGamesList();
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <div>
      <Modal
        isOpen={comparisonFlowOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
        className="absolute inset-1/2 bg-gray-800 rounded-md p-5 py-9 w-[min(100%-32px,720px)] outline-none text-center"
      >
        <h2 className="text-2xl">Choose the game you prefer more</h2>

        {gamesToCompare && (
          <div className="flex gap-4 flex-wrap mt-9 justify-around items-center">
            <button
              onClick={() => userComparisonChoiceHandler!(-1)}
              className="w-40 space-y-4 group"
            >
              <img
                src={gamesToCompare[0].cover?.url}
                className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                alt={gamesToCompare[0].name}
              />
              <span className="inline-block">{gamesToCompare[0].name}</span>
            </button>
            <span className="text-3xl font-bold italic max-md:w-full">VS</span>
            <button
              onClick={() => userComparisonChoiceHandler!(1)}
              className="w-40 space-y-4 group"
            >
              <img
                src={gamesToCompare[1].cover?.url}
                className="object-cover w-full group-hover:hover:scale-110 group-active:scale-95 transition-transform"
                alt={gamesToCompare[1].name}
              />
              <span className="inline-block">{gamesToCompare[1].name}</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
