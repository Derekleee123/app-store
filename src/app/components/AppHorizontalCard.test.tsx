import React from "react";
import { render, screen } from "@testing-library/react";
import AppHorizontalCard from "./AppHorizontalCard";
import "@testing-library/jest-dom";

// Mock props for the test
const mockTitle = "Sample App";
const mockDescription = "This is a description of the app.";
const mockImage = "https://example.com/sample-image.jpg";

describe("AppHorizontalCard", () => {
  it("should render the title, description, and image correctly", () => {
    render(
      <AppHorizontalCard
        title={mockTitle}
        description={mockDescription}
        image={mockImage}
      />,
    );

    // Check if the image is rendered correctly with the alt text
    const imageElement = screen.getByAltText(mockTitle);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockImage);

    // Check if the title is rendered
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockTitle);

    // Check if the description is rendered
    const descriptionElement = screen.getByText(mockDescription);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(mockDescription);
  });

  it("should not render description on smaller screens (hidden description)", () => {
    render(
      <AppHorizontalCard
        title={mockTitle}
        description={mockDescription}
        image={mockImage}
      />,
    );

    // Check that description is hidden for small screen sizes (in this case, .hidden class applies)
    const descriptionElement = screen.getByText(mockDescription);
    expect(descriptionElement).toHaveClass("hidden");
  });
});
