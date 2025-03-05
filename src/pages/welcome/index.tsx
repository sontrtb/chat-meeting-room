import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Hiệu ứng nền động
  const backgroundVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Hiệu ứng các vòng tròn
  const circleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: 0
    },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.7],
      rotate: 360,
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const navigation = useNavigate()
  const handleLogin = () => {
    navigation("/")
  }

  return (
    <motion.div
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      className="relative w-screen h-screen bg-gradient-to-br from-blue-500 to-indigo-600 bg-size-200 flex items-center justify-center overflow-hidden"
    >
      {/* Hiệu ứng các vòng tròn nền */}
      <motion.div
        variants={circleVariants}
        className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-300/30 rounded-full blur-2xl"
      />
      <motion.div
        variants={circleVariants}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/30 rounded-full blur-2xl"
      />

      {/* Hiệu ứng sóng */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              scale: 0,
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: i * 1
            }}
            className="absolute w-20 h-20 bg-white/10 rounded-full"
          />
        ))}
      </div>

      {/* Nội dung chính */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10
        }}
        className="text-center z-10 relative"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            textShadow: '0 0 20px rgba(255,255,255,0.5)'
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-6xl font-bold text-white mb-4 tracking-wide"
        >
          ChatSmart
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isHovered ? 1.05 : 1,
            color: isHovered ? '#f0f8ff' : '#ffffff'
          }}
          transition={{
            type: "tween",
            duration: 0.3
          }}
          className="text-xl text-white opacity-80 px-8"
        >
          Trợ lý AI thông minh, đồng hành mọi lúc
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 15px rgba(255,255,255,0.5)'
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: 'rgba(255,255,255,0.3)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10
          }}
          className="mt-8 px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all"
          onClick={handleLogin}
        >
          Bắt Đầu
        </motion.button>
      </motion.div>

      {/* Hiệu ứng nhấp nháy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.2, 0],
          transition: {
            duration: 2,
            repeat: Infinity
          }
        }}
        className="absolute inset-0 bg-white/5 pointer-events-none"
      />
    </motion.div>
  );
};

export default WelcomeScreen;