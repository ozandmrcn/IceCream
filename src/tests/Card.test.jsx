import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Card from "../components/Card";
import { mockData } from "../utils/constants";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { addToCart } from "../redux/slices/cartSlice";

// useDispatch mock
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

// userEvent setup
const user = userEvent.setup();

describe("Card component tests", () => {
  // Mock dispatch that returning from useDispatch hook
  const dispatchMock = vi.fn();

  // When useDispatch called return mocked dispatch
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Reset mocks after all tests
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Is data coming depends of item prop", () => {
    render(<Card item={mockData[0]} />);

    // Is Heading and Price on screen
    screen.getByText(mockData[0].name);
    screen.getByText(`${mockData[0].price}$ per scoop`);

    // Is src of image is correct
    const img = screen.getByAltText(mockData[0].name);
    expect(img).toHaveAttribute("src", mockData[0].image);
  });

  it("Is visibility of Add to Cart button changes depends of selectedTypes state", async () => {
    // Render Card component
    render(<Card item={mockData[0]} />);

    // Is Add to Cart button exists
    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

    // Is Add to Cart button is invisible (default value is invisible)
    expect(addToCartBtn).toHaveClass("invisible");

    // Is Cornet selection button exists
    const cornetBtn = screen.getByRole("button", { name: /cornet/i });

    // Click to Cornet selection button
    await user.click(cornetBtn);

    // Is Add to Cart button is visible now
    expect(addToCartBtn).not.toHaveClass("invisible");

    // Click to Cornet selection button
    await user.click(cornetBtn);

    // Is Add to Cart button is invisible
    expect(addToCartBtn).toHaveClass("invisible");
  });

  it("When clicked to Add to Cart do button action is dispatching", async () => {
    // Render the Card component
    render(<Card item={mockData[0]} />);

    // Is Cup selection button exists
    const cupBtn = screen.getByRole("button", { name: /cup/i });

    // Click to Cup selection button
    await user.click(cupBtn);

    // Is Add to Cart button exists
    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

    // Click to Add to Cart button
    await user.click(addToCartBtn);

    // Is dispatch called with correct params
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({
        item: mockData[0],
        selectedType: "cup",
      })
    );
  });
});
