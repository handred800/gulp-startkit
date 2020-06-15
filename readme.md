# 使用說明

## 輸出結果
```
├─dist
|  ├─index.html
│  └─common
│      ├─css    (自訂css)
│      ├─js     (自訂js)
│      └─vendors(套件)
|         └─jquery(套件folder)
```
## 半自動載入套件(優化中)
*1.npm 安裝套件之後在 gulpfile.js補上*

```js
// vendors 中加上安裝的套件名稱 + 子目錄(有指定的話)
// 更新：可以輸出指定的子目錄 (TODO: 可輸出指定的檔案)
// 以下為引入jquery + fontawesome 的子目錄 css, webfont
const vendors = [{
  name: 'jquery/dist',
  children: [],
}, {
  name: '@fortawesome/fontawesome-free',
  children: ['/css', '/webfonts']
}];

// task:vendors 用來遍歷 vendors 複製對應的 assets 輸出到 vendors
```
*2.補上所有 html 的引入位置 (TODO: 可以統一在gulp設定)*
更新：src/template/_script.html 用來放script標籤




