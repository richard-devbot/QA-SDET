import os
import base64
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from app.services.code_generator import main
import traceback
import threading
import time

automation_code_generator_bp = Blueprint('automation_code_generator', __name__)

chrome_driver = None
screenshot_path = '/app/screenshots/automation_latest.png'  # Separate path for automation_code_generator
screenshot_thread = None

def setup_interactive_browser(url=None):
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-software-rasterizer")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-dev-tools")
    chrome_options.add_argument("--no-zygote")
    chrome_options.add_argument("--single-process")
    chrome_options.add_argument("--remote-debugging-port=9222")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    
    # Point to the Chrome binary in our Docker container
    chrome_options.binary_location = "/opt/chrome/chrome-linux64/chrome"
    
    # Set up ChromeDriver service with increased timeout
    service = Service(
        executable_path="/opt/chromedriver/chromedriver-linux64/chromedriver"
    )
    
    try:
        print("Starting Chrome browser for automation_code_generator...")
        driver = webdriver.Chrome(
            service=service,
            options=chrome_options
        )
        print("Chrome browser started successfully")
        if url:
            driver.get(url)
        return driver
    except Exception as e:
        print(f"Chrome driver error: {str(e)}")
        raise Exception(f"Failed to start Chrome: {str(e)}")

def capture_screenshot():
    global chrome_driver, screenshot_path
    try:
        if chrome_driver:
            # Ensure directory exists
            os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
            
            # Add a small delay to ensure the page is loaded
            time.sleep(0.5)
            
            # Capture screenshot
            chrome_driver.save_screenshot(screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")
            
            # Verify file exists and has size
            if os.path.exists(screenshot_path):
                size = os.path.getsize(screenshot_path)
                print(f"Screenshot size: {size} bytes")
                if size == 0:
                    print("Warning: Screenshot file is empty!")
            else:
                print("Error: Screenshot file not created!")
    except Exception as e:
        print(f"Screenshot error: {str(e)}")
        print(traceback.format_exc())

def periodic_screenshot_capture():
    thread = threading.current_thread()
    while getattr(thread, "do_run", True):
        capture_screenshot()
        time.sleep(1)

@automation_code_generator_bp.route('/api/start-browser', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True, methods=['POST', 'OPTIONS'], 
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'])
def start_browser():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        global chrome_driver, screenshot_thread
        
        # Get URL from request
        data = request.get_json()
        url = data.get('url')
        
        if not url:
            return jsonify({"error": "URL is required"}), 400
            
        # Ensure URL has protocol
        if not url.startswith('http://') and not url.startswith('https://'):
            url = f"https://{url}"
        
        print(f"Starting browser with URL: {url}")
        
        # Stop existing browser if any
        if chrome_driver:
            chrome_driver.quit()
            chrome_driver = None
        
        # Stop existing screenshot thread if any
        if screenshot_thread and screenshot_thread.is_alive():
            screenshot_thread.do_run = False
            screenshot_thread.join()
        
        # Start new browser with URL
        chrome_driver = setup_interactive_browser(url)
        
        if not chrome_driver:
            return jsonify({"error": "Failed to start browser"}), 500
            
        # Verify navigation
        try:
            current_url = chrome_driver.current_url
            print(f"Browser navigated to: {current_url}")
        except Exception as e:
            print(f"Error verifying navigation: {str(e)}")
            return jsonify({"error": f"Failed to navigate to {url}: {str(e)}"}), 500
        
        # Start a thread to capture screenshots periodically
        screenshot_thread = threading.Thread(target=periodic_screenshot_capture)
        screenshot_thread.start()
        
        return jsonify({"message": "Browser started successfully", "url": current_url})
    except Exception as e:
        print(f"Error starting browser: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@automation_code_generator_bp.route('/api/generate-code', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True, methods=['POST', 'OPTIONS'],
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'])
def generate_automation_code():
    if request.method == 'OPTIONS':
        return '', 200
    global chrome_driver
    try:
        data = request.json
        url = data['url']
        feature_content = data['featureContent']
        language = data['language']
        
        if not chrome_driver:
            print("Browser not started, initializing new browser session...")
            chrome_driver = setup_interactive_browser(url)
        else:
            try:
                # Check if browser is still responsive
                chrome_driver.current_url
                chrome_driver.get(url)
            except Exception as e:
                print(f"Browser session expired, starting new session: {str(e)}")
                chrome_driver = setup_interactive_browser(url)
        
        code = main(url, feature_content, language, chrome_driver)
        return jsonify({"code": code})
    except Exception as e:
        print(f"Error in generate_automation_code: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@automation_code_generator_bp.route('/api/get-screenshot', methods=['GET', 'OPTIONS'])
@cross_origin(supports_credentials=True, methods=['GET', 'OPTIONS'],
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'])
def get_screenshot():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        if os.path.exists(screenshot_path):
            with open(screenshot_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode()
            return jsonify({
                "screenshot": encoded_string,
                "timestamp": os.path.getmtime(screenshot_path)
            })
        else:
            return jsonify({
                "error": "Screenshot not available",
                "path": screenshot_path,
                "exists": False
            }), 404
    except Exception as e:
        return jsonify({
            "error": str(e),
            "path": screenshot_path,
            "trace": traceback.format_exc()
        }), 500

@automation_code_generator_bp.route('/api/stop-browser', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True, methods=['POST', 'OPTIONS'],
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'])
def stop_browser():
    if request.method == 'OPTIONS':
        return '', 200
    global chrome_driver, screenshot_thread
    try:
        if screenshot_thread:
            screenshot_thread.do_run = False
            screenshot_thread.join()
            screenshot_thread = None
        
        if chrome_driver:
            chrome_driver.quit()
            chrome_driver = None
        
        if os.path.exists(screenshot_path):
            os.remove(screenshot_path)
        
        return jsonify({"message": "Browser stopped successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
