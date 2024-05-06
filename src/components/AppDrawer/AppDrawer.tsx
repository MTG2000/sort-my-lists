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
import { useSectionApis } from "@/lib/contexts/SectionApisConfig.context";
import SectionsSwitch from "../SectionsSwitch/SectionsSwitch";

export default function AppDrawer() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { lists, createNewList, deleteList } = useListsManager();
  const { section } = useSectionApis();
  const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);

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

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const closeMenuIfFullScreen = () => {
    if (drawerFillFullScreen) {
      setMenuIsOpen(false);
    }
  };

  return (
    <>
      <div className="py-6 xl:p-0 bg"></div>
      <motion.aside
        layoutRoot
        className="fixed inset-y-0 left-0 w-full md:w-[400px] z-20 isolate pointer-events-none"
      >
        <button
          className="rounded-full bg-black bg-opacity-70 w-12 md:w-20 aspect-square absolute top-6 left-6 z-20 font-medium text-white flex flex-col justify-center items-center pointer-events-auto"
          onClick={() => {
            setMenuIsOpen((v) => !v);
          }}
          aria-label="Menu Toggle"
        >
          {!menuIsOpen && (
            <motion.span
              className="w-1/2"
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
                className="w-full h-full"
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
            to={createRoute({ type: "homepage" }, section)}
            onClick={closeMenu}
            className="text-5xl font-bold hover:scale-105 transition-transform"
          >
            SortMy{capitalizedSection}
          </Link>

          <SectionsSwitch size="sm" />

          <div>
            <p className="text-xl font-bold">{capitalizedSection} Lists:</p>
            <ul className="pt-4 space-y-3">
              {lists.map((list) => (
                <li key={list.id} className="flex gap-2">
                  <LinkButton
                    to={createRoute({ type: "list", slug: list.slug }, section)}
                    onClick={closeMenu}
                    variant="whiteOutlined"
                    className="overflow-clip text-ellipsis block py-2 grow"
                  >
                    {list.name}
                  </LinkButton>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="rounded-full bg-gray-500 bg-opacity-0 hover:bg-opacity-30 w-10 aspect-square font-medium text-white flex flex-col justify-center items-center"
                    aria-label="delete list"
                    title="Delete List"
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
            <ExportDataButton
              section={section}
              onCompleted={closeMenuIfFullScreen}
            />
            <ImportDataButton
              section={section}
              onCompleted={closeMenuIfFullScreen}
            />
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}
