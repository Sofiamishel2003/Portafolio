import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Banner.css';

function Banner() {
  const [text, setText] = useState('');
  const toType = [
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer"
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = toType[currentWordIndex];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(30);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % toType.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed]);

  return (
    <motion.div 
      className="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <motion.h1
        className="banner-title"
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 50 }}
      >
        Hi, Im Sofía.
      </motion.h1>
      <motion.p
        className="banner-subtitle"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Computer Science Engineer
      </motion.p>
      <motion.div
        className="banner-typed"
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

export default Banner;
