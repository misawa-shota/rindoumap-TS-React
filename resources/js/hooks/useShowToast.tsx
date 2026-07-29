import { toaster } from "../../../src/components/ui/toaster";
import { useCallback } from "react";

const useShowToast = () => {
    const showToast = useCallback((toastMessage: string) => {
        switch (toastMessage) {
            case "login-success":
                toaster.create({
                    title: "ログイン成功",
                    description: "ログインに成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            break;

            case "search-error":
                toaster.create({
                    title: "検索エラー",
                    description: "一致する林道が見つかりませんでした。",
                    type: "error",
                    closable: true,
                    duration: 5000,
                });
            break;

            case "post-create":
                console.log("post-createに入りました");
                toaster.create({
                    title: "投稿成功",
                    description: "投稿に成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            break;

            case "post-create-error":
                toaster.create({
                    title: "投稿エラー",
                    description: "投稿に失敗しました。",
                    type: "error",
                    closable: true,
                    duration: 5000,
                });
            break;
        }
    }, []);
    return { showToast };
};

export default useShowToast;
