import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import CartItem from "../components/Modal/CartItem";
import { mockCornetItem, mockCupItem } from "../utils/constants";
import AmountPicker from "../components/Modal/AmountPicker";

vi.mock("../components/Modal/AmountPicker", () => ({
  default: () => <h1>AmountPicker</h1>,
}));

describe("CartItem Component Tests", () => {
  it("When item type is 'Cup' it renders corret"),
    () => {
      // Render CartItem components with cup item
      render(<CartItem item={mockCupItem} />);

      // Get the image element
      const img = screen.getByRole("img");

      // Is image attribute is correct
      expect(img).toHaveAttribute("src", mockCupItem.image);

      // Is title element is correct
      screen.getByText(/In Cup/i);

      // Is total price is correct
      screen.getByText(`${mockCupItem.price * mockCupItem.amount}$`);
    };

  it("When item type is 'Cornet' it renders corret"),
    () => {
      // Render CartItem components with cornet item
      render(<CartItem item={mockCornetItem} />);

      // Get the image element
      const img = screen.getByRole("img");

      // Is image attribute is correct
      expect(img).toHaveAttribute("src", mockCornetItem.image);

      // Is title element is correct
      screen.getByText(/In Cone/i);

      // Is total price is correct
      screen.getByText(`${mockCornetItem.price * mockCornetItem.amount}$`);
    };
});
