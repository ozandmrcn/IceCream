import { afterEach, describe, expect, it, vi } from "vitest";
import api from "../utils/api";
import List from "../components/List";
import { render, screen, waitFor } from "@testing-library/react";
import Card from "../components/Card";
import { mockData } from "../utils/constants";

// Mocked API
vi.mock("../utils/api");

// Mocked Card component
vi.mock("../components/Card");

describe("List components tests", () => {
  // Reset mock settings after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("If API response pending loader should be on screen", async () => {
    // When api.get is called, return a promise that resolves to an empty array
    api.get.mockResolvedValueOnce({ data: [] });

    // Render the List component
    render(<List />);

    // Loader is on screen
    screen.getByTestId("loader");

    // After a certain time loader will gone on screen
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();
    });
  });

  it("If API response is rejected error message should be on screen", async () => {
    // When api.get is called, return a promise that rejects with an error
    api.get.mockRejectedValue(new Error("An error acquired"));

    // Render the List component
    render(<List />);

    // Is error component is on screen
    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });

  it("If API response is fulfilled all cards should be on screen", async () => {
    // Decide the content of cards instead of cards
    Card.mockImplementation(({ name }) => <div>{name}</div>);

    // When api.get is called, return a promise that resolves to an array of cards
    api.get.mockResolvedValueOnce({
      data: mockData,
    });

    // Render the List component
    render(<List />);

    // After a certain time all data should be on screen that comes from api.get and rendered with Card component
    await waitFor(() => {
      mockData.forEach((item) => {
        screen.findByText(item.name);
      });
    });
  });
});
