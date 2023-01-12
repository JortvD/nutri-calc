@echo off
set "lc=%1"
echo Changing components to %lc%
cd src\components || exit 1

if not exist "%lc%" (
  echo dir %lc% does not exist in %cd%, exiting
  cd ..\.. || exit 1
  exit 255
)
if exist .\localized (
  rd /s /q .\localized
)
mklink /J localized %lc%

echo Changing libs to %lc%
cd ..\libs || exit 1
if not exist "%lc%" (
  echo dir %lc% does not exist in %cd%, exiting
  cd ..\.. || exit 1
  exit 255
)
if exist .\localized (
  rd /s /q .\localized
)
mklink /J localized %lc%
cd ..\.. || exit 1
echo Done