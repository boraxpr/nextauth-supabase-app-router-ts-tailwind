import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Index from "../app/page.tsx";
import cookies from "next/headers";

jest.mock("cookies");

describe("Page", () => {
  it("renders a heading", async () => {
    render(await Index());

    const text = screen.getByText("Index");

    expect(text).toBeInTheDocument();
  });
});
