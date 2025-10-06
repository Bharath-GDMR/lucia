@echo off
setlocal enabledelayedexpansion

echo.
echo This script will create 'small' and 'thumbnail' versions of all .JPG files.
echo It may take a while depending on the number of photos.
echo.
echo Press any key to begin...
pause > nul
echo.

(
    echo --- Processing t2 ---
    for /f "delims=" %%F in ('dir /s /b "t2\*.jpg" "t2\*.JPG" ^| findstr /v /i "\small\" ^| findstr /v /i "\thumbnails\"') do (
        echo Processing: "%%~nxF"
        set "file_dir=%%~dpF"
        if not exist "!file_dir!small\" mkdir "!file_dir!small\"
        if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
        set "small_path=!file_dir!small\%%~nxF"
        set "thumb_path=!file_dir!thumbnails\%%~nxF"
        if not exist "!small_path!" magick "%%F" -resize "1920x1920>" "!small_path!"
        if not exist "!thumb_path!" magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
    )

    echo.
    echo --- Processing t3 ---
    for /f "delims=" %%F in ('dir /s /b "t3\*.jpg" "t3\*.JPG" ^| findstr /v /i "\small\" ^| findstr /v /i "\thumbnails\"') do (
        echo Processing: "%%~nxF"
        set "file_dir=%%~dpF"
        if not exist "!file_dir!small\" mkdir "!file_dir!small\"
        if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
        set "small_path=!file_dir!small\%%~nxF"
        set "thumb_path=!file_dir!thumbnails\%%~nxF"
        if not exist "!small_path!" magick "%%F" -resize "1920x1920>" "!small_path!"
        if not exist "!thumb_path!" magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
    )

    echo.
    echo --- Processing t4 ---
    for /f "delims=" %%F in ('dir /s /b "t4\*.jpg" "t4\*.JPG" ^| findstr /v /i "\small\" ^| findstr /v /i "\thumbnails\"') do (
        echo Processing: "%%~nxF"
        set "file_dir=%%~dpF"
        if not exist "!file_dir!small\" mkdir "!file_dir!small\"
        if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
        set "small_path=!file_dir!small\%%~nxF"
        set "thumb_path=!file_dir!thumbnails\%%~nxF"
        if not exist "!small_path!" magick "%%F" -resize "1920x1920>" "!small_path!"
        if not exist "!thumb_path!" magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
    )

) > "final_creation_log.txt" 2>&1

echo.
echo =================================
echo      Image processing complete!
echo =================================
echo.
echo A log has been saved to final_creation_log.txt
echo Please check your image folders to confirm the new files were created.
pause
