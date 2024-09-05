from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime
import json

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)


@app.route('/chat')
def sessions():
   return render_template('index.html')

@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
   print('connected')
   emit('web_client_connected', {'connected': True})


@socketio.on('mobile_client_connected', namespace='/chat')
def handle_client_connected_chat(json):
   print("mobile_client_connected, status:" + str(json['connected']))
   return 'noticed'


@socketio.on('web_client_connected', namespace='/chat')
def handle_client_connected_chat(json):
   print("web_client_connected, status:" + str(json['connected']))


@socketio.on('message_sent', namespace='/chat')
def handle_client_send_chat(json_data, methods=['GET', 'POST']):
   print('Message received: ' + str(json_data))
   user_name = json_data['sender']
   message = json_data['message']
   data = {
      'timestamp': str(datetime.now()),
      'sender': user_name,
      'message': message,
   }
   emit('message_broadcast', json.dumps(data), broadcast=True)

@socketio.on('feedback_sent', namespace='/chat')
def handle_feedback_sent(json_data, methods=['GET', 'POST']):
    print('Feedback received: ' + str(json_data))
    user_name = json_data['sender']
    feedback_message = json_data['message']
    data = {
        'timestamp': str(datetime.now()),
        'sender': user_name,
        'message': feedback_message,
    }
    emit('feedback_broadcast', json.dumps(data), broadcast=True)

if __name__ == '__main__':
   socketio.run(app, port=5001, debug=True)
