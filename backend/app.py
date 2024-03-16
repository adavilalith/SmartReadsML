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

@app.route('/reccomendations_api',methods=['post'])
def reccomendations_api():
    book_name=request.json['name']
    if len(np.where(pt.index==book_name)[0])==0:
        return jsonify({'status':0,'books':[]}),200
    
    idx = np.where(pt.index==book_name)[0][0]
    items = sorted(list(enumerate(scores[idx])),key = lambda x:x[1],reverse=True)[1:9]
    data=[]
    
    for i in items:            
        item=[]
        temp = books[books['Book-Title']==pt.index[i[0]]]
        item.extend(list(temp.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp.drop_duplicates('Book-Title')['Book-Author'].values))       
        item.extend(list(temp.drop_duplicates('Book-Title')['Image-URL-M'].values))
        data.append(item)
    res = []
    # return jsonify(data),200
    for i in data:
        res.append({'Book-title':i[0],
                    'Book-author':i[1],
                    'Image-URL-M':i[2],
                    })
    return jsonify({'status':1,'books':res}),200

@app.route('/book_names')
def book_names_api():
    return jsonify({'BookNames': list(pt.index)}),200

if __name__ == '__main__':
    app.run(debug=True)
