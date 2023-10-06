import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";
import { AuthProvider } from "../../context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { ToastContainer } from "react-toastify";

const server = setupServer(
  rest.post("/auth", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: { id: 1, email: "test@example.com" } }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderRegisterComponent = () => {
  return render(
    <HelmetProvider>
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Register />
        </Router>
      </AuthProvider>
    </HelmetProvider>,
  );
};

const setupRegisterComponent = () => {
  beforeEach(() => {
    renderRegisterComponent();
  });
};

describe("Registerコンポーネントのテスト", () => {
  describe("正常時のテスト", () => {
    setupRegisterComponent();
    test("初期表示に問題ないか", () => {
      expect(screen.getByText("ユーザー登録画面")).toBeInTheDocument();
      expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
      expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード（確認用）")).toBeInTheDocument();
      expect(screen.getByText("登録する")).toBeInTheDocument();
    });

    test("ユーザー登録に成功するか", async () => {
      fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "testuser" } });
      fireEvent.input(screen.getByLabelText("メールアドレス"), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });
      fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByText("登録する"));
      await waitFor(() =>
        expect(screen.getByText("ユーザー登録が完了しました。")).toBeInTheDocument(),
      );
    });
  });

  describe("エラー時のテスト", () => {
    test("ユーザー登録に失敗するか", async () => {
      server.use(
        rest.post("/auth", (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );
      renderRegisterComponent();
      fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "testuser" } });
      fireEvent.input(screen.getByLabelText("メールアドレス"), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
      fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("登録する"));
      await waitFor(() =>
        expect(screen.getByText("ユーザー登録に失敗しました。")).toBeInTheDocument(),
      );
    });

    describe("バリデーションエラー時のテスト", () => {
      describe("ユーザー名のバリデーションエラー", () => {
        setupRegisterComponent();
        test("ユーザー名が空の場合", async () => {
          fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "" } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("名前は必須です")).toBeInTheDocument();
          });
        });

        test("ユーザー名が50文字以上の場合", async () => {
          const longName = "a".repeat(51);
          fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: longName } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("50文字以下で入力してください")).toBeInTheDocument();
          });
        });
      });

      describe("メールアドレスのバリデーションエラー", () => {
        setupRegisterComponent();
        test("メールアドレスが空の場合", async () => {
          fireEvent.input(screen.getByLabelText("メールアドレス"), { target: { value: "" } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("メールアドレスは必須です")).toBeInTheDocument();
          });
        });

        test("メールアドレスが無効な場合", async () => {
          const invalidEmail = "invalidEmail";
          fireEvent.input(screen.getByLabelText("メールアドレス"), {
            target: { value: invalidEmail },
          });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
          });
        });
      });

      describe("パスワードのバリデーションエラー", () => {
        setupRegisterComponent();
        test("パスワードが空の場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "" } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
          });
        });

        test("パスワードが8文字未満の場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "short" } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("8文字以上で入力してください")).toBeInTheDocument();
          });
        });

        test("パスワードが50文字以上の場合", async () => {
          const longPassword = "a".repeat(51);
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: longPassword } });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("50文字以下で入力してください")).toBeInTheDocument();
          });
        });
      });

      describe("パスワード（確認用）のバリデーションエラー", () => {
        setupRegisterComponent();
        test("パスワード（確認用）が空の場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
            target: { value: "" },
          });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("パスワード(確認用)は必須です")).toBeInTheDocument();
          });
        });

        test("パスワード（確認用）が8文字未満の場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
            target: { value: "short" },
          });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("8文字以上で入力してください")).toBeInTheDocument();
          });
        });

        test("パスワード（確認用）が50文字以上の場合", async () => {
          const longPassword = "a".repeat(51);
          fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
            target: { value: longPassword },
          });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(screen.getByText("50文字以下で入力してください")).toBeInTheDocument();
          });
        });

        test("パスワードとパスワード（確認用）が一致しない場合", async () => {
          fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });
          fireEvent.input(screen.getByLabelText("パスワード（確認用）"), {
            target: { value: "password123" },
          });
          fireEvent.click(screen.getByText("登録する"));
          await waitFor(() => {
            expect(
              screen.getByText("パスワードと確認用パスワードが一致していません"),
            ).toBeInTheDocument();
          });
        });
      });
    });
  });
});
