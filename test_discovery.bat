@echo on
(
    echo.
    echo --- File Discovery Test ---
    echo.
    echo Current directory: %cd%
    echo.

    echo --- Testing t1 ---
    for /r "t1" %%F in (*.jpg, *.JPG) do (
        echo Found in t1: %%F
    )
    echo.

    echo --- Testing t2 ---
    for /r "t2" %%F in (*.jpg, *.JPG) do (
        echo Found in t2: %%F
    )
    echo.

    echo --- Testing t3 ---
    for /r "t3" %%F in (*.jpg, *.JPG) do (
        echo Found in t3: %%F
    )
    echo.

    echo --- Test Complete ---
    echo.

) > "discovery_log.txt" 2>&1

echo.
echo Discovery test finished. Please show me the contents of 'discovery_log.txt'.
pause
