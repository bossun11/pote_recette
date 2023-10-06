import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NeutralButton from "./NeutralButton";

describe("NeutralButtonコンポーネントの動作確認", () => {
  test("初期表示に問題ないか", () => {
    const { getByText } = render(<NeutralButton buttonText="テストボタン" />);
    const buttonElement = getByText(/テストボタン/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("処理の成功時のテスト", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<NeutralButton buttonText="テストボタン" onClick={handleClick} />);
    fireEvent.click(getByText("テストボタン"));
    expect(handleClick).toHaveBeenCalled();
  });

  test("クリックイベント未提供時のテスト", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<NeutralButton buttonText="テストボタン" />);
    fireEvent.click(getByText("テストボタン"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
