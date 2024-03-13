from flask_cors import CORS
from flask import Flask,render_template,request,jsonify
import pickle
import numpy as np
import pandas 


popularity_df=pickle.load(open('./res/popularity_df.pkl','rb'))
pt = pickle.load(open('./res/pt.pkl','rb'))
books = pickle.load(open('./res/books.pkl','rb'))
scores = pickle.load(open('./res/scores.pkl','rb'))
old_books = pandas.read_pickle('./res/old_books1.pkl')


app = Flask(__name__)
cors = CORS(app,resources={r'/*':{'origin':'*'}})


@app.route('/')
def index_ui():
    return jsonify('welcome'),200

@app.route('/top50_api')
def top50_api():
    data =  [
                           list(popularity_df['Book-Title'].values),
                           list(popularity_df['Book-Author'].values),
                           list(popularity_df['Image-URL-M'].values),
                           list(popularity_df['num_ratings'].values),
                           list(format(i,".2f") for i in popularity_df['avg_rating'].values)
    ]
    res = []
    for i in range(50):
        res.append({'Book-title':str(data[0][i]),
                    'Book-author':str(data[1][i]),
                    'Image-URL-M':str(data[2][i]),
                    'num_ratings':str(data[3][i]),
                    'avg_ratings':str(data[4][i]),
                    })
    return jsonify(res),200

if __name__ == '__main__':
    app.run(debug=True)
