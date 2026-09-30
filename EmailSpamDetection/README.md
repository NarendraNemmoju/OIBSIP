# Email Spam Detection Using Python

## Project Overview

This project uses machine learning to classify SMS messages as either ham (normal messages) or spam. Text processing techniques are used to convert SMS messages into numerical features before training the machine learning models.

## Dataset

The dataset contains SMS messages with two labels:

- Ham - Normal message
- Spam - Unwanted or promotional message

## Technologies Used

- Python
- Pandas
- Matplotlib
- Seaborn
- Scikit-learn
- Jupyter Notebook

## Data Processing

The project includes:

- Loading the SMS dataset
- Checking dataset shape and missing values
- Visualizing ham and spam distribution
- Converting labels into numerical values
- Splitting the data into training and testing sets
- Converting text into TF-IDF features

## Machine Learning Models

Two classification models were used:

1. Logistic Regression
2. Multinomial Naive Bayes

## Model Performance

- Logistic Regression Accuracy: approximately 97.04%
- Naive Bayes Accuracy: approximately 97.22%

Based on the accuracy obtained on this test split, Naive Bayes performed slightly better.

## Evaluation

The models were evaluated using:

- Accuracy
- Confusion Matrix
- Precision
- Recall
- F1-Score

## Conclusion

Machine learning can be used to automatically classify SMS messages as ham or spam. TF-IDF converts the text messages into numerical features that can be processed by machine learning algorithms. The results show that both models achieved high classification accuracy on the test dataset.