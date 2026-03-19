import { useRef, useEffect } from 'react';

export const useMagnetic = (spring = { stiffness: 300, damping: 30 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parent = element.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (clientX - centerX) / 20;
      const deltaY = (clientY - centerY) / 20;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [spring]);

  return ref;
};

