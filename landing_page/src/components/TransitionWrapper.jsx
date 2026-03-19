import { motion } from 'framer-motion';

const TransitionWrapper = ({ children, className = '', initial = { opacity: 0, y: 50 }, animate = { opacity: 1, y: 0 }, transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, ...props }) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;

