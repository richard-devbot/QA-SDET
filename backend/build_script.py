import os
import requests
import zipfile
import subprocess

def install_dependencies():
    subprocess.check_call(['python', '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call(['python', '-m', 'pip', 'install', 'selenium', 'webdriver_manager'])
    subprocess.check_call(['python', '-m', 'pip', 'install', '-r', 'requirements.txt'])
    subprocess.check_call(['python', '-m', 'pip', 'install', 'requests'])

def setup_chrome():
    # Create directories
    os.makedirs('/tmp/chrome', exist_ok=True)
    os.makedirs('/tmp/chromedriver', exist_ok=True)

    # Download Chrome
    chrome_url = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
    response = requests.get(chrome_url)
    with open('/tmp/chrome.deb', 'wb') as f:
        f.write(response.content)

    # Extract Chrome
    subprocess.check_call(['dpkg', '-x', '/tmp/chrome.deb', '/tmp/chrome'])

    # Download ChromeDriver
    chromedriver_url = 'https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chromedriver-linux64.zip'
    response = requests.get(chromedriver_url)
    with open('/tmp/chromedriver.zip', 'wb') as f:
        f.write(response.content)

    # Extract ChromeDriver
    with zipfile.ZipFile('/tmp/chromedriver.zip', 'r') as zip_ref:
        zip_ref.extractall('/tmp/chromedriver')

    # Set permissions
    os.chmod('/tmp/chromedriver/chromedriver-linux64/chromedriver', 0o755)
    os.chmod('/tmp/chrome/usr/bin/google-chrome', 0o755)

if __name__ == "__main__":
    install_dependencies()
    setup_chrome()