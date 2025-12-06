import subprocess
import os
import sys

os.chdir(r"c:\Users\ridad\Pulpit\langquiz")

try:
    print("Adding files...")
    subprocess.run(["git", "add", "."], check=True)
    
    print("Committing...")
    subprocess.run(["git", "commit", "-m", "Upload langquiz project files"], check=True)
    
    print("Pushing to GitHub...")
    subprocess.run(["git", "push", "-u", "origin", "main"], check=True)
    
    print("Success! Files uploaded to GitHub.")
except subprocess.CalledProcessError as e:
    print(f"Error: {e}")
    sys.exit(1)

