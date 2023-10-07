import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

const server = setupServer(
  rest.get("/auth/sessions", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
          image: {
            url: "/path/to/image.jpg",
          },
        },
      }),
    );
  }),

  rest.delete("/auth/sign_out", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Headerコンポーネントのテスト", () => {
  describe("ログインしていない場合のテスト", () => {
    test("BeforeLoginMenuのメニュー項目が表示されているか", () => {
      render(
        <AuthProvider>
          <Router>
            <Header />
          </Router>
        </AuthProvider>,
      );
      expect(screen.getByText("ショップ検索")).toBeInTheDocument();
      expect(screen.getByText("ログイン")).toBeInTheDocument();
      expect(screen.getByText("ユーザー登録")).toBeInTheDocument();
      expect(screen.getByText("利用規約")).toBeInTheDocument();
      expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
      expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
    });
  });

  describe("ログインしている場合のテスト", () => {
    beforeEach(() => {
      render(
        <AuthProvider initialIsSignedIn={true}>
          <ToastContainer />
          <Router>
            <Header />
          </Router>
        </AuthProvider>,
      );
    });
    test("AfterLoginMenuのメニュー項目が表示されているか", () => {
      expect(screen.getByText("ショップ検索")).toBeInTheDocument();
      expect(screen.getByText("人気ショップ")).toBeInTheDocument();
      expect(screen.getByText("ログアウト")).toBeInTheDocument();
      expect(screen.getByText("利用規約")).toBeInTheDocument();
      expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
      expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
    });

    test("ログアウトができるか", async () => {
      fireEvent.click(screen.getByText("ログアウト"));
      await waitFor(() => {
        expect(screen.getByText("ログアウトしました")).toBeInTheDocument();
      });
    });
  });
});
