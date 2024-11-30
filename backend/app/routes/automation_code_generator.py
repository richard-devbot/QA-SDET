import os
import base64
from flask import Blueprint, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from app.services.code_generator import main
import traceback
import threading
import time

automation_code_generator_bp = Blueprint('automation_code_generator', __name__)

chrome_driver = None
screenshot_path = 'screenshots/latest.png'
screenshot_thread = None

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
from chrome_setup import setup_chrome

def setup_interactive_browser(url):
    try:
        chrome_binary, chromedriver_path = setup_chrome()
    except Exception as e:
        raise Exception(f"Failed to set up Chrome: {str(e)}")

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # Memory optimization
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-plugins-discovery")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--memory-pressure-off")
    chrome_options.add_argument("--single-process")
    chrome_options.add_argument("--disable-renderer-backgrounding")
    chrome_options.add_argument("--disable-background-networking")
    
    # Handle lazy loading
    chrome_options.add_argument("--blink-settings=imagesEnabled=true")
    chrome_options.add_argument("--disable-features=LazyImageLoading,LazyFrameLoading")
    
    chrome_options.binary_location = chrome_binary

    try:
        service = Service(executable_path=chromedriver_path)
        driver = webdriver.Chrome(
            service=service,
            options=chrome_options
        )
        
        # Set page load strategy
        driver.set_page_load_timeout(30)
        driver.implicitly_wait(10)
        
        # Set window size
        driver.set_window_size(1920, 1080)
        
        # Navigate to URL
        driver.get(url)
        
        # Wait for page to load completely
        driver.execute_script("return document.readyState") == "complete"
        
        return driver
    except Exception as e:
        if 'driver' in locals():
            driver.quit()
        raise Exception(f"Failed to start Chrome: {str(e)}")
    
def capture_screenshot():
    global chrome_driver, screenshot_path
    if chrome_driver:
        chrome_driver.save_screenshot(screenshot_path)

@automation_code_generator_bp.route('/api/start-browser', methods=['POST'])
def start_browser():
    try:
        global chrome_driver, screenshot_thread
        chrome_driver = setup_chrome_driver()
        
        # Start a thread to capture screenshots periodically
        screenshot_thread = threading.Thread(target=periodic_screenshot_capture)
        screenshot_thread.start()
        
        return jsonify({"message": "Browser started successfully"})
    except Exception as e:
        print(f"Error starting browser: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@automation_code_generator_bp.route('/api/generate-code', methods=['POST'])
def generate_automation_code():
    global chrome_driver
    try:
        data = request.json
        url = data['url']
        feature_content = data['featureContent']
        language = data['language']
        
        if not chrome_driver:
            chrome_driver = setup_chrome_driver()
        
        code = main(url, feature_content, language, chrome_driver)
        
        return jsonify({"code": code})
    except Exception as e:
        print(f"Error in generate_automation_code: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

def periodic_screenshot_capture():
    thread = threading.current_thread()
    while getattr(thread, "do_run", True):
        capture_screenshot()
        time.sleep(1)  # Capture a screenshot every second

@automation_code_generator_bp.route('/api/get-screenshot', methods=['GET'])
def get_screenshot():
    if os.path.exists(screenshot_path):
        with open(screenshot_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode()
        return jsonify({"screenshot": encoded_string})
    else:
        return jsonify({"error": "Screenshot not available"}), 404

@automation_code_generator_bp.route('/api/stop-browser', methods=['POST'])
def stop_browser():
    global chrome_driver, screenshot_thread
    if screenshot_thread:
        screenshot_thread.do_run = False
        screenshot_thread.join()
    if chrome_driver:
        chrome_driver.quit()
        chrome_driver = None
    if os.path.exists(screenshot_path):
        os.remove(screenshot_path)
    return jsonify({"message": "Browser stopped successfully"})
