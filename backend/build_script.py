import subprocess
import sys
import os
import zipfile
import shutil

def install_build_dependencies():
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests'])

def main():
    # Install build dependencies first
    install_build_dependencies()
    
    import requests

    def install_project_dependencies():
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'selenium', 'webdriver_manager'])
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])

    def setup_chrome():
        # Create directories
        chrome_dir = '/tmp/chrome'
        chromedriver_dir = '/tmp/chromedriver'
        
        # Clean up existing directories if they exist
        if os.path.exists(chrome_dir):
            shutil.rmtree(chrome_dir)
        if os.path.exists(chromedriver_dir):
            shutil.rmtree(chromedriver_dir)
            
        os.makedirs(chrome_dir, exist_ok=True)
        os.makedirs(chromedriver_dir, exist_ok=True)

        try:
            # Download Chrome
            print("Downloading Chrome...")
            chrome_url = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
            response = requests.get(chrome_url)
            deb_path = os.path.join(chrome_dir, 'chrome.deb')
            with open(deb_path, 'wb') as f:
                f.write(response.content)

            # Extract Chrome
            print("Extracting Chrome...")
            subprocess.check_call(['dpkg', '-x', deb_path, chrome_dir])

            # Verify Chrome binary exists
            chrome_binary = os.path.join(chrome_dir, 'usr/bin/google-chrome-stable')
            if not os.path.exists(chrome_binary):
                print("Looking for Chrome binary in extracted files...")
                # Search for the Chrome binary
                for root, dirs, files in os.walk(chrome_dir):
                    for file in files:
                        if file.startswith('google-chrome'):
                            chrome_binary = os.path.join(root, file)
                            break

            if not os.path.exists(chrome_binary):
                raise Exception("Chrome binary not found after extraction")

            # Download ChromeDriver
            print("Downloading ChromeDriver...")
            chromedriver_url = 'https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chromedriver-linux64.zip'
            response = requests.get(chromedriver_url)
            zip_path = os.path.join(chromedriver_dir, 'chromedriver.zip')
            with open(zip_path, 'wb') as f:
                f.write(response.content)

            # Extract ChromeDriver
            print("Extracting ChromeDriver...")
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(chromedriver_dir)

            # Find ChromeDriver binary
            chromedriver_binary = os.path.join(chromedriver_dir, 'chromedriver-linux64/chromedriver')
            if not os.path.exists(chromedriver_binary):
                raise Exception("ChromeDriver binary not found after extraction")

            # Set permissions
            print("Setting permissions...")
            os.chmod(chromedriver_binary, 0o755)
            os.chmod(chrome_binary, 0o755)

            # Create symlinks
            os.symlink(chrome_binary, '/tmp/chrome/google-chrome')
            os.symlink(chromedriver_binary, '/tmp/chromedriver/chromedriver')

            print("Chrome and ChromeDriver setup completed successfully")
            
        except Exception as e:
            print(f"Error during setup: {str(e)}")
            raise

    # Run the installation process
    print("Starting installation process...")
    install_project_dependencies()
    setup_chrome()
    print("Installation completed successfully")

if __name__ == "__main__":
    main()
