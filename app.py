from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

API_KEY = '85123e3390aa6d25b85e278dd44857cb'  # Replace this with your actual TMDb API key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/movies')
def movies():
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=en-US&page=1'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/movie/<int:movie_id>')
def movie_details(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}&language=en-US'
    response = requests.get(url)
    movie = response.json()
    return render_template('movie_details.html', movie=movie)

if __name__ == '__main__':
    app.run(debug=True)
