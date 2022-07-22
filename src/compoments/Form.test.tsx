import ReactDOM from "react-dom/client";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import { wait } from "@testing-library/user-event/dist/utils";
import { successMessage, errorMessage, emailExist } from "../static/messages";

const TIMEOUT = 200;

it("renders without crashing", () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  root.render(<Form />);
});

it("renders heading", () => {
  render(<Form />);
  expect(screen.getByText("Get Free Email Updates!")).toBeInTheDocument();
});

it("form success", async () => {
  global.alert = jest.fn();
  render(<Form />);

  fireChangeEventByPlaceholder(firstNamePlaceholderLocator, "first name");
  fireChangeEventByPlaceholder(emailPlaceholderLocator, "test-email@gmail.com");
  fireSubmit();

  await wait(TIMEOUT);

  expect(global.alert).toBeCalledTimes(1);
  expect(global.alert).toBeCalledWith(successMessage);
});

it("form required error", async () => {
  global.alert = jest.fn();
  render(<Form />);
  fireSubmit();

  await wait(1000);

  expect(global.alert).toBeCalledTimes(1);
  expect(global.alert).toBeCalledWith(errorMessage);
});

it("form emailExist error", async () => {
  global.alert = jest.fn();
  render(<Form />);

  fireChangeEventByPlaceholder(firstNamePlaceholderLocator, "first name");

  const email = require("../static/users.json")["users"][0]["email"];
  fireChangeEventByPlaceholder(emailPlaceholderLocator, email);

  fireSubmit();

  await wait(TIMEOUT);

  expect(global.alert).toBeCalledTimes(1);
  expect(global.alert).toBeCalledWith(emailExist);
});

const firstNamePlaceholderLocator = /First Name/i;
const emailPlaceholderLocator = /Email Address/i;
const submitButtonLocator = /Get Access Today!/i;

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9. See also: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

const fireChangeEventByPlaceholder = (
  placeholderLocator: RegExp,
  value: string
) => {
  fireEvent.change(screen.getByPlaceholderText(placeholderLocator), {
    target: { value: value },
  });
};

const fireSubmit = () => {
  fireEvent.click(screen.getByText(submitButtonLocator));
};
