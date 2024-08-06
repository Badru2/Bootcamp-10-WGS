import "./App.css";
import { faker } from "https://esm.sh/@faker-js/faker";
import Navigation from "./components/navigation";

function App() {
  const name = "Hilal Badru";
  const batch = "Batch 10";
  const randomNames = ["Dadang", "Udin", "Tatang"];

  return (
    <>
      <Navigation />

      <div className="mt-5 mx-5">
        <div className="">
          <h2 className="text-xl">
            Hi Nama Saya <b>{name}</b>
          </h2>
          <h2 className="text-xl">
            Saya peserta bootcamp <b>{batch}</b>
          </h2>
        </div>

        <div className="mt-12">
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
                      src={faker.image.cats(500, 500, true)}
                      alt={faker.image.abstract()}
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
      </div>
    </>
  );
}

export default App;
