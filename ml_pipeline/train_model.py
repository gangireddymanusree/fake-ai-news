"""
TruthGuard AI - Final-Year AI Project
Model Training Script: TF-IDF Vectorization & Multi-Model Classifiers
Trained on ISOT Fake News & WELFake Benchmark Datasets
"""

import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

def train_fake_news_models(dataset_path: str = "news.csv"):
    print("[*] Initializing TruthGuard AI ML Training Pipeline...")
    
    # Check if dataset exists, else generate synthetic benchmark structure
    if not os.path.exists(dataset_path):
        print(f"[!] Warning: {dataset_path} not found. Creating benchmark placeholder dataset...")
        data = {
            'title': [
                "Federal Reserve holds interest rate steady after meeting",
                "SHOCKING: Secret cure for cancer leaked big pharma banned",
                "NASA confirms water vapor on habitable exoplanet",
                "BOMBSHELL: Mind control chips discovered in wireless towers"
            ],
            'text': [
                "WASHINGTON (Reuters) - Federal Reserve policymakers voted to maintain target ranges.",
                "Wake up! Anonymous insiders exposed the hidden cure they don't want you to know.",
                "BALTIMORE (Associated Press) - Researchers published spectroscopic findings in Nature.",
                "Urgent proof leaked that government agents are transmitting obedient frequencies."
            ],
            'label': ['REAL', 'FAKE', 'REAL', 'FAKE']
        }
        df = pd.DataFrame(data)
    else:
        df = pd.read_csv(dataset_path)

    # Preprocessing
    df['content'] = df['title'].fillna('') + " " + df['text'].fillna('')
    X = df['content']
    y = df['label'].map({'REAL': 0, 'FAKE': 1})

    # Train / Test split (80% train, 20% holdout test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    print(f"[*] Training on {len(X_train)} samples, testing on {len(X_test)} samples.")

    # TF-IDF Vectorization
    print("[*] Computing TF-IDF Vector Space (N-Grams 1-2, max_features=10000)...")
    tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=10000, ngram_range=(1, 2))
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
    X_test_tfidf = tfidf_vectorizer.transform(X_test)

    # Dictionary of algorithms to benchmark
    models = {
        "Passive Aggressive Classifier": PassiveAggressiveClassifier(max_iter=50, C=0.5, random_state=42),
        "Linear Support Vector Machine": LinearSVC(C=1.0, random_state=42),
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Multinomial Naive Bayes": MultinomialNB(alpha=0.1),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
    }

    results = {}
    os.makedirs("models", exist_ok=True)

    for name, clf in models.items():
        print(f"\n[*] Training {name}...")
        clf.fit(X_train_tfidf, y_train)
        y_pred = clf.predict(X_test_tfidf)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        cm = confusion_matrix(y_test, y_pred)

        results[name] = {
            "accuracy": acc,
            "precision": prec,
            "recall": rec,
            "f1_score": f1,
            "confusion_matrix": cm.tolist()
        }

        print(f"    Accuracy:  {acc * 100:.2f}%")
        print(f"    Precision: {prec * 100:.2f}%")
        print(f"    Recall:    {rec * 100:.2f}%")
        print(f"    F1-Score:  {f1:.4f}")

    # Save artifacts
    joblib.dump(tfidf_vectorizer, "models/tfidf_vectorizer.pkl")
    joblib.dump(models["Passive Aggressive Classifier"], "models/passive_aggressive_model.pkl")
    print("\n[+] Model artifacts successfully saved to ./models/ directory.")
    return results

if __name__ == "__main__":
    train_fake_news_models()
