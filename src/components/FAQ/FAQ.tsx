import { cn } from "@/lib/utils/helperFunctions";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

export default function FAQ() {
  return (
    <>
      <h2 className="text-5xl mb-5">FAQs</h2>
      <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            className="bg-gray-600 bg-opacity-60 text-gray-200 rounded-lg my-4 shadow-md"
          >
            <AccordionItemHeading className="font-bold p-4 text-xl text-purple-300">
              <AccordionItemButton className="flex justify-between">
                {faq.question}{" "}
                <AccordionItemState
                  children={({ expanded }) => (
                    <span
                      className={cn(
                        "transition-transform",
                        expanded ? "rotate-0" : "rotate-180"
                      )}
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 -5 24 24"
                        version="1.1"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Icon-Set"
                            transform="translate(-519.000000, -1200.000000)"
                            fill="currentColor"
                          >
                            <path
                              d="M542.687,1212.29 L531.745,1200.31 C531.535,1200.1 531.258,1200.01 530.984,1200.03 C530.711,1200.01 530.434,1200.1 530.224,1200.31 L519.281,1212.29 C518.89,1212.69 518.89,1213.32 519.281,1213.72 C519.674,1214.11 520.31,1214.11 520.701,1213.72 L530.984,1202.46 L541.268,1213.72 C541.659,1214.11 542.295,1214.11 542.687,1213.72 C543.079,1213.32 543.079,1212.69 542.687,1212.29"
                              id="chevron-up"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  )}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="px-4 pb-4 text-lg">
              <p>{faq.answer}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

const faqs = [
  {
    question: "What is SortMyGames?",
    answer:
      "SortMyGames is an innovative web application designed to take the stress out of creating and managing your games list. No more random placements – it's an app that uses a smart algorithm to help you sort your games efficiently and accurately, all with a sprinkle of fun!",
  },
  {
    question: "How does SortMyGames differ from other game-listing websites?",
    answer:
      "Unlike most game listing websites that leave you in a pickle when adding new games to a lengthy list, SortMyGames uses a smart algorithm to find the perfect nook for your game. Even if your list is swelling with 1000 games, our app is smart enough to ask you just 10 questions to find the right place for the newcomer. So, no more scratching your head over where to place the new game.",
  },
  {
    question: "Can you tell me more about this smart algorithm?",
    answer:
      "For those with a tech itch, here it is: SortMyGames uses AVL trees at its core. These are a type of self-balancing binary search trees that helps us reduce the search area by half with each user response. Just like magic, but with a pinch of tech!",
  },
  {
    question: "What's the story behind SortMyGames?",
    answer:
      "SortMyGames started as a personal project out of frustration with having a massive games list and nowhere sensible to put new entries. After showing it to some friends who loved it, I polished and refined the concept, and decided to share it with all of you since it seemed to be a common pain!",
  },
  {
    question: "Can I rearrange the order of my games manually?",
    answer:
      "Sure thing! You have all the normal sorting options like drag-&-drop or moving games up and down the list. Our smart algorithm will recalibrate and maintain the overall integrity of your list.",
  },
  {
    question: "How does the game comparison work?",
    answer:
      "When the smart algorithm needs to compare games, it's like setting up a duel. Two games. One choice. You decide which comes first! Based on your selection, our algorithm shrinks the search area, ultimately unearthing the sweet spot for your game.",
  },
  {
    question: "Is there a limit to my game list?",
    answer:
      "The sky's the limit here! The algorithm handles even gigantic lists without breaking a sweat. Only 10 comparisons are needed for a list of 1000 games!",
  },
  {
    question: "Where is my game list data stored?",
    answer:
      "Everything's stored locally on your browser – we don't store anything remotely. So we highly recommend backing up your data regularly. You can do this easily via our simple 'Export Data to a Backup File' feature.",
  },
  {
    question: "Where does the games data come from?",
    answer:
      "All game data is fetched from the igdb.com API. So, if you spot something missing or incorrect, head over there to make updates.",
  },
  {
    question: "Is SortMyGames free?",
    answer: (
      <>
        Absolutely! Keep your wallet tucked away. SortMyGames is free, and
        always will be. But if you fancy sending a 'Thank You' note our way, we
        wouldn't say no to a cup of coffee! You can{" "}
        <a
          href="https://buymeacoffee.com/mohammed_taher_ghazal"
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-400"
        >
          Buy me a coffee!
        </a>
      </>
    ),
  },
  {
    question: "Why is the sharing url so long and ugly?!",
    answer:
      "Since we don't store any data on our servers, the URL must contain all the necessary data needed to recreate your list on someone else's device. However, if you really want to have a shorter URL, you can use a URL shortening service like bit.ly or TinyURL.",
  },
  {
    question: "How can I provide feedback or report issues?",
    answer: (
      <>
        Found a bug, or just want to share some thoughts? I'd love to hear from
        you! Drop me a line at{" "}
        <a
          href="mailto: mtg.software.dev@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-400"
        >
          mtg.software.dev@gmail.com
        </a>
      </>
    ),
  },
];
