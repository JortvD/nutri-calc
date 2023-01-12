@echo off
set lc=%1
echo moving dist to docs\%lc%
md "docs" 2>nul
move dist "docs\%lc%"
