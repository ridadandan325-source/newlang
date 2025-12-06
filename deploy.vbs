Set objShell = CreateObject("WScript.Shell")
objShell.CurrentDirectory = "c:\Users\ridad\Pulpit\langquiz"
objShell.Run "git add .", 0, True
objShell.Run "git commit -m ""Upload langquiz project files""", 0, True
objShell.Run "git push -u origin main", 0, True

