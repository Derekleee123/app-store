import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "./layout"; // Adjust the import path as needed
import { version as versionNumber } from "../../package.json";
import "@testing-library/jest-dom";

// Mock the version number if needed
jest.mock("../../package.json", () => ({
  version: "1.0.0",
}));

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <h1>Hello, World!</h1>
      </RootLayout>,
    );

    // Check if the children are rendered
    expect(getByText("Hello, World!")).toBeInTheDocument();
  });

  it("renders the app version in a hidden div", () => {
    const { container } = render(
      <RootLayout>
        <h1>Test App</h1>
      </RootLayout>,
    );

    // Check if the version div exists and has the correct version number
    const versionDiv = container.querySelector("#app-version");
    expect(versionDiv).toBeInTheDocument();
    expect(versionDiv).toHaveTextContent(versionNumber); // Assuming versionNumber is '1.0.0'
    expect(versionDiv).toHaveClass("hidden"); // Check if it has the 'hidden' class
  });
});
