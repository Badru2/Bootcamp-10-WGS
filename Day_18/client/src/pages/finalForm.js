import React from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FinalForm = () => (
  <Styles>
    <Form
      onSubmit={onSubmit}
      initialValues={{ employed: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <label>Last Name</label>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label>Employed</label>
            <Field name="employed" component="input" type="checkbox" />
          </div>
          <div>
            <label>Education</label>
            <Field name="education" component="select">
              <option />
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="master">Master</option>
            </Field>
          </div>
          {/* <div>
            <label>Toppings</label>
            <Field name="toppings" component="select" multiple>
              <option value="chicken">🐓 Chicken</option>
              <option value="ham">🐷 Ham</option>
              <option value="mushrooms">🍄 Mushrooms</option>
              <option value="cheese">🧀 Cheese</option>
              <option value="tuna">🐟 Tuna</option>
              <option value="pineapple">🍍 Pineapple</option>
            </Field>
          </div> */}
          <div>
            <label>Exterpise</label>
            <div>
              <label>
                <Field
                  name="exterpise"
                  component="input"
                  type="checkbox"
                  value="html"
                />{" "}
                HTML
              </label>
              <label>
                <Field
                  name="exterpise"
                  component="input"
                  type="checkbox"
                  value="css"
                />{" "}
                CSS
              </label>
              <label>
                <Field
                  name="exterpise"
                  component="input"
                  type="checkbox"
                  value="javascript"
                />{" "}
                JavaScript
              </label>
              <label>
                <Field
                  name="exterpise"
                  component="input"
                  type="checkbox"
                  value="nodejs"
                />{" "}
                Node.js
              </label>
              <label>
                <Field
                  name="exterpise"
                  component="input"
                  type="checkbox"
                  value="react"
                />{" "}
                React.js
              </label>
            </div>
          </div>
          <div>
            <label>Preferred</label>
            <div>
              <label>
                <Field
                  name="preferred"
                  component="input"
                  type="radio"
                  value="frontend"
                />{" "}
                Frontend
              </label>
              <label>
                <Field
                  name="preferred"
                  component="input"
                  type="radio"
                  value="backend"
                />{" "}
                Backend
              </label>
              <label>
                <Field
                  name="preferred"
                  component="input"
                  type="radio"
                  value="fullstack"
                />{" "}
                Fullstack
              </label>
            </div>
          </div>
          <div>
            <label>Notes</label>
            <Field name="notes" component="textarea" placeholder="Notes" />
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </Styles>
);

export default FinalForm;
