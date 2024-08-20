@echo off
echo In this file that appears in this window, the number is the number that has changed
echo If there is a problem with this code, please write your feedback at "https://github.com/LunaFlies/Codes_of_henry/issues"

:: 파일 위치 입력 받기
:ASK_FILE
set /p userChoiceFile=Which file will you change? (File Location):
if not exist "%userChoiceFile%" (
    echo [Error] The specified file does not exist. Please enter a valid file path.
    goto ASK_FILE
)

:: 딜레이 입력 받기 (밀리초 단위)
:ASK_DELAY
set /p userChoiceDelay=Change Delay (in milliseconds):
:: 숫자가 아닌 입력을 처리
for /f "delims=0123456789" %%a in ("%userChoiceDelay%") do (
    echo [Error] Invalid delay value. Please enter a numeric value.
    goto ASK_DELAY
)
:: 밀리초를 초로 변환 (소수점 올림 처리)
set /a DelaySeconds=userChoiceDelay / 1000
set /a DelayRemainder=userChoiceDelay %% 1000
if %DelayRemainder% gtr 0 (
    set /a DelaySeconds+=1
)

:: 반복 여부 묻기
:REPEAT_ASK
set /p userChoiceRepeat=Should I repeat it? (y/n):
if /i "%userChoiceRepeat%"=="y" (
    goto REPEAT
) else if /i "%userChoiceRepeat%"=="n" (
    echo Exit
    exit /b
) else (
    echo [Error] Invalid input. Please enter 'y' or 'n'.
    goto REPEAT_ASK
)
:REPEAT
:: 파일 업데이트 및 딜레이 처리
:REPEATCODE
set /a randomNumber=%random%
echo %randomNumber% > "%userChoiceFile%"
echo %randomNumber%
timeout /t %DelaySeconds% /nobreak > nul
goto REPEATCODE