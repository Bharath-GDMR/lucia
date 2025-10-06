@echo off
setlocal enabledelayedexpansion

echo.
echo This script will RE-CREATE all thumbnails with a borderless crop.
echo It will overwrite any existing thumbnails.
echo.
echo Press any key to begin...
pause > nul
echo.

(
    echo --- Re-creating thumbnails for t1 ---
    for /r "t1" %%F in (*.jpg, *.JPG) do (
        REM Process only original images, not ones in sub-folders like 'small' or 'thumbnails'
        echo "%%~dpF" | findstr /i /c:"\small\" >nul || echo "%%~dpF" | findstr /i /c:"\thumbnails\" >nul || (
            echo Processing: "%%~nxF"
            set "file_dir=%%~dpF"
            if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
            set "thumb_path=!file_dir!thumbnails\%%~nxF"
            magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
        )
    )

    echo.
    echo --- Re-creating thumbnails for t2 ---
    for /r "t2" %%F in (*.jpg, *.JPG) do (
        echo "%%~dpF" | findstr /i /c:"\small\" >nul || echo "%%~dpF" | findstr /i /c:"\thumbnails\" >nul || (
            echo Processing: "%%~nxF"
            set "file_dir=%%~dpF"
            if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
            set "thumb_path=!file_dir!thumbnails\%%~nxF"
            magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
        )
    )

    echo.
    echo --- Re-creating thumbnails for t3 ---
    for /r "t3" %%F in (*.jpg, *.JPG) do (
        echo "%%~dpF" | findstr /i /c:"\small\" >nul || echo "%%~dpF" | findstr /i /c:"\thumbnails\" >nul || (
            echo Processing: "%%~nxF"
            set "file_dir=%%~dpF"
            if not exist "!file_dir!thumbnails\" mkdir "!file_dir!thumbnails\"
            set "thumb_path=!file_dir!thumbnails\%%~nxF"
            magick "%%F" -resize "400x400^" -gravity center -crop 400x400+0+0 +repage "!thumb_path!"
        )
    )

) > "thumbnail_recreation_log.txt" 2>&1

echo.
echo =================================
echo      Thumbnail recreation complete!
echo =================================
echo.
pause
