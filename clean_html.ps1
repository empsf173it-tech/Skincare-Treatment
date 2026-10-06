$base_dir = "f:\Smartfusion\October\Skincare_Beauty_Products_Store-main\Skincare_Beauty_Products_Store-main"

$html_files = Get-ChildItem -Path $base_dir -Filter *.html

foreach ($file in $html_files) {
    $content = Get-Content $file.FullName -Raw

    $content = $content -replace '(?si)\s*<link rel="stylesheet" href="assets/css/rtl\.css">', ''
    $content = $content -replace '(?si)\s*<li>\s*<a href="home2\.html"[^>]*>Home 2</a>\s*</li>', ''
    $content = $content -replace '(?si)\s*<a href="home2\.html"[^>]*>Home 2</a>', ''
    $content = $content -replace '(?si)\s*<button class="icon-btn rtl-toggle"[^>]*>.*?</button>', ''
    $content = $content -replace '(?si)\s*<script src="assets/js/home2\.js"></script>', ''

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

$files_to_delete = @(
    "$base_dir\home2.html",
    "$base_dir\assets\js\home2.js",
    "$base_dir\assets\css\rtl.css"
)

foreach ($f in $files_to_delete) {
    if (Test-Path $f) {
        Remove-Item $f -Force
    }
}
