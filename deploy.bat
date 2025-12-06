@echo off
chcp 65001 >nul
cd /d "%~dp0"
git add .
git commit -m "Upload langquiz project files"
git push -u origin main

