@echo off
(
    setlocal enabledelayedexpansion

    echo.
    echo This script will create 'small' and 'thumbnail' versions of all images.
    echo This version checks for both .jpg and .JPG file extensions.
    echo.
    echo Current directory is: %cd%
    echo.

    set "dirs_to_process=t1 t2 t3"

    for %%D in (%dirs_to_process%) do (
        echo --- Processing directory: %%D ---
        
        if exist "%%D\" (
            REM Check for both lowercase and uppercase extensions
            for /r "%%D" %%F in (*.jpg, *.JPG) do (
                echo.
                echo --- Found File: %%~nxF ---

                set "file_dir=%%~dpF"

                if not exist "!file_dir!small\" (
                    echo   Creating 'small' directory...
                    mkdir "!file_dir!small\"
                )
                if not exist "!file_dir!thumbnails\" (
                    echo   Creating 'thumbnails' directory...
                    mkdir "!file_dir!thumbnails\"
                )

                set "small_path=!file_dir!small\%%~nxF"
                set "thumb_path=!file_dir!thumbnails\%%~nxF"

                if not exist "!small_path!" (
                    echo     -> Creating small version...
                    magick "%%F" -resize "1920x1920>" "!small_path!"
                ) else (
                    echo     -> Small version already exists. Skipping.
                )

                if not exist "!thumb_path!" (
                    echo     -> Creating thumbnail...
                    magick "%%F" -resize "400x400^" -gravity center -extent 400x400 "!thumb_path!"
                ) else (
                    echo     -> Thumbnail already exists. Skipping.
                )
            )
        ) else (
            echo Directory %%D not found. Skipping.
        )
        echo.
    )

    echo.
    echo =================================
    echo      Image processing complete!
    echo =================================
    echo.
) > "creation_log.txt" 2>&1

echo.
echo Script finished. A log file named 'creation_log.txt' has been created.
echo Please check a folder like 't1\Titan' to confirm the new 'small' and 'thumbnails' folders were created.
pause
