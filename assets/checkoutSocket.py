from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect', namespace='/checkout')
def handle_connect_checkout():
    print('Connected to /checkout')

@socketio.on('client_connected', namespace='/checkout')
def handle_client_connected_checkout(json):
    print('Connection Status: {}'.format(json['connected']))

@socketio.on('client_send_cart', namespace='/checkout')
def handle_client_send_cart(json):
    cart_items = json['cartItems']
    
    # Calculate the total
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    
    # Emit result to client
    emit_result_checkout(total)

def emit_result_checkout(total):   
    emit('server_send', json.dumps({
        'total': total,
    }), namespace='/checkout')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
