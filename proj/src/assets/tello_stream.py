from flask import Flask, jsonify, request

app = Flask(__name__)

from djitellopy import Tello
import cv2
import time

timestamp = time.strftime("%Y%m%d-%H%M%S")
filename = "tello_" + timestamp + ".jpg"

tello = Tello()
tello_connected = False
tello.connect()
tello.streamon()

def connect():
    global tello_connected
    try:
        tello_connected = True
        return jsonify({'status': 'success'})
    except:
        return jsonify({'status': 'error', 'message': 'Failed to connect to Tello drone'})
    
@app.route('/takeoff', methods=['GET'])
def takeoff():
    tello.takeoff()
    time.sleep(1)
    return jsonify({'status': 'success'})

@app.route('/land', methods=['GET'])
def land():
    tello.land()
    return jsonify({'status': 'success'})

@app.route('/photo', methods=['GET'])
def photo():
    frame_read = tello.get_frame_read()
    cv2.imwrite(filename, frame_read.frame)
    return jsonify({'status': 'success'})

@app.route('/rotate', methods=['POST'])
def rotate():
    data = request.get_json()
    distance = data['rotate']
    tello.rotate_clockwise(distance)
    return jsonify({'status': 'success'})

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    direction = data['direction']
    distance = data['distance']
    if direction == 'forward':
        tello.move_forward(distance)
    elif direction == 'backward':
        tello.move_back(distance)
    elif direction == 'left':
        tello.move_left(distance)
    elif direction == 'right':
        tello.move_right(distance)
    elif direction == 'up':
        tello.move_up(distance)
    elif direction == 'down':
        tello.move_down(distance)
    return jsonify({'status': 'success'})

# Run the Flask app
if __name__ == '__main__':
    app.run()



