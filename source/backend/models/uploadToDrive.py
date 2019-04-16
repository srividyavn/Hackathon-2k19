from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os

g_login = GoogleAuth()
g_login.LocalWebserverAuth()
drive = GoogleDrive(g_login)

file_drive = drive.CreateFile({'title':os.path.basename(file.name) })  
file_drive.SetContentString(file.read()) 
file1_drive.Upload()
