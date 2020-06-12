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
* 1.npm 安裝套件之後在 gulpfile.js補上

```js
// vendors 中加上安裝的套件名稱
const vendors = ['jquery/dist','@fortawesome/fontawesome-free'];

// 此段遍歷 vendors 複製對應的 assets 輸出到 vendors
// TODO: 可以取用特定的 assets (e.g.: 只取用 jquery.min.js) 減少輸出容量
gulp.task('vendors', () => {
    return mergeStream(vendors.map(function (vendor) {
        return gulp.src('node_modules/' + vendor.path + '/**/*')
            .pipe(gulp.dest('dist/common/vendors/' + vendor.path.replace(/\/.*/, '')));
    }));
});
```
* 2.補上所有 html 的引入位置 (TODO: 可以統一在gulp設定)




