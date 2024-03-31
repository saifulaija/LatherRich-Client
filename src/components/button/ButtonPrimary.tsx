/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const ButtonPrimary = ({
  title,
  icon,
}: {
  title: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="w-full absolute bottom-0 left-0 right-0">
      <motion.button
        whileHover={{
          scale: 0.95,
          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
          boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
        }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border rounded-md w-full bg-primary px-4 py-1 font-semibold text-center text-balance text-white uppercase"
      >
        <span className="mr-1 font-semibold">{icon}</span> {title}
      </motion.button>
    </div>
  );
};

export default ButtonPrimary;
