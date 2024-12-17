from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def create_structure(base_path, items):
    for item in items:
        item_path = os.path.join(base_path, item['name'])
        if item.get('type') == 'file':
            with open(item_path, 'w') as f:
                f.write('')  
        else:
            # Create a folder
            os.makedirs(item_path, exist_ok=True)
            if 'child' in item:
                create_structure(item_path, item['child'])

@app.route('/save-folder', methods=['POST'])
def save_folder():
    folder_data = request.get_json()
    save_path = '../Downloads/saved_folder'  
    try:
        
        os.makedirs(save_path, exist_ok=True)

        create_structure(save_path, folder_data)
        return jsonify({"message": "Folder structure saved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
