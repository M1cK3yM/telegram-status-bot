import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function DarkModeToggle({ darkMode, toggleDarkMode }: Props) {
  return (
    <button
      className="w-18 h-9 flex rounded-full items-center bg-gray-300 dark:bg-gray-700 p-1"
      style={{ justifyContent: `flex-${darkMode ? 'end' : 'start'}` }}
      onClick={toggleDarkMode}
    >
      <motion.div
        className="flex items-center justify-center h-8 w-8 bg-gray-800 dark:bg-white rounded-full"
        layout
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={17} className="text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={17} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
