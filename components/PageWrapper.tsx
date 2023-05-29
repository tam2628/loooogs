"use client";
import { store } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { Provider } from "react-redux";

export default function PageWrapper({ children }: any) {
  return (
    <Provider store={store}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Provider>
  );
}
