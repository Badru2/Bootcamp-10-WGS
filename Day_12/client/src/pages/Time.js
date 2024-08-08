import React, { useState, useEffect } from "react";

function Time() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateState(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>
        {dateState.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        })}
      </p>
      <p>
        {dateState.toLocaleString("id-ID", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
    </div>
  );
}

export default Time;
