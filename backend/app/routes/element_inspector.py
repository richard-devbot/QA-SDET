from flask import Blueprint, request, jsonify
from app.services.browser_automation import identify_elements_and_generate_csv
import traceback

element_inspector_bp = Blueprint('element_inspector', __name__)

@element_inspector_bp.route('/api/identify-elements', methods=['POST', 'OPTIONS'])
def identify_elements():
    if request.method == 'OPTIONS':
        # Handling OPTIONS request for CORS
        return '', 204
    
    try:
        data = request.json
        url = data['url']
        output_file = data['outputFileName']
        
        csv_content = identify_elements_and_generate_csv(url, output_file)
        return jsonify({"csvContent": csv_content})
    except Exception as e:
        print(f"Error in identify_elements: {str(e)}")
        print(traceback.format_exc())  # This will print the full traceback
        return jsonify({"error": str(e)}), 500