from threading import Thread
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
    cv2.imwrite("tello_photo2023.png", frame_read.frame)
    return jsonify({'status': 'success', 'filename': filename})

@app.route('/right')
def right():
    tello.send_rc_control(50, 0, 0, 0)
    return 'right'

@app.route('/left')
def left():
    tello.send_rc_control(-50, 0, 0, 0)
    return 'left'

@app.route('/forward')
def forward():
    tello.send_rc_control(0, 50, 0, 0)
    return 'forward'

@app.route('/backward')
def backward():
    tello.send_rc_control(0, -50, 0, 0)
    return 'backward'

@app.route('/clockwise')
def clockwise():
    tello.send_rc_control(0, 0, 0, 50)
    return 'clockwise'

@app.route('/up')
def up():
    tello.send_rc_control(0, 0, 50, 0)
    return 'up'

@app.route('/down')
def down():
    tello.send_rc_control(0, 0, -50, 0)
    return 'down'

@app.route('/stop')
def stop():
    tello.send_rc_control(0, 0, 0, 0)
    return 'stop'


# Run the Flask app
if __name__ == '__main__':
    app.run()



