import os

with open("sections.css", "r") as f_in:
    content = f_in.read()
    
with open("style.css", "a") as f_out:
    f_out.write("\n" + content)
    
os.remove("sections.css")
