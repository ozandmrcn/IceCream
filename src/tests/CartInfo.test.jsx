import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CartInfo from "../components/Modal/CartInfo";
import { mockCupItem, mockCornetItem } from "../utils/constants";
import userEvent from "@testing-library/user-event";

// Mock useDispatch from react-redux
const dispatchMock = vi.fn();
vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));

// Mock clearCart action
vi.mock("../redux/slices/cartSlice", () => ({
  clearCart: () => ({ type: "cart/clearCart" }),
}));

// Correct: mock toast and import it for assertions
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));
import { toast } from "react-toastify";

describe("CartInfo component tests", () => {
  const closeMock = vi.fn();

  it("If shipping applies, subtotal, shipping and total are rendered correctly", () => {
    // Cart with subtotal < 100, shipping should be 20
    const cart = [
      { ...mockCupItem, amount: 2 }, // 22.5 * 2 = 45
      { ...mockCornetItem, amount: 1 }, // 25 * 1 = 25
    ];
    // subtotal = 70, shipping = 20, total = 90
    render(<CartInfo cart={cart} close={closeMock} />);

    // Subtotal
    screen.getByText(/Subtotal/i);
    screen.getByText(/70\$/i);
    // Shipping
    screen.getByText(/Shipping Fee/i);
    screen.getByText(/20\$/i);
    // Total
    expect(screen.getAllByText(/Total/i).length).toBeGreaterThan(0);
    screen.getByText(/90\$/i);
  });

  it("If subtotal is 100 or more, only total is rendered (free shipping)", () => {
    // Cart with subtotal >= 100, shipping should be 0
    const cart = [
      { ...mockCupItem, amount: 3 }, // 22.5 * 3 = 67.5
      { ...mockCornetItem, amount: 2 }, // 25 * 2 = 50
    ];
    // subtotal = 117.5, shipping = 0, total = 117.5
    render(<CartInfo cart={cart} close={closeMock} />);

    // Subtotal and Shipping Fee should not be rendered
    expect(screen.queryByText(/Subtotal/i)).toBeNull();
    expect(screen.queryByText(/Shipping Fee/i)).toBeNull();
    // Total
    expect(screen.getAllByText(/Total/i).length).toBeGreaterThan(0);
    screen.getByText(/117.5\$/i);
  });

  it("If cart is empty, only checkout button is rendered", () => {
    // Cart is empty
    render(<CartInfo cart={[]} close={closeMock} />);
    // Only button should be visible
    screen.getByRole("button", { name: /checkout/i });
    // No subtotal, shipping, or total
    expect(screen.queryByText(/Subtotal/i)).toBeNull();
    expect(screen.queryByText(/Shipping Fee/i)).toBeNull();
    expect(screen.queryByText(/Total/i)).toBeNull();
  });

  it("When checkout is clicked, clearCart is dispatched, modal is closed and toast is shown", async () => {
    const user = userEvent.setup();
    const cart = [{ ...mockCupItem, amount: 1 }];
    render(<CartInfo cart={cart} close={closeMock} />);
    const button = screen.getByRole("button", { name: /checkout/i });
    // Click checkout
    await user.click(button);
    // close should be called
    expect(closeMock).toHaveBeenCalledTimes(1);
    // dispatch should be called with clearCart
    expect(dispatchMock).toHaveBeenCalled();
    // toast.success should be called
    expect(toast.success).toHaveBeenCalledWith(
      "Success! We're getting your order ready for shipment."
    );
  });
});
