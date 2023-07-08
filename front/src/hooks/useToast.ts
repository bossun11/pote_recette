import { useState, useEffect } from "react";

const useToast = (duration = 3000) => {
  const [message, setMessage] = useState<string | null>(null);

  // 一定時間後に自動的にトーストメッセージをクリアする
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message)
      timer = setTimeout(() => {
        setMessage(null);
      }, duration);

    // コンポーネントがアンマウントされるか、メッセージが変更されたときにタイマーをクリア
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message, duration]);

  // トーストメッセージを表示する関数
  const showToast = (msg: string) => {
    setMessage(msg);
  };

  // 現在のトーストメッセージをクリアする関数
  const clearToast = () => {
    setMessage(null);
  };

  return { message, showToast, clearToast };
};

export default useToast;
