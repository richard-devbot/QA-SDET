from flask import Blueprint, request, jsonify
from app.services.code_generator import main
import traceback

automation_code_generator_bp = Blueprint('automation_code_generator', __name__)

@automation_code_generator_bp.route('/api/generate-code', methods=['POST'])
def generate_automation_code():
    try:
        data = request.json
        url = data['url']
        feature_content = data['featureContent']
        language = data['language']
        
        code = main(url, feature_content, language)
        return jsonify({"code": code})
    except Exception as e:
        print(f"Error in generate_automation_code: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500