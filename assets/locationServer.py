from flask import Flask, request, jsonify

app = Flask(__name__)

# assume branches data from server
branches = [
    {
        "branchID": 1,
        "name": "Lumiere Downtown",
        "address": "123 Main Street, Downtown City",
        "image": "https://retaildesignblog.net/wp-content/uploads/2020/04/Coffee_01-780x524.jpg",
        "phone": "+6012-3456789",
        "hours": {
            "monday": "8:00 AM - 8:00 PM",
            "tuesday": "8:00 AM - 8:00 PM",
            "wednesday": "8:00 AM - 8:00 PM",
            "thursday": "8:00 AM - 8:00 PM",
            "friday": "8:00 AM - 9:00 PM",
            "saturday": "9:00 AM - 9:00 PM",
            "sunday": "9:00 AM - 7:00 PM"
        },
        "services": ["dine-in", "takeout", "delivery"],
        "coordinates": {
            "latitude": 40.712776,
            "longitude": -74.005974
        }
    },
    {
        "branchID": 2,
        "name": "Lumiere Uptown",
        "address": "456 Elm Street, Uptown City",
        "image": "https://retaildesignblog.net/wp-content/uploads/2020/04/Coffee_01-780x524.jpg",
        "phone": "-6019-8765432",
        "hours": {
            "monday": "7:00 AM - 8:00 PM",
            "tuesday": "7:00 AM - 8:00 PM",
            "wednesday": "7:00 AM - 8:00 PM",
            "thursday": "7:00 AM - 8:00 PM",
            "friday": "7:00 AM - 9:00 PM",
            "saturday": "8:00 AM - 9:00 PM",
            "sunday": "8:00 AM - 7:00 PM"
        },
        "services": ["dine-in", "takeout"],
        "coordinates": {
            "latitude": 40.783060,
            "longitude": -73.971249
        }
    }
]

# Route to handle GET requests to '/api/data'
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"branches": branches})

# Route to handle POST requests to '/api/data'
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON'}), 400
    return jsonify({'message': 'Data received successfully', 'received_data': data})

if __name__ == '__main__':
    # Run the server on localhost:5003
    app.run(debug=True, host='0.0.0.0', port=5003)