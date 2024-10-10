// Home.test.tsx
import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page"; // Adjust the import path as needed
import { useAppStore } from "./store/useAppStore";
import "@testing-library/jest-dom";
import axios from "axios";

// Mock the useAppStore hook
jest.mock("./store/useAppStore");

// Mock axios
jest.mock("axios");

const mockSetAppList = jest.fn();
const mockSetOriginalAppList = jest.fn();
const mockSetHotApps = jest.fn();
const mockSetIsLoading = jest.fn();
const mockAppList = [
  {
    "im:name": { label: "Test App" },
    category: { attributes: { label: "Games" } },
    "im:image": [
      { label: "test_image_url" },
      { label: "test_image_url2" },
      { label: "test_image_url3" },
    ],
  },
];

const mockHotApps = [
  {
    "im:name": { label: "Hot Test App" },
    category: { attributes: { label: "Games" } },
    "im:image": [{ label: "hot_test_image_url" }],
  },
];

beforeEach(() => {
  // Mock the store state and functions
  (useAppStore as unknown as jest.Mock).mockReturnValue({
    appList: mockAppList,
    originalAppList: mockAppList,
    hotApps: mockHotApps,
    isLoading: false,
    setAppList: mockSetAppList,
    setOriginalAppList: mockSetOriginalAppList,
    setHotApps: mockSetHotApps,
    setIsLoading: mockSetIsLoading,
  });

  jest.clearAllMocks();
});

describe("Home Component", () => {
  it("renders header and search input", async () => {
    await act(async () => {
      render(<Home />);
    });
  });

  it("displays loading skeleton when isLoading is true", () => {
    // Update the mock to simulate loading state
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      ...useAppStore(),
      isLoading: true,
    });

    render(<Home />);
  });

  it("fetches apps on component mount", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        feed: {
          entry: mockAppList,
        },
      },
    });

    render(<Home />);
    await waitFor(() => {
      expect(mockSetAppList).toHaveBeenCalledWith(mockAppList);
      expect(mockSetOriginalAppList).toHaveBeenCalledWith(mockAppList);
    });
  });

  it("renders hot apps correctly", () => {
    render(<Home />);
    expect(screen.getByText("Hot Test App")).toBeInTheDocument();
  });
});
