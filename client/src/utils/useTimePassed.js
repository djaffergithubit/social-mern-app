import { useState, useEffect } from 'react';

export const useTimePassed = (post) => {
  const [timePassed, setTimePassed] = useState('');

  useEffect(() => {
    const calculateTimePassed = () => {
      const currentTime = new Date();
      const postTime = new Date(post.createdAt); // Assuming 'createdAt' is a timestamp in your post object

      const timeDifference = currentTime - postTime;
      const secondsPassed = Math.floor(timeDifference / 1000);

      if (secondsPassed < 60) {
        setTimePassed(`${secondsPassed} second${secondsPassed > 1 ? 's': '' } ago`);
      } else if (secondsPassed < 3600) {
        const minutesPassed = Math.floor(secondsPassed / 60);
        setTimePassed(`${minutesPassed} minute${minutesPassed > 1 ? 's': ''} ago`);
      } else if (secondsPassed < 86400) {
        const hoursPassed = Math.floor(secondsPassed / 3600);
        setTimePassed(`${hoursPassed} hour${hoursPassed > 1 ? 's': ''} ago`);
      } else {
        const daysPassed = Math.floor(secondsPassed / 86400);
        setTimePassed(`${daysPassed} day${daysPassed > 1 ? 's': ''} ago`);
      }
    };

    calculateTimePassed();

    // Update time passed every minute
    const interval = setInterval(calculateTimePassed, 60000);

    return () => clearInterval(interval);
  }, [post.createdAt]);

  return timePassed;
};