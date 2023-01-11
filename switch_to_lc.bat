@echo off
set "lc=%1"
echo Changing components to %lc%
cd src\components || exit 1

if not exist "%lc%" (
  echo dir %lc% does not exist in %cd%, exiting
  exit 255
)
del localized 2>nul
mklink /J localized %lc%

echo Changing libs to %lc%
cd ..\libs || exit 2
if not exist "%lc%" (
  echo dir %lc% does not exist in %cd%, exiting
  exit 255
)
del localized 2>nul
mklink /J localized %lc%
echo Done