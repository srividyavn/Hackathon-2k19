########### Python 2.7 #############
import httplib2, urllib, base64
import json
import re

import tensorflow as tf
import tensorflow_hub as hub
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import re

from flask import Flask, request
app = Flask(__name__)

module_url = "https://tfhub.dev/google/universal-sentence-encoder/2" #@param ["https://tfhub.dev/google/universal-sentence-encoder/2", "https://tfhub.dev/google/universal-sentence-encoder-large/3"]

word_pattern = re.compile('^[A-Z ]+$')
amount_pattern = re.compile('^[0-9]+\.[0-9]+$')

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'd3808bcca1604a07b5b42a51a28fa9ff',
}

params = urllib.parse.urlencode({
    # Request parameters
    'language': 'unk',
    'detectOrientation': 'true',
})

body = {
    'url': 'https://ufleague.com/wp-content/uploads/2018/11/walmart-receipt-template-need-walmart-receipt-template-luxury-nike-receipt-template-receipt-walmart-receipt-template-1.jpg'
}

# Import the Universal Sentence Encoder's TF Hub module
embed = hub.Module(module_url)

def getWords():
    dict = {'words':[], 'values':[]}
    
    conn = httplib.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
    conn.request("POST", "/vision/v2.0/ocr?%s" % params, str(body), headers)
    response = conn.getresponse()
    data = response.read()
    data_dict = json.loads(data)
    regions = data_dict['regions']
    for i in range(0, len(regions)):
        lines = regions[i]['lines']
        for i in range(0, len(lines)):
            words = lines[i]['words']
            word = ''
            for i in range(0, len(words)):
                text = words[i]['text']
                word += text
            if word_pattern.match(word):
                dict['words'].append(word)
            elif amount_pattern.match(word):
                dict['values'].append(word)

    return dict
    conn.close()

def do_categorize(key):
        # Compute a representation for each message, showing various lengths supported.
    word = key
    categories = ["Food", "Entertainment", "Books", "Sports", "Travel", "Rent", "Utilities", "Education", "Advertising"]
    #sentence = "I am a sentence for which I would like to get its embedding."
    #paragraph = (
     #   "Universal Sentence Encoder embeddings also support short paragraphs. "
      #  "There is no hard limit on how long the paragraph is. Roughly, the longer "
      #  "the more 'diluted' the embedding will be.")
    messages = [word]
    messages.extend(categories)

    # Reduce logging output.
    tf.logging.set_verbosity(tf.logging.ERROR)

    with tf.Session() as session:
      session.run([tf.global_variables_initializer(), tf.tables_initializer()])
      message_embeddings = session.run(embed(messages))

    def run_and_tell(session_, input_tensor_, messages_, encoding_tensor):
      message_embeddings_ = session_.run(
          encoding_tensor, feed_dict={input_tensor_: messages_})
      corr = np.inner(message_embeddings_, message_embeddings_)
      return messages[corr[0,1:].argmax()+1]

    similarity_input_placeholder = tf.placeholder(tf.string, shape=(None))
    similarity_message_encodings = embed(similarity_input_placeholder)
    with tf.Session() as session:
      session.run(tf.global_variables_initializer())
      session.run(tf.tables_initializer())
      value = run_and_tell(session, similarity_input_placeholder, messages,
                   similarity_message_encodings)
      print(value)
      return value

"""
dict = getWords()
dict['categories'] = []

for key in dict['words']:
    print(key)
    value = do_categorize(str(key))
    dict['categories'].append(value)

print(dict)
"""

@app.route("/categorizeItems", methods=['POST', 'GET'])
def home():
    global body

    # Loading a Image
    print(request.data)
    body['url'] = request.data
    dict = getWords()
    dict['categories'] = []

    for key in dict['words']:
        print(key)
        value = do_categorize(str(key))
        dict['categories'].append(value)

    print(dict)
    return dict

if __name__ == "__main__":
    app.run(debug=True)
