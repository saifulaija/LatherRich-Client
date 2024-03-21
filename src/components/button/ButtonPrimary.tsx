// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from "framer-motion";
// const ButtonPrimary = ({ title }: { title: any }) => {
//   return (
//     <div className=" w-full absolute bottom-0 left-0 right-0">
//       <motion.button whileHover={{scale:.95,textShadow:'0px 0px 8px rgb(255,255,255)',boxShadow:'0px 0px 8px rgb(255,255,255)'}}   className="border rounded-md w-full  border-primary px-4 py-1 font-semibold text-center text-balance text-texthexa  uppercase">
//         {title}
//       </motion.button>
//     </div>
//   );
// };

// export default ButtonPrimary;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const ButtonPrimary = ({ title,icon }: { title: string,icon: JSX.Element }) => {
  return (
    <div className="w-full absolute bottom-0 left-0 right-0">
      <motion.button
        whileHover={{ scale: 1.05, textShadow: '0px 0px 8px rgba(255, 255, 255, 0.5)', boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.5)' }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="border rounded-md w-full border-textsecoundary px-4 py-1 font-semibold text-center text-balance text-texthexa uppercase"
      >
      <span className="mr-1 font-semibold">{icon}</span>  {title}
      </motion.button>
    </div>
  );
};

export default ButtonPrimary;

