import { describe, expect, it, vi } from "vitest";
import CartItem from "./../components/Modal/CartItem";
import CartInfo from "./../components/Modal/CartInfo";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import Modal from "./../components/Modal/index";
import userEvent from "@testing-library/user-event";
import { mockCartData } from "../utils/constants";

// Mocked useSelector hook
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

// Mocked Cart Item Component
vi.mock("./../components/Modal/CartItem", () => ({
  default: ({ item }) => <h1>{item.name}</h1>,
}));

// Mocked Cart Info Component
vi.mock("./../components/Modal/CartInfo", () => ({
  default: () => <h1>Cart Info</h1>,
}));

describe("Modal Component Tests", () => {
  const closeMock = vi.fn();

  it("Modal component should be rendered or not rendered depending on isOpen prop", () => {
    // When useSelector called return this
    useSelector.mockReturnValue({ cart: [] });

    // Render Modal component with isOpen prop set to false
    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    // If isOpen = false Modal component should not be on screen
    expect(screen.queryByTestId("modal")).toBeNull();

    // Rerender Modal component with isOpen prop set to true
    rerender(<Modal isOpen={true} close={closeMock} />);

    // If isOpen = true Modal component should be on screen
    expect(screen.queryByTestId("modal")).toBeInTheDocument();
  });

  it("When clicked X button close function should be called", async () => {
    const user = userEvent.setup();

    // When useSelector called return this
    useSelector.mockReturnValue({ cart: [] });

    // Render Modal component with isOpen prop set to true
    render(<Modal isOpen={true} close={closeMock} />);

    // Select Close Button
    const closeBtn = screen.getByTestId("close");

    // Click to Close Button
    await user.click(closeBtn);

    // Is Close Function called
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it("If Cart is empty a warning should be displayed", () => {
    // When useSelector called return this
    useSelector.mockReturnValue({ cart: [] });

    // Render Modal component with isOpen prop set to true
    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    // A warning should be on screen
    screen.getByText(/There is no products added to cart/i);

    // On next render useSelector should be called with mockCartData
    useSelector.mockReturnValue({ cart: mockCartData });

    // Rerender Modal component with isOpen prop set to true
    rerender(<Modal isOpen={true} close={closeMock} />);

    // A warning should not be on screen
    expect(
      screen.queryByText(/There is no products added to cart/i)
    ).toBeNull();
  });

  it("If Cart has item in it for each item CartItem should be rendered", () => {
    // When useSelector called return this
    useSelector.mockReturnValue({ cart: mockCartData });

    // Render Modal component with isOpen prop set to true
    render(<Modal isOpen={true} close={closeMock} />);

    // For each item CartItem should be rendered
    mockCartData.forEach((item) => screen.getByText(item.name));
  });
});
