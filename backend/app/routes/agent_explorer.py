from flask import Blueprint, request, jsonify
from app.services.web_agent_service import setup_interactive_browser, run_web_agent, capture_screenshot
import traceback
import threading
import time
import os
import base64

agent_explorer_bp = Blueprint('agent_explorer', __name__)

chrome_driver = None
screenshot_path = 'screenshots/agent_explorer_latest.png'  # Unique path for Agent Explorer
screenshot_thread = None

def periodic_screenshot_capture():
    global chrome_driver, screenshot_path
    while getattr(threading.current_thread(), "do_run", True):
        if chrome_driver:
            chrome_driver.save_screenshot(screenshot_path)
        time.sleep(1)

@agent_explorer_bp.route('/api/agent-explorer/start-browser', methods=['POST'])
def start_browser():
    global chrome_driver, screenshot_thread
    try:
        data = request.json
        url = data['url']
        chrome_driver = setup_interactive_browser(url)
        
        screenshot_thread = threading.Thread(target=periodic_screenshot_capture)
        screenshot_thread.start()
        
        return jsonify({"message": "Browser started successfully"})
    except Exception as e:
        print(f"Error starting browser: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@agent_explorer_bp.route('/api/agent-explorer/run-web-agent', methods=['POST'])
def run_agent():
    global chrome_driver
    try:
        data = request.json
        objective = data['objective']
        
        if not chrome_driver:
            return jsonify({"error": "Browser not started. Please start the browser first."}), 400
        
        results = run_web_agent(objective, chrome_driver)
        return jsonify(results)
    except Exception as e:
        print(f"Error in run_agent: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

@agent_explorer_bp.route('/api/agent-explorer/get-screenshot', methods=['GET'])
def get_screenshot():
    if os.path.exists(screenshot_path):
        with open(screenshot_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode()
        return jsonify({"screenshot": encoded_string})
    else:
        return jsonify({"error": "Screenshot not available"}), 404

@agent_explorer_bp.route('/api/agent-explorer/stop-browser', methods=['POST'])
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
