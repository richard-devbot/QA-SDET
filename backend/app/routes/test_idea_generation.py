from flask import Blueprint, request, jsonify
from app.services.llm_services import generate_test_ideas
from app.services.browser_automation import setup_interactive_browser, get_selected_elements, capture_screenshot, close_browser
import base64

test_idea_bp = Blueprint('test_idea', __name__)

@test_idea_bp.route('/api/start-browser', methods=['POST'])
def start_browser():
    url = request.json['url']
    setup_interactive_browser(url)
    return jsonify({"message": "Browser started successfully"})

@test_idea_bp.route('/api/get-selected-elements', methods=['GET'])
def get_elements():
    elements = get_selected_elements()
    return jsonify({"elements": elements})

@test_idea_bp.route('/api/generate-scenarios', methods=['POST'])
def generate_scenarios():
    data = request.json
    url = data.get('url')
    
    selected_elements = get_selected_elements()
    if selected_elements is not None:
        try:
            screenshot = capture_screenshot()
            screenshot_base64 = base64.b64encode(screenshot).decode('utf-8') if screenshot else None
        except Exception as e:
            return jsonify({"error": "Unable to capture screenshot. Browser may have been closed."}), 400

        test_scenarios = generate_test_ideas(url, selected_elements, screenshot_base64)
        
        # Close the browser after generating scenarios
        close_browser()
        
        return jsonify({
            "test_scenarios": test_scenarios,
            "screenshot": screenshot_base64,
            "selected_elements": selected_elements
        })
    else:
        return jsonify({"error": "Unable to retrieve selected elements. Please restart the element selection process."}), 400