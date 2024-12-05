from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.services.llm_services import generate_test_ideas, generate_manual_test_cases

test_idea_bp = Blueprint('test_idea', __name__)

@test_idea_bp.route('/api/generate-scenarios', methods=['POST'])
@cross_origin()
def generate_scenarios():
    try:
        data = request.json
        url = data.get('url')
        selected_elements = data.get('selectedElements')
        mode = data.get('mode', 'auto')
        
        if not url:
            return jsonify({"error": "URL is required"}), 400
            
        if not selected_elements:
            return jsonify({"error": "Selected elements are required"}), 400
        
        if mode == 'auto':
            test_scenarios = generate_test_ideas(url, selected_elements)
            return jsonify({"test_scenarios": test_scenarios})
        else:  # manual mode
            manual_test_cases = generate_manual_test_cases(f"URL: {url}\nSelected Elements: {selected_elements}")
            return jsonify({"manual_test_cases": manual_test_cases})
            
    except Exception as e:
        print(f"Error in generate_scenarios: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500
