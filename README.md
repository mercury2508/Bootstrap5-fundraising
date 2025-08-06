# Bootstrap 5 募資網站
這是一個使用 Bootstrap 5 製作的募資網站，主要製作募資網站的首頁並實作以下功能：

- RWD 響應
- Scss 客製化按鈕與邊距
- Bootstrap 5 元件 (Modal, Accordion, Collapse, Navbar)

## 技術棧
- Bootstrap 5
- SCSS
- Live Sass Compiler

## 客製化樣式
1. 以 NPM 下載 Bootstrap 後，為了自定義，從專案資料夾內的 node_modules/bootstrap/scss，將 _variables.scss 和 _utilities.scss 複製一份貼到 custom 資料夾以便管理。檔案結構可以參考 Bootstrap 的[官方文件](https://bootstrap5.hexschool.com/docs/5.0/customize/sass/)。
(複製一份起來是為了避免修改原始檔，萬一想改回最原始的狀態或不知道當初修改了哪裡，就能夠參照原始檔回到最初始的樣式設定。)
2. 樣式匯入設定上，在 scss/all.scss 內從上到下按順序 `@import` 檔案：

- functions
- _variables.scss (複製的)
- _variables.scss
- _map.scss 
- _mixins.scss
- _utilities.scss (複製的)

詳細 `@import` 順序可以參考 [all.scss](https://github.com/mercury2508/Bootstrap5-fundraising/blob/main/scss/all.scss)。
原則上都是先 `@import` 自定義，之後才是原始的檔案，這樣才能夠覆蓋掉原始樣式設定。
3. 結束上面的步驟後，可以先觀察一下設定稿，設計稿之中用到許多不同於 Bootstrap 預設的色系，這時候我們就可以到複製的 _variables.scss 中的 theme-colors 做修改。把預設顏色註解後，換上指定的顏色，並多加註解 `custom`，以便之後快速查詢。以 `theme-color` 的 `$warning` 為例：
```
// 更改前
$warning: $yellow !default;

// 更改後
$warning: #FFDF65; //$yellow !default; custom
```

4. 除了顏色的部分，也有許多間距需要客製化，一樣在 _variables.scss 的 Spacing 做調整，這樣就能讓 `padding` 還有 `margin`, `gap` 做出更靈活的間距。

## 客製化通用類別
如果有想用的 css 但是 Bootstrap 內卻沒有相應的語法也能自行新增，例如:游標的顯示方式，到複製的 _utilities.scss 內，加上下面這一段：
```
$utilities: () !default;

$utilities: map-merge(
  $utilities,
  (
    "cursor": (
      property: cursor,
      class: cursor,
      responsive: true,
      values: auto pointer grab,
    )
  )
);
```
第一行為了避免　`$utilities` undefined 的錯誤，先給他一個空的 map。透過這樣的方式，可以讓我們產出 `.cursor-*` 這樣的 class。

稍微解釋一下 map 裡面的選項：
- `property` 必填，後面接的是要指定的 css 樣式。
- `class` 選填，可以自訂 class 名稱。
- `responsive` 選填 `true` 或 `false`，讓使用者決定該 class 是否要生成響應式類別，例如 `.cursor-sm-*`、`.cursor-md-*`。
- `values` 必填，後面接可以套用的值，例如 `.cursor-auto`、`.cursor-lg-pointer`。

這樣一來就能使用 `.cursor-pointer` 這個 class 來改變游標的形狀。

## 客製化按鈕
在「登入」、「贊助專案」、「贊助此專案」這些按鈕上，由於我們需要改變按鈕 `:hover` 時的底色和字體顏色，則是在 scss/custom 建立了一個 _btn.scss 專門用來寫客製化按鈕，以覆蓋的方式更改 `.btn-warning` 原先的設定，並新增了 `transition: 0.3s;` 使顏色轉變加上一點時間、讓看上去更舒適。

而「追蹤專案」和「分享按鈕」中的圖案則是使用 [Bootstrap icons](https://icons.getbootstrap.com/)，以 CDN 的方式在 `<head>` 內引入，接著到官網上尋找圖案，將圖案的 icon font 程式碼複製貼上到 html。
這兩個有圖案的按鈕在 hover 時，圖案和按鈕本身的顏色都要做變化，因此直接寫一個 `.btn-custom` 來使用。

## 字型
主要字型為 Noto Sans TC，另一個則是 Baloo Tamma 2 用於數字，可以到 [Google Font](https://fonts.google.com/) 搜尋這兩個字型，找到後選擇 get font 接著點選右上的 view selected families，選擇 get embed code，將程式碼貼到 index.html 的 `<head>` 內，這樣就能在 scss 裡面使用這兩個字型了。
[Google Font 載入教學筆記](https://codepen.io/Mercury2508/pen/XJJYrRb)

由於整個網頁的主要字型是 Noto Sans TC，所以我在 _index.scss 內將其直接套用在 `body` 上，而 Baloo Tamma 2 不會一直用到的關係，則是另外建立 class 做使用。

## Modal
1. 可以先將 Bootstrap 官方提供的[範例](https://bootstrap5.hexschool.com/docs/5.0/components/modal/#live-demo)複製貼上。
2. 接著在 `</body>` 的之前加入 `bootstrap.bundle.min.js` 的 CDN (裡面包含了 Modal 需要的 JavaScript 和 Popper)。
3. 存檔刷新頁面看看 Modal 元件是否有成功啟用，有成功將元件引入後再來調整 Modal 內容。
4. 按照設計稿的指示，我們需要在按下登入按鈕後彈出 Modal 視窗，因此要在登入按鈕加上 `data-bs-toggle="modal"` 和 `data-bs-target="#myModal"` 來和 Modal 視窗做綁定，而 Modal 本身的 `id` 也要和按鈕上的做對應 `id="myModal"`。

補充，Modal 還有一些其他 `data-bs-*` 可以做設定，例如 `data-bs-backdrop="static"` 阻止用戶點 Modal 以外的地方來關閉，`data-bs-keyboard="false"` 則是阻止用戶以 ESC 按鍵方式關閉 Modal。

## Navbar
1. 觀察首頁頂部的導覽列，有個黃色底部 border 占了整個橫幅，因此在頂部先做一個 `<header>` 並用 `.border-5` 和 `.border-warning` 做出顏色和底部厚度，裡面則是一個 `.container` div，讓導覽列可以兩側留白居中，再更裡面才是 `.navbar` 讓導覽列有響應式效果和漢堡選單。
2. 裡面的 `.navbar` 可以參考官方範例，再把內容修改成我們需要的樣子，左側 Logo 的部分是 `<a>` 包著 `<img>`，讓用戶可以點擊 Logo 返回首頁，並向右推擠做出間隔。
3. 其他導覽列按鈕以 `<ul>` > `<li>` 做出來，並且在裡面的 `<a>` 加上 padding 撐開所需的寬、高。
4. 最右邊的兩個按鈕，用一個 div 包住以 `text-align-end` 的方式讓按鈕靠右。


## 上方產品區塊
先在外層給予背景顏色 `.bg-light`，內層則是用 `.container` 包起來，最上面的 tag 和商品標題由上到下自然排列，不需要特別用格線系統，各自用 `<span>` 和 `<h1>` 就可以了。

### 左側區塊
產品圖片和右側一堆數字、進度條、圖案的部分，使用格線系統將左右分為 7 : 5 ，產品圖片要記得使用 `rounded`，讓空間與圖片圓角切齊。
(請注意，使用格線系統的話就不該在 `.row` 和 `.col` 上使用水平向的 padding 或 margin)

### 右側區塊
1. 從上到下規劃出 6 ~ 7 個小區塊，價格的部分用 `<p>` 就好，不需要用到 `<h*>`，因為帶有標題含意的部分卻只有金額會有點奇怪，也會影響 SEO。
2. 進度條調整背景和字體顏色，進度則是調整 inline-style 的 `style="width: 41%"`，其他 `aria-valuenow` 也要記得一併調整，最後加上 `.mb-3` 與下方文字做出空間。
3. 贊助人數與募資倒數的部分，最外層用 `.row` div 包住，裡面用 `.col` 1 : 1 區分左右，`.col` 內在各自用 `<p>` 做出文字和數字，數字的字型就要用上自定義的 Baloo Tamma 2。
4. 四個圖案外層用 div 包起來，使用 `.d-flex` 和 `gap` 來調整圖案的間距，用 `.justify-content-*` 調整水平對齊、`.align-items-center` 調整垂直置中。滑鼠懸浮於圖案上時會出現提示框，可以參考 Bootstrap 的工具提示框(Tooltips)，手機寬度下則是直接顯示提示框的內容，因此用 `<p>` 並加上 `.d-sm-none`。
5. 募資截止時間提示的背景顏色是白色、邊框需要圓弧，雖然 border 只需要左側 2px 就好，但沒辦法直接以 Bootstrap 的 class 來達成，因此另外寫一個 class 來用。
6. 贊助專案的按鈕與導覽列的登入按鈕效果一樣，直接套用 `.btn-warning`。
7. 「追蹤專案」和「分享按鈕」的最外層套一個 `.row` div，並且用 `.g-2` 調整兩個按鈕的間距，左邊按鈕外層套 `.col-7`、右側按鈕只有用 `.col` 讓它自適應剩下的空間。


## 專案介紹區塊導覽列
做法類似頂部的導覽列，不過這邊不需要漢堡按鈕因此改用 `.nav` 就好，點選按鈕會切換底下內文的方式以 `.nav-tabs` 達成。
當網頁繼續往下瀏覽，讓導覽列繼續黏在視窗頂部，做法是在最外層的容器要設定 `.position-sticky` 和 `.top-0`，但要注意父層容器是否有 overflow 屬性 hidden, scroll, auto, overlay，這些屬性會讓 sticky 失效，還有一點是「父層容器的高度必須大於要黏住的容器」，意思是要讓黏住的容器在空間內上下活動，必須給他足夠的空間活動，不然他動不了。

### 常見問題區塊
點選問題後展開回答的模式可以參考手風琴(accordion)，如果想讓問題不會因為開啟其他問題而關閉，可以把 `data-bs-parent` 這個屬性去掉。
手風琴的邊框顏色、圓角弧度則是另外寫 class 來覆蓋原本的設定。

### 目前進度區塊
使用 `.card` 和 `<ul>` `<li>` 來製作，每個 card 左側的圖片在各個寬度下都不太一樣，因此另外寫 class 制定各個視窗寬度下的 width。
在 card 右側底部的 MORE `<a>` 上使用 `.stretched-link`，就能讓整個 card 都能點擊。

## form 區塊
form 上方的水平線，先做外層容器 `.position-relative` div，裡面再放水平線和文字。
水平線用進度條 `aria-valuemax="100"` 做出來，高度在行內直接設定 3px ，水平線上的「贊助專案」文字用 `<p>` 做，而 class 用 `.position-absolute` `.top-0` `.start-50`，此時文字應該處於水平線的中間偏右下方，接著使用 `.translate-middle` 讓文字區塊移到水平線中央，最後幫文字再加上白色背景和左右側 padding，把文字周圍的水平線蓋住就可以了。

再來 form 本身，`<label>` 的 `for` 和 `<input>` 的 `id` 要一致，下拉式選單則是用 `<select>` 選項則是 `<option>`，預設的選項可以在起始標籤內加上 `selected`，起始標籤內也應該加上 `value="A Plain"`。由於全部選項都是必填，要在全部的 `<input>` 和 `<select>` 上加上 `required`。

為了自訂 form 驗證樣式，要把 `novalidate` 加到 `<form>` 中，改用 JavaScript 來執行驗證，另外建立一個 `.js` 檔案將官方提供的 JS 程式碼貼上。注意，即使完全照著官方文件操作，還是會遇到 invalid 沒有運作的情況，問題出在程式碼已經運作，但是 DOM 節點還沒產生，導致抓不到 DOM 因此不會運作。

invalid 的文字可以在 `.invalid-feedback` div 上做調整。

## 可以改善的部分
