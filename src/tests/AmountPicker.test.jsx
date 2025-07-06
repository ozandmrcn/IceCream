import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AmountPicker from "../components/Modal/AmountPicker";
import { mockCupItem } from "../utils/constants";
import userEvent from "@testing-library/user-event";
import { addToCart, deleteFromCart } from "../redux/slices/cartSlice";

// useDispatch Mock
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("AmountPicker component tests", () => {
  // Mocked dispatch hook
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("item.amount prop is valid", () => {
    // Render AmountPicker component with mocked cup item
    render(<AmountPicker item={mockCupItem} />);

    // Check if the amount is displayed
    screen.getByText(mockCupItem.amount);
  });

  it("When clicked - button deleteFromCart action is dispached", async () => {
    // UserEvent Setup
    const user = userEvent.setup();

    // Render AmountPicker component with mocked cup item
    render(<AmountPicker item={mockCupItem} />);

    // Select minus button
    const minusBtn = screen.getByTestId("minusBtn");

    // Click minus button
    await user.click(minusBtn);

    // Check if deleteFromCart action is dispached correctly
    expect(mockDispatch).toHaveBeenCalledWith(
      deleteFromCart({ item: mockCupItem, selectedType: mockCupItem.type })
    );
  });

  it("When clicked + button addToCart action is dispached", async () => {
    // UserEvent Setup
    const user = userEvent.setup();

    // Render AmountPicker component with mocked cup item
    render(<AmountPicker item={mockCupItem} />);

    // Select plus button
    const plusBtn = screen.getByTestId("plusBtn");

    // Click plus button
    await user.click(plusBtn);

    // Check if addToCart action is dispached correctly
    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({ item: mockCupItem, selectedType: mockCupItem.type })
    );
  });
});
