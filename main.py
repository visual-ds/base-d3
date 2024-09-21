from flask import Flask, render_template,json,request, jsonify

import random

app = Flask(__name__)

# Send data upon request
@app.route('/change', methods=["POST"])
def change():
	# Generate a random number of points between 15 and 20
	num_points = random.randint(15, 20)

	# Generate 20 random 2D points
	points = [{'x':random.uniform(0, 10), 'y':random.uniform(0, 10)} for i in range(num_points)]

	return points

@app.route('/', methods=["GET"])
def main():
	# Generate a random number of points between 15 and 20
	num_points = random.randint(15, 20)

	# Generate 20 random 2D points
	points = [{'x':random.uniform(0, 10), 'y':random.uniform(0, 10)} for i in range(num_points)]

	# Render html file in "templates" folder, optionally send data as additional parameters
	return render_template('index.html', points=points)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
