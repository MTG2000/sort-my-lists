import { Link } from "react-router-dom";
import ExportDataButton from "../ExportDataButton/ExportDataButton";
import ImportDataButton from "../ImportDataButton/ImportDataButton";
import { createRoute } from "@/router/create-route";
import { motion } from "framer-motion";
import { useState } from "react";
import { useListsManager } from "@/lib/contexts/ListsManager.context";
import { Button, LinkButton } from "../Button/Button";
import { useNavigate } from "@/lib/hooks/useNavigate";
import { useToast } from "@/lib/hooks/useToast";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function AppDrawer() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { lists, createNewList, deleteList } = useListsManager();

  const handleCreateNewList = () => {
    const list = createNewList(`Untitled List ${lists.length + 1}`);
    navigate({
      type: "list",
      slug: list.slug,
    });
  };

  const drawerFillFullScreen = useMediaQuery("(max-width: 768px)");

  const handleDeleteList = (listId: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this list? This action cannot be undone."
    );
    if (userConfirmed) {
      deleteList(listId);
      toast("List deleted successfully");
      navigate({ type: "homepage" });
    }
  };

  const closeMenuIfFullScreen = () => {
    if (drawerFillFullScreen) {
      setMenuIsOpen(false);
    }
  };

  return (
    <>
      <div className="py-16 xl:p-0"></div>
      <aside className="fixed inset-y-0 left-0 w-full md:w-[400px] z-10 isolate pointer-events-none">
        <button
          className="rounded-full bg-black bg-opacity-70 w-20 aspect-square absolute top-6 left-6 z-10 font-medium text-white flex flex-col justify-center items-center pointer-events-auto"
          onClick={() => {
            setMenuIsOpen((v) => !v);
          }}
          aria-label="Menu Toggle"
        >
          {!menuIsOpen && (
            <motion.span
              initial={{
                opacity: 0,
                rotateZ: 45,
              }}
              animate={{
                opacity: 1,
                rotateZ: 0,
              }}
            >
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          )}
          {menuIsOpen && (
            <motion.span
              initial={{
                opacity: 0,
                rotateZ: -45,
              }}
              animate={{
                opacity: 1,
                rotateZ: 0,
              }}
            >
              <svg
                width="40px"
                height="40px"
                viewBox="-0.5 0 25 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21.32L21 3.32001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 3.32001L21 21.32"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          )}
        </button>
        <motion.div
          className="bg-black w-full min-h-full p-5 px-6 flex flex-col gap-5 md:gap-8 pt-32 pointer-events-auto"
          initial={{
            x: "-100%",
          }}
          animate={
            menuIsOpen
              ? {
                  x: 0,
                }
              : {
                  x: "-100%",
                }
          }
          transition={{
            ease: "easeInOut",
          }}
        >
          <Link
            to={createRoute({ type: "homepage" })}
            onClick={closeMenuIfFullScreen}
            className="text-3xl font-bold"
          >
            Smart-ass Games Rater
          </Link>

          <div>
            <p className="text-xl font-bold">All Lists:</p>
            <ul className="ps-4 pt-4 space-y-3">
              {lists.map((list) => (
                <li key={list.id} className="flex gap-2">
                  <LinkButton
                    to={createRoute({ type: "list", slug: list.slug })}
                    onClick={closeMenuIfFullScreen}
                    variant="whiteOutlined"
                    className="overflow-clip text-ellipsis block py-2 grow"
                  >
                    {list.name}
                  </LinkButton>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="rounded-full bg-gray-500 bg-opacity-0 hover:bg-opacity-30 w-10 aspect-square font-medium text-white flex flex-col justify-center items-center"
                    aria-label="delete list"
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                      />
                    </svg>
                  </button>
                </li>
              ))}

              <Button fullWidth onClick={handleCreateNewList}>
                + Create New List
              </Button>
            </ul>
          </div>
          <hr className="border-gray-500" />
          <div className="space-y-3">
            <ExportDataButton onCompleted={closeMenuIfFullScreen} />
            <ImportDataButton onCompleted={closeMenuIfFullScreen} />
          </div>
        </motion.div>
      </aside>
    </>
  );
}
