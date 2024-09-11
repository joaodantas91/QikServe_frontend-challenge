import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from ".";

describe('Navbar Component', () => {
  it('should render the current menu Item`', () => {
    render(<Navbar />)

    expect(screen.getByText('Menu')).toBeInTheDocument();
  })
})