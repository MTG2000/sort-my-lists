import { useSectionApis } from "@/lib/contexts/SectionApisConfig.context";
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
  const { section } = useSectionApis();
  const sectionCapitalized = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <>
      <h2 className="text-5xl mb-5">FAQs</h2>
      <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            className="bg-gray-600 bg-opacity-60 text-gray-200 rounded-lg my-4 shadow-md"
          >
            <AccordionItemHeading
              className={cn(
                "font-bold p-4 text-xl",
                section === "games" && "text-blue-300",
                section === "movies" && "text-purple-300",
                section === "books" && "text-green-200"
              )}
            >
              <AccordionItemButton className="flex justify-between">
                {faq.question
                  .replace(/\{item\}/g, section.slice(0, -1))
                  .replace(/\{items\}/g, section)
                  .replace(/\{Items\}/g, sectionCapitalized)}
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
              <p>
                {typeof faq.answer === "string"
                  ? faq.answer
                      .replace(/\{item\}/g, section.slice(0, -1))
                      .replace(/\{items\}/g, section)
                      .replace(/\{Items\}/g, sectionCapitalized)
                  : faq.answer}
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

const faqs = [
  {
    question: "What is SortMy{Items}?",
    answer:
      "SortMy{Items} is an innovative web application designed to take the stress out of creating and managing your items list. No more random placements – it's an app that uses a smart algorithm to help you sort your items efficiently and accurately, all with a sprinkle of fun!",
  },
  {
    question:
      "How does SortMy{Items} differ from other {item}-listing websites?",
    answer:
      "Unlike most {items} listing websites that leave you in a pickle when adding new items to a lengthy list, SortMy{Items} uses a smart algorithm to find the perfect place for your {item}. Even if your list has over 1000 items, the app is smart enough to ask you just 10 questions to find the right place for the {item}.",
  },
  {
    question: "Can you tell me more about this smart algorithm?",
    answer:
      "For those with a tech itch, here it is: SortMyLists uses AVL trees at its core. These are a type of self-balancing binary search trees that helps us reduce the search area by half with each user response. You can find plenty of resources about them online.",
  },
  {
    question: "What's the story behind SortMy{Items}?",
    answer:
      "SortMy{Items} started as a personal project out of frustration with having a massive {items} list and having a lot of difficulty keeping them in a meaningful order. I showed it to a couple of friends & they loved it, so I polished and refined the concept, and decided to share it with everyone since it seems to be a common pain!",
  },
  {
    question: "Can I rearrange the order of my items manually?",
    answer:
      "Sure thing! You have all the normal sorting options like drag-&-drop or moving items up and down the list. Our smart algorithm will recalibrate and maintain the overall integrity of your list.",
  },
  {
    question: "How does the {item} comparison work?",
    answer:
      "When the smart algorithm needs to compare items, it's like setting up a duel. Two items. One choice. You decide which comes first! Based on your selection, our algorithm shrinks the search area, ultimately unearthing the sweet spot for your {item}.",
  },
  {
    question: "Is there a limit to my {items} list?",
    answer:
      "The sky's the limit here! The algorithm handles even gigantic lists without breaking a sweat. Only 10 comparisons are needed for a list of 1000 items!",
  },
  {
    question: "Where is my {items} list data stored?",
    answer:
      "Everything's stored locally on your browser – we don't store anything remotely. So we highly recommend backing up your data regularly. You can do this easily via our simple 'Export Data to a Backup File' button in the sidebar",
  },
  {
    question: "Where does the games/movies/books data come from?",
    answer:
      "The data is fetched from igdb.com/omdbapi/google-books-api respectively. So if you find anything missing, go there & update it.",
  },
  {
    question: "Is SortMy{Items} free?",
    answer: (
      <>
        Absolutely! Keep your wallet tucked away. It is 100% free, and always
        will be. But if you fancy sending a more tangible 'Thank You' note my
        way (which is of course appreciated!), you can do so here:{" "}
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
