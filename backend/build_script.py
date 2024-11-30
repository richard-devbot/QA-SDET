import subprocess
import sys
import os
import zipfile
import shutil
import tarfile

def install_build_dependencies():
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests'])

def main():
    install_build_dependencies()
    import requests

    def install_project_dependencies():
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'selenium', 'webdriver_manager'])
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])

    def setup_chrome():
        print("Starting Chrome setup...")
        chrome_dir = '/tmp/chrome'
        chromedriver_dir = '/tmp/chromedriver'
        
        # Clean up existing directories
        for dir_path in [chrome_dir, chromedriver_dir]:
            if os.path.exists(dir_path):
                shutil.rmtree(dir_path)
            os.makedirs(dir_path, exist_ok=True)

        try:
            # Download Chrome directly from Chrome for Testing
            print("Downloading Chrome...")
            chrome_url = "https://storage.googleapis.com/chrome-for-testing-public/120.0.6099.109/linux64/chrome-linux64.zip"
            response = requests.get(chrome_url)
            chrome_zip = os.path.join(chrome_dir, 'chrome.zip')
            with open(chrome_zip, 'wb') as f:
                f.write(response.content)

            # Extract Chrome
            print("Extracting Chrome...")
            with zipfile.ZipFile(chrome_zip, 'r') as zip_ref:
                zip_ref.extractall(chrome_dir)

            # Download ChromeDriver
            print("Downloading ChromeDriver...")
            chromedriver_url = 'https://storage.googleapis.com/chrome-for-testing-public/120.0.6099.109/linux64/chromedriver-linux64.zip'
            response = requests.get(chromedriver_url)
            chromedriver_zip = os.path.join(chromedriver_dir, 'chromedriver.zip')
            with open(chromedriver_zip, 'wb') as f:
                f.write(response.content)

            # Extract ChromeDriver
            print("Extracting ChromeDriver...")
            with zipfile.ZipFile(chromedriver_zip, 'r') as zip_ref:
                zip_ref.extractall(chromedriver_dir)

            # Set up Chrome binary path
            chrome_binary = os.path.join(chrome_dir, 'chrome-linux64', 'chrome')
            chromedriver_binary = os.path.join(chromedriver_dir, 'chromedriver-linux64', 'chromedriver')

            # Verify binaries exist
            if not os.path.exists(chrome_binary):
                raise Exception(f"Chrome binary not found at {chrome_binary}")
            if not os.path.exists(chromedriver_binary):
                raise Exception(f"ChromeDriver binary not found at {chromedriver_binary}")

            # Set permissions
            print("Setting permissions...")
            os.chmod(chrome_binary, 0o755)
            os.chmod(chromedriver_binary, 0o755)

            # Create symlinks
            chrome_link = os.path.join(chrome_dir, 'google-chrome')
            chromedriver_link = os.path.join(chromedriver_dir, 'chromedriver')
            
            if os.path.exists(chrome_link):
                os.remove(chrome_link)
            if os.path.exists(chromedriver_link):
                os.remove(chromedriver_link)
                
            os.symlink(chrome_binary, chrome_link)
            os.symlink(chromedriver_binary, chromedriver_link)

            # Clean up zip files
            os.remove(chrome_zip)
            os.remove(chromedriver_zip)

            print("Chrome and ChromeDriver setup completed successfully")
            print(f"Chrome binary location: {chrome_binary}")
            print(f"ChromeDriver binary location: {chromedriver_binary}")
            
        except Exception as e:
            print(f"Error during setup: {str(e)}")
            raise

    print("Starting installation process...")
    install_project_dependencies()
    setup_chrome()
    print("Installation completed successfully")

if __name__ == "__main__":
    main()
