# import os
# import requests
# import zipfile
# import shutil

# def setup_chrome():
#     chrome_dir = '/tmp/chrome'
#     chromedriver_dir = '/tmp/chromedriver'
    
#     # Clean up existing directories
#     for dir_path in [chrome_dir, chromedriver_dir]:
#         if os.path.exists(dir_path):
#             shutil.rmtree(dir_path)
#         os.makedirs(dir_path, exist_ok=True)

#     try:
#         # Download Chrome
#         chrome_url = "https://storage.googleapis.com/chrome-for-testing-public/120.0.6099.109/linux64/chrome-linux64.zip"
#         response = requests.get(chrome_url)
#         chrome_zip = os.path.join(chrome_dir, 'chrome.zip')
#         with open(chrome_zip, 'wb') as f:
#             f.write(response.content)

#         # Extract Chrome
#         with zipfile.ZipFile(chrome_zip, 'r') as zip_ref:
#             zip_ref.extractall(chrome_dir)

#         # Download ChromeDriver
#         chromedriver_url = 'https://storage.googleapis.com/chrome-for-testing-public/120.0.6099.109/linux64/chromedriver-linux64.zip'
#         response = requests.get(chromedriver_url)
#         chromedriver_zip = os.path.join(chromedriver_dir, 'chromedriver.zip')
#         with open(chromedriver_zip, 'wb') as f:
#             f.write(response.content)

#         # Extract ChromeDriver
#         with zipfile.ZipFile(chromedriver_zip, 'r') as zip_ref:
#             zip_ref.extractall(chromedriver_dir)

#         # Set permissions
#         chrome_binary = os.path.join(chrome_dir, 'chrome-linux64', 'chrome')
#         chromedriver_binary = os.path.join(chromedriver_dir, 'chromedriver-linux64', 'chromedriver')
        
#         os.chmod(chrome_binary, 0o755)
#         os.chmod(chromedriver_binary, 0o755)

#         # Clean up
#         os.remove(chrome_zip)
#         os.remove(chromedriver_zip)

#         return chrome_binary, chromedriver_binary

#     except Exception as e:
#         print(f"Error setting up Chrome: {str(e)}")
#         raise
