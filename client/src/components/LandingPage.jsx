import React, { useState, useEffect } from 'react';

const Typewriter = ({ messages, onComplete, backgroundColor }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const message = messages[currentMessageIndex];
    let currentCharIndex = 0; // Start at index 0 to include the first character

    const typingInterval = setInterval(() => {
      if (currentCharIndex < message.length - 1) {
        setCurrentText((prevText) => prevText + message[currentCharIndex]);
        currentCharIndex++;
      } else {
        clearInterval(typingInterval);
        setTyping(false);

        setTimeout(() => {
          setCurrentText('');
          setCurrentMessageIndex((prevIndex) =>
            (prevIndex + 1) % messages.length
          );
          setTyping(true);
        }, 3000); // Pause for 5 seconds before transitioning to the next message

        if (currentMessageIndex === messages.length - 1) {
          setIsTypingComplete(true); // Mark typing as complete when the last message is reached
          onComplete(); // Call the onComplete callback provided by the parent component
        }
      }
    }, 50); // Typing speed (adjust as needed)

    setCurrentText(message[0]); // Initialize currentText with the first character
    setTyping(true);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, messages, onComplete]);

  return (
    <div className={backgroundColor === 'yellow' ? 'text-black' : ''} style={{ backgroundColor }}>
      {typing ? currentText : messages[currentMessageIndex]}
    </div>
  );
};

const LandingPage = () => {
    const messages = [
        'Hello!',
        'What is in your heart?',
        'Are you aspiring to achieve more?',
        'Are you looking to inspire your team ?',
        'Do you feel stagnant in your job?',
        'If you are looking for a new start...',
        'You have come to the right place..',
        'Welcome to your next!'
      ];
    
      const bgColor = ['bg-teal-900','bg-slate-900'];
      const [showButton, setShowButton] = useState(false);
      const [backgroundColor, setBackgroundColor] = useState(bgColor[0]); // Initial background color
      const screenBackground = 'flex items-center justify-center h-screen'
    
      const handleTypingComplete = () => {
        setShowButton(true); // Show the button when typing is complete
      };
    
      useEffect(() => {
        if (showButton) {
          // Change background color after showing the button
          setBackgroundColor(bgColor[1]);
        }
      }, [showButton]);
    
      return (
        <div className={`${screenBackground} ${backgroundColor}`}>
          <div className="text-center text-white">
            <h1 className="my-5 py-5 text-6xl font-bold">
              <Typewriter
                messages={messages}
                onComplete={handleTypingComplete}
                backgroundColor={backgroundColor}
              />
            </h1>
            <div className='pt-40'>
              {showButton && (
              <button className="mx-10 px-10 py-2 text-md font-oswald text-black hover:text-white hover:bg-teal-900 bg-yellow-400 rounded-lg">
                Enter
              </button>
            )}
            </div>
            
          </div>
        </div>
      );
}

export default LandingPage