import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { ToastContainer } from "react-toastify";
import Login from "./Login";

const server = setupServer(
  rest.post("/auth/sign_in", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: { id: 1, email: "test@example.com" } }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderLoginComponent = () => {
  return render(
    <HelmetProvider>
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Login />
        </Router>
      </AuthProvider>
    </HelmetProvider>,
  );
};

const setupLoginComponent = () => {
  beforeEach(() => {
    renderLoginComponent();
  });
};

describe("Loginコンポーネントのテスト", () => {
  describe("正常時のテスト", () => {
    setupLoginComponent();
    test("初期表示に問題ないか", () => {
      expect(screen.getByText("ログイン画面")).toBeInTheDocument();
      expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
      expect(screen.getByText("ログイン")).toBeInTheDocument();
    });

    test("ログインに成功するか", async () => {
      fireEvent.input(screen.getByLabelText("メールアドレス"), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });
      fireEvent.click(screen.getByText("ログイン"));
      await waitFor(() => {
        expect(screen.getByText("ログインしました。")).toBeInTheDocument();
      });
    });
  });

  describe("エラー時のテスト", () => {
    test("ログインに失敗するか", async () => {
      server.use(
        rest.post("/auth/sign_in", (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({ errors: ["ログインに失敗しました。"] }));
        }),
      );
      renderLoginComponent();
      fireEvent.input(screen.getByLabelText("メールアドレス"), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });
      fireEvent.click(screen.getByText("ログイン"));
      await waitFor(() => {
        expect(screen.getByText("ログインに失敗しました。")).toBeInTheDocument();
      });
    });

    describe("バリデーションエラー時のテスト", () => {
      describe("メールアドレスのバリデーションエラー", () => {
        setupLoginComponent();
        test("メールアドレスが空の場合", async () => {
          fireEvent.input(screen.getByLabelText("メールアドレス"), { target: { value: "" } });
          fireEvent.click(screen.getByText("ログイン"));
          await waitFor(() => {
            expect(screen.getByText("メールアドレスは必須です")).toBeInTheDocument();
          });
        });

        test("メールアドレスが無効な場合", async () => {
          const invalidEmail = "invalidEmail";
          fireEvent.input(screen.getByLabelText("メールアドレス"), {
            target: { value: invalidEmail },
          });
          fireEvent.click(screen.getByText("ログイン"));
          await waitFor(() => {
            expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
          });
        });
      });

      describe("パスワードのバリデーションエラー", () => {
        setupLoginComponent();
        test("パスワードが空の場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "" } });
          fireEvent.click(screen.getByText("ログイン"));
          await waitFor(() => {
            expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
          });
        });

        test("パスワードが50文字以上の場合", async () => {
          const longPassword = "a".repeat(51);
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: longPassword } });
          fireEvent.click(screen.getByText("ログイン"));
          await waitFor(() => {
            expect(screen.getByText("50文字以下で入力してください")).toBeInTheDocument();
          });
        });
      });
    });
  });
});
