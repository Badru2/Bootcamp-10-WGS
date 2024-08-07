import React, { Component } from "react";
import { faker } from "https://esm.sh/@faker-js/faker";

class Home extends Component {
  render() {
    const randomNames = ["Dadang", "Udin", "Tatang"];
    return (
      <div>
        {randomNames.map((randomName, index) => {
          const currentTime = new Date();
          const modifiedTime = new Date(
            currentTime.getTime() - 30 * 40000 * (index + 1)
          );
          return (
            <div className="ui comments" key={randomName}>
              <div className="comment">
                <a href="./" className="avatar">
                  <img
                    src={faker.image.urlLoremFlickr({ category: "cats" })}
                    alt=""
                  />
                </a>
                <div className="content">
                  <a href="./" className="author">
                    {randomName}
                  </a>
                  <div className="metadata">
                    <span className="date">
                      {modifiedTime.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text">{faker.lorem.sentence()}</div>
                  <div className="actions">
                    <a href="./" className="reply">
                      Reply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
