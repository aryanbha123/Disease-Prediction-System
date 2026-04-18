from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
from flask_cors import CORS

GEMINI_API_KEY = "AIzaSyAoGoKYw9Tvtl1yC-g6Q1Me4ZSeSdAQEnM"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

app = Flask(__name__)
CORS(app)

@app.route('/get-res', methods=['POST'])
def predict_disease():
    data = request.json
    disease = data.get('disease', '').strip().lower()

    if not disease or disease == 'undefined':
        return jsonify({
            "response": "Sorry, I didn't quite understand that. Could you be more specific?"
        }), 200

    prompt = f"""
    # A user entered the word: '{disease}'.
    Give a friendly, casual message like:
    "Based on symptoms , you might have a {disease} infection. Don’t worry, just consult a doctor!"
    Only message nothing else and not extacly this message
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text.strip()})
    except Exception as e:
        print(f"Error in Gemini API: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True , port=3000)
