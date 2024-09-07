from flask import Blueprint, request, jsonify
from app.services.web_agent_service import run_web_agent
import traceback

agent_explorer_bp = Blueprint('agent_explorer', __name__)

@agent_explorer_bp.route('/api/run-web-agent', methods=['POST'])
def run_agent():
    try:
        data = request.json
        objective = data['objective']
        url = data['url']
        
        results = run_web_agent(objective, url)
        return jsonify(results)
    except Exception as e:
        print(f"Error in run_agent: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500