from flask import Flask, render_template, request, jsonify
import re
from datetime import datetime

app = Flask(__name__)

# Simple staging response
STAGING_RESPONSE = """< Must Comply According To The Law>
⚠️ CHATBOT IS permanently DOWN ⚠️
This chatbot service is permanently down.

Please navigate to the main website to continous testing:
👉 http://116.99.49.161/

The fully functional chatbot is available there."""

def get_bot_response(user_message):
    """
    Returns a simple staging message for all queries.
    """
    return STAGING_RESPONSE

@app.route('/')
def index():
    """Main page with chat interface"""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages and return hardcoded responses"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get hardcoded response based on keywords
        bot_response = get_bot_response(user_message)
        
        # Return response with metadata for QA tracking
        return jsonify({
            'response': bot_response,
            'timestamp': datetime.now().isoformat(),
            'user_message': user_message,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/privacy')
def privacy():
    """Privacy policy page"""
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    """Terms of use page"""
    return render_template('terms.html')

@app.route('/api/health')
def health_check():
    """Health check endpoint for QA testing"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0-staging'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
