from flask import Flask, render_template, request, jsonify, url_for
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Initialize DB
def init_db():
    if not os.path.exists('lastink.db'):
        with sqlite3.connect('lastink.db') as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS subscribers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL UNIQUE,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')

init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    try:
        with sqlite3.connect('lastink.db') as conn:
            conn.execute('INSERT INTO subscribers (email) VALUES (?)', (email,))
        return jsonify({'message': 'Subscribed successfully!'}), 200
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already subscribed'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
