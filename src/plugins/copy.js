export default async (_, inject) => {
  inject("copy", {
    CopyToClipboard(text = "") {
      if (!text || !navigator.clipboard) {
        alert("クリップボードにコピーできませんでした");
        return false;
      }
      navigator.clipboard.writeText(text).then(
        () => alert("クリップボードにコピーしました"),
        () => alert("クリップボードにコピーできませんでした")
      );
      return true;
    },
  });
};
