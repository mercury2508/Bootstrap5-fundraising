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

1. 以 NPM 下載 Bootstrap 後，從專案資料夾內的 node_modules 中找到 bootstrap，將 _variables.scss 和 _utilities.scss 複製一份到自行建立的資料夾 scss，scss 內層可以再依據需求建立 custom 的資料夾以便管理。檔案結構可以參考 Bootstrap 的[官方文件](https://bootstrap5.hexschool.com/docs/5.0/customize/sass/)。複製一份起來是為了避免修改原始檔，萬一想改回最原始的狀態或不知道當初修改了哪裡，就能夠參照原始檔回到最初始的樣式設定。

2. scss 資料夾內的 all.scss 則是按順序 @import 檔案，@import 順序以 function 為優先，其次是自定義變數 _variables.scss，接著才是原始的 _variables.scss, _map.scss, mixins.scss，再來是自定義 _utilities.scss，與上面的 _variables.scss 一樣，都是先 @import 自定義，之後才是原始的檔案，這樣才能夠覆蓋掉原始樣式設定。
詳細 @import 順序可以參考 [all.scss](https://github.com/mercury2508/Bootstrap5-fundraising/blob/main/scss/all.scss)。

3. 結束上面的步驟後，可以先觀察一下設定稿，設計稿之中用到許多不同於 Bootstrap 預設的色系，這時候我們就可以到複製的 _variables.scss 中的 theme-colors 做修改。把預設顏色註解後，換上指定的顏色，並多加註解 `custom`，以便之後快速查詢。詳細程式碼如下：
```
$primary:       $blue !default;
$secondary:     #858377; //$gray-600 !default; custom
$success:       $green !default;
$info:          $cyan !default;
$warning:       #FFDF65; //$yellow !default; custom
$danger:        #f48263; //$red !default; custom
$light:         $gray-100 !default;
$dark:          #636057; //$gray-900 !default; custom
$base-dark:        #494846; // custom
```

4. 除了顏色的部分，也有許多間距需要客製化，一樣在 _variables.scss 的 Spacing 做調整。程式碼如下：
這樣就能讓 `padding` 還有 `margin`, `gap` 做出更靈活的間距。
```
$spacers: (
  0: 0,
  1: $spacer * .25,
  2: $spacer * .5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  61: $spacer * .75, // custom 12
  62: $spacer * .875, // custom 14
  63: $spacer * 1.125, // custom 18
  64: $spacer * 1.25, // custom 20
  65: $spacer * 2, // custom 32
  66: $spacer * 2.5, // custom 40
) !default;
```

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

`property` 為必填，後面接的是要指定的 css 樣式
`class` 為選填，可以自訂 class 名稱
`responsive` 為選填 `true` 或 `false`，讓使用者決定該 class 是否要生成響應式類別，例如 `.cursor-sm-*`、`.cursor-md-*`。
`values` 為必填，後面接可以套用的值，例如 `.cursor-auto`、`.cursor-lg-pointer`。

這樣一來就能在 class 的地方，以 `.cursor-pointer` 的方式改變游標的形狀。

## 客製化按鈕

在「登入」、「贊助專案」、「贊助此專案」這些按鈕上，由於我們需要改變按鈕 `:hover` 時的底色和字體顏色，則是在 scss/custom 建立了一個 _btn.scss 檔案專門用來寫客製化按鈕，
以覆蓋的方式更改 `.btn-warning` 原先的設定，並新增了 `transition: 0.3s;` 使顏色轉變加上一點時間、讓看上去更舒適。

而有個愛心圖案的「追蹤專案」和「分享按鈕」中的圖案則是使用 [Bootstrap icons](https://icons.getbootstrap.com/)，以 CDN 的方式在 `<head>` 內引入，接著到官網上尋找圖案，將圖案的 icon font 程式碼複製貼上到 html。
這兩個有圖案的按鈕在 hover 時，圖案要顯示 `#ff785e` 色，而按鈕顏色是變成黃色，因此直接寫一個 `.btn-custom` 來使用，裡面包含 `:hover` 時更改圖案顏色的 css。

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

觀察首頁頂部的導覽列，有個黃色底部 border 占了整個橫幅，因此在頂部先做一個 `<header>` 並用 `.border-5` 和 `.border-warning` 做出顏色和底部厚度，裡面則是包著一個有 `.container` div，讓導覽列可以兩側留白居中，再更裡面才是包 `.navbar` 讓導覽列有響應式效果和漢堡選單。

裡面的 `.navbar` 可以參考官方範例，再把內容修改成我們需要的樣子，左側 Logo 的部分是 `<a>` 包著 `<img>`，讓用戶可以點擊 Logo 返回首頁，並向右推擠做出間隔。

其他導覽列按鈕以 `<ul>` > `<li>` 做出來，並且在裡面的 `<a>` 加上 padding 撐開所需的寬、高。

最右邊的兩個按鈕，用一個 div 包住以 `text-align-end` 的方式讓按鈕靠右。

## 中央區塊

## sidebar 區塊

## 可以改善的部分
