import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "../Button/Button";
import { motion } from "framer-motion";

export default function MigrationWarningBanner() {
  const [numberOfTimesHidden, setNumberOfTimesHidden] = useLocalStorageState(
    "migration-warning-banner-hidden-count",
    {
      defaultValue: 0,
    }
  );
  const [isHidden, setIsHidden] = React.useState(numberOfTimesHidden >= 3);

  const hideBanner = () => {
    setNumberOfTimesHidden(numberOfTimesHidden + 1);
    setIsHidden(true);
  };

  if (isHidden) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed text-lg top-8 inset-x-8 p-8 text-white page-container glass-card rounded-lg z-10 shadow-xl"
    >
      <span className="font-bold">IMPORTANT</span>
      <br />A newer version of this app is available at{" "}
      <a
        href="https://sort-my-lists.pages.dev"
        className="underline text-cyan-300 hover:text-cyan-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        sort-my-lists.pages.dev
      </a>
      .
      <br />
      Please use that version instead. & Don't worry, you can easily export your
      lists from this version (using the "Export data" button in the sidebar) &
      import them there.
      <br />
      <p className="text-orange-400">
        This version will be taken down after some time.
      </p>
      <br />
      <Button className="" onClick={hideBanner}>
        I've Read & Understand
      </Button>
    </motion.div>
  );
}
