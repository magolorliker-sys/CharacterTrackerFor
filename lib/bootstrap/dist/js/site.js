// wwwroot/js/site.js に追加してください

/**
 * JSONデータをファイルとしてダウンロードさせるヘルパー
 * @param {string} fileName - ダウンロードファイル名
 * @param {string} jsonContent - JSONテキスト
 */
window.downloadJsonFile = (fileName, jsonContent) => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};

/**
 * ファイル選択ダイアログを開き、選択されたJSONファイルの中身を返す
 * @returns {Promise<string>} JSONテキスト（キャンセル時は空文字）
 */
window.openJsonFile = () => {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.onchange = async (e) => {
            const file = e.target.files?.[0];
            if (!file) { resolve(""); return; }
            const text = await file.text();
            resolve(text);
        };
        input.oncancel = () => resolve("");
        input.click();
    });
};