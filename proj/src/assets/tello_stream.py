from flask import Flask, jsonify, request

app = Flask(__name__)

from djitellopy import Tello
import cv2
import time

tello = Tello()
tello.connect()
tello.streamon()

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
    cv2.imwrite("tello_photo2023.png", frame_read.frame)
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



