// NOTE: //

# Python - Machine Learning Model for Fake Product Identification: 
# -------------------

# Importing necessary libraries
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import joblib

data = {
    'description': [
        'High-quality wooden table',
        'Artificial intelligence book',
        'Handmade ceramic vase',
        'Fake plastic chair',
        'Genuine leather sofa'
    ],
    'label': [0, 0, 0, 1, 0]  # 0 for real, 1 for fake
}

# Creating a DataFrame
df = pd.DataFrame(data)

# Preprocessing data (using TF-IDF for text data)
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['description'])
y = df['label']

# Model: (Random Forest Classifier)
model = RandomForestClassifier()
model.fit(X, y)

# Saving
joblib.dump(model, 'fake_product_detection_model.pkl')



# Flask API Integration:
# ---------------------

from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('fake_product_detection_model.pkl')

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    description = data['description']
    # Preprocess the input description (using the same vectorizer used during training)
    description_vectorized = vectorizer.transform([description])
    # Make prediction using the loaded model
    prediction = model.predict(description_vectorized)[0]
    # Return prediction result
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(port=5000, debug=True)


# Example: API Test:
{
    "description": "This is a genuine wooden chair"
}






















<h1 align="center"> Furniture E-commerce  </h1>

###

<h2 align="left"> Used Technologies: </h1>

###

<ul>
  <li> Semantic HTML5 markup </li>
  <li> Javascript </li>
  <li> React </li>
  <li> Bootstrap </li>
  <li> Framer Motion </li>
  <li> Redux toolkit </li>
</ul>

<h2 align="left"> Author: </h1>

###

<ul>
 <li>
    <a href=""></a>
  </li>
</ul>
