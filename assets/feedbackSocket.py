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


@socketio.on('my event2', namespace='/chat')
def handle_my_custom_event(json_data):
      print('received my event2: ' + str(json_data))


@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
      print('connected')


@socketio.on('mobile_client_connected', namespace='/chat')
def handle_client_connected_chat(json):
      print("mobile_client_connected, status:" + str(json['connected']))
      return 'noticed'


@socketio.on('web_client_connected', namespace='/chat')
def handle_client_connected_chat(json):
      print("web_client_connected, status:" + str(json['connected']))


@socketio.on('message_sent', namespace='/chat')
def handle_client_send_chat(json_data, methods=['GET', 'POST']):
      print(json_data['message'])
      user_name = json_data['sender']
      message = json_data['message']
      data = {
         'timestamp': str(datetime.now()),
         'sender': user_name,
         'message': message,
      }
      emit('message_broadcast', json.dumps(data), broadcast=True)


if __name__ == '__main__':
      socketio.run(app, debug='true')
