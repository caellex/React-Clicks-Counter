import React, { useState, useEffect } from 'react';

const Clicker = () => {
  const [clicks, setClicks] = useState(0); // Saves and changes the click variable, to see how many times you click.
  const [timer, setTimer] = useState(10); // Saves and changes the timer variable, keep track of how many seconds are left.
  const [isCounting, setIsCounting] = useState(true); // Bool to check if the timer is currently counting or not. Used to check if the count button should be visible or not.

  useEffect(() => { // Ended up using useEffect as any other method made me get X amount of intervals running at the same time. 
    let interval;   // Pre make a variable so I can clear interval whenever isCounting is changed.

    if (isCounting) { // If counter is counting - 
      interval = setInterval(() => { // Start timer,
        setTimer((prevTimer) => {  
          if (prevTimer > 0) return prevTimer - 1; // if timer is greater than 0, return timer subtracted with 1. 
          else { //when timer hits 0, 
            setIsCounting(false); // set IsCounting to false, 
            return prevTimer; // and return the value.
          }
        });
      }, 1000); // run every 1 seconds (1000ms)
    }

    return () => clearInterval(interval); // clear interval if isCounting changes, or component unmounts (which it doesnt)
  }, [isCounting]); // if isCounting is changed, rerun the useEffect - its false so nothing will happen other than a clearInterval

  return (
    <div>
      <h1 className="clicks-title">How many clicks can you do in 10 seconds?:</h1>
      <div className="click-container">
        <div className="clicks-display">{clicks} clicks</div> {/*Display clicks*/}
        <div className="timer-counter">{isCounting ? `Time left: ${timer} seconds` : "In 10 seconds! That's incredible."}</div> {/*Display timer if counting, if not, tell them they did a great job!*/}
        {isCounting ? (
          <button className="click-to-count" onClick={() => setClicks(clicks + 1)}>+</button>
        ) : (                                                                               
          ""
        )}
      </div>
    </div>
  );
};

export default Clicker;
