from flask import Blueprint, request, jsonify
from app.services.llm_services import generate_test_ideas

test_idea_bp = Blueprint('test_idea', __name__)

@test_idea_bp.route('/api/generate-scenarios', methods=['POST'])
def generate_scenarios():
    data = request.json
    url = data.get('url')
    selected_elements = data.get('selectedElements')
    
    test_scenarios = generate_test_ideas(url, selected_elements)
    
    return jsonify({
        "test_scenarios": test_scenarios
    })
