import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import DefaultButton from "./DefaultButton";

describe("DefaultButtonコンポーネントの動作確認", () => {
  test("初期表示に問題ないか", () => {
    const { getByText } = render(<DefaultButton buttonText="テストボタン" />);
    const buttonElement = getByText(/テストボタン/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
