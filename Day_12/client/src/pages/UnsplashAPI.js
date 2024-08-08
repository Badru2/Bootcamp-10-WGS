import React, { useState, useEffect } from "react";

function UnsplashAPI() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  const fetchRequest = async () => {
    if (img) {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=WWwqLu4veEJKanGDxcPP9Y2ubQzmxamqYBuS9Rd2ZzY`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      console.log(result);
      setRes(result);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [img]);

  return (
    <div>
      <input
        className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
        type="text"
        placeholder="Search Anything..."
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <button type="submit">Submit</button>
    </div>
  );
}

export default UnsplashAPI;
