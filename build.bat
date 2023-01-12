@echo off
set "lc=%1"
if exist .\docs\%lc% (
	rd /s /q .\docs\%lc%
)
call ".\switch_to_lc.bat" %lc%
call npx vue-cli-service build --mode %lc%
call ".\build_for_lc.bat" %lc%