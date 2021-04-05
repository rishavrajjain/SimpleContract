from flask import Flask,request,jsonify
from flask_cors import CORS
import re

from gensim.summarization.summarizer import summarize

app=Flask(__name__)
CORS(app)


@app.route('/',methods=['GET'])
def home():
    return 'Simple Contract Summarizer'

def f(seq): # Order preserving unique sentences - sometimes duplicate sentences appear in summaries
    seen = set()
    return [x for x in seq if x not in seen and not seen.add(x)]

@app.route('/summarize',methods=['POST'])
def summarizeData():
    data=request.get_json()
    test_summary = summarize(data['text'], ratio=0.5)
    return test_summary





if __name__=="__main__":
    app.run()