// AppListTable.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useAppStore } from "../store/useAppStore";
import AppListTable from "./AppListTable";
import "@testing-library/jest-dom";
import axios from "axios";

// Mock the useAppStore hook
jest.mock("../store/useAppStore");

const mockAppList = [
  {
    "im:name": { label: "YouTube" },
    category: { attributes: { label: "照片和影片" } },
    "im:image": [
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/14/33/86/143386d7-546d-d3b4-56d7-fa9bbf6401f4/logo_youtube_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/53x53bb.png",
      },
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/14/33/86/143386d7-546d-d3b4-56d7-fa9bbf6401f4/logo_youtube_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/53x53bb.png",
      },
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/14/33/86/143386d7-546d-d3b4-56d7-fa9bbf6401f4/logo_youtube_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/100x100bb.png",
      },
    ],
  },
  {
    "im:name": { label: "TikTok - 有趣的人都在這裡" },
    category: { attributes: { label: "照片和影片" } },
    "im:image": [
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b3/fc%C3%A7/a1/b3fca1f6-5768-abdb-276c-19b44af58f82/AppIcon_TikTok-0-0-1x_U007epad-0-0-0-85-220.png/53x53bb.png",
      },
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b3/fc/a1/b3fca1f6-5768-abdb-276c-19b44af58f82/AppIcon_TikTok-0-0-1x_U007epad-0-0-0-85-220.png/75x75bb.png",
      },
      {
        label:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b3/fc/a1/b3fca1f6-5768-abdb-276c-19b44af58f82/AppIcon_TikTok-0-0-1x_U007epad-0-0-0-85-220.png/100x100bb.png",
      },
    ],
  },
];

describe("AppListTable", () => {
  beforeEach(() => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      appList: mockAppList,
      isLoading: false,
      isChangePage: false,
      setIsChangePage: jest.fn(),
    });

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
    });
  });

  afterAll(() => {
    // 還原 window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
    });
  });

  it("renders the table with no data", () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      appList: [],
      isLoading: true,
      isChangePage: false,
      setIsChangePage: jest.fn(),
    });

    render(<AppListTable />);
  });

  it("renders the table with app data", () => {
    render(<AppListTable />);

    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.getByText("TikTok - 有趣的人都在這裡")).toBeInTheDocument();
    expect(screen.getAllByAltText("image")).toHaveLength(2);
  });

  it("calls setIsChangePage on pagination change", async () => {
    const setIsChangePageMock = jest.fn();

    // https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json
    const getApps = async () => {
      {
        try {
          const response = await axios.get(
            "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json",
          );
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }
    };

    const appList = await getApps();

    // mock useAppStore
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      appList: appList.feed.entry,
      isLoading: false,
      isChangePage: false,
      setIsChangePage: setIsChangePageMock,
    });

    render(<AppListTable />);

    const paginationButton = screen.getByText("2");
    fireEvent.click(paginationButton); // Simulate pagination change

    expect(setIsChangePageMock).toHaveBeenCalledWith(true);
  });

  it("scrolls to the correct position on page change", async () => {
    const getApps = async () => {
      {
        try {
          const response = await axios.get(
            "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json",
          );
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }
    };

    const appList = await getApps();

    // mock useAppStore
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      appList: appList.feed.entry,
      isLoading: false,
      isChangePage: false,
      setIsChangePage: jest.fn(),
    });

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    render(<AppListTable />);

    // Simulate a change in pagination

    fireEvent.click(screen.getByText("2"));
    act(() => {
      window.innerWidth = 800; // 設定為大螢幕尺寸
      window.dispatchEvent(new Event("resize")); // 觸發 resize 事件
    });
    // Simulate clicking the pagination button
    fireEvent.click(screen.getByText("3")); // Simulate clicking the pagination button
  });
});
