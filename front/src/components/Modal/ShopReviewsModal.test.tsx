import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import ShopReviewsModal from "./ShopReviewsModal";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ShopReviewsModalコンポーネントのテスト", () => {
  describe("正常時のテスト", () => {
    test("レビューがない場合", () => {
      render(<ShopReviewsModal id="test" rating={3.5} user_ratings_total={10} />);
      expect(screen.getByText("口コミはありません")).toBeInTheDocument();
    });

    test("レビューがある場合", () => {
      const reviews = [
        {
          text: "test",
          time: 1623686400,
          relative_time_description: "1ヶ月前",
        },
        {
          text: "test2",
          time: 1234567890,
          relative_time_description: "1ヶ月前",
        },
      ];
      render(<ShopReviewsModal id="test" rating={3.5} user_ratings_total={10} reviews={reviews} />);
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("test2")).toBeInTheDocument();
    });
  });
});
