from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from datetime import datetime

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load dataset
file_path = r"mlbackend\data.csv"
df = pd.read_csv(file_path)

df['D.O.A'] = pd.to_datetime(df['D.O.A'], errors='coerce')

# Filter relevant columns
daily_counts = df.groupby(
    ['D.O.A', 'TYPE OF ADMISSION-EMERGENCY/OPD']).size().unstack(fill_value=0)
daily_counts.columns = ['Emergency_Patients', 'OPD_Patients']
daily_counts = daily_counts.reset_index()

# Feature Engineering
daily_counts['Day'] = daily_counts['D.O.A'].dt.day
daily_counts['Month'] = daily_counts['D.O.A'].dt.month
daily_counts['Weekday'] = daily_counts['D.O.A'].dt.weekday
daily_counts['Prev_Emergency'] = daily_counts['Emergency_Patients'].shift(
    1).fillna(0)
daily_counts['Prev_OPD'] = daily_counts['OPD_Patients'].shift(1).fillna(0)

# Define features and target variables
X = daily_counts[['Day', 'Month', 'Weekday', 'Prev_Emergency', 'Prev_OPD']]
y_emergency = daily_counts['Emergency_Patients']
y_opd = daily_counts['OPD_Patients']

# Train-test split
X_train, X_test, y_train_emergency, y_test_emergency = train_test_split(
    X, y_emergency, test_size=0.2, random_state=42)
X_train, X_test, y_train_opd, y_test_opd = train_test_split(
    X, y_opd, test_size=0.2, random_state=42)

# Train models
rf_emergency = RandomForestRegressor(n_estimators=100, random_state=42)
rf_opd = RandomForestRegressor(n_estimators=100, random_state=42)
rf_emergency.fit(X_train, y_train_emergency)
rf_opd.fit(X_train, y_train_opd)

# Make predictions
preds_emergency = rf_emergency.predict(X_test)
preds_opd = rf_opd.predict(X_test)

# Evaluate model
mae_emergency = mean_absolute_error(y_test_emergency, preds_emergency)
mae_opd = mean_absolute_error(y_test_opd, preds_opd)
print(f"MAE for Emergency: {mae_emergency}, MAE for OPD: {mae_opd}")

# Function to predict future patient counts
def predict_patients(day, month, weekday, prev_emergency, prev_opd):
    input_data = pd.DataFrame([[day, month, weekday, prev_emergency, prev_opd]],
                              columns=['Day', 'Month', 'Weekday', 'Prev_Emergency', 'Prev_OPD'])
    pred_emergency = rf_emergency.predict(input_data)[0]
    pred_opd = rf_opd.predict(input_data)[0]
    return round(pred_emergency), round(pred_opd)


app = Flask(__name__)
CORS(app)

# Load the trained models
with open("mlbackend/patient_prediction_model.pkl", "rb") as model_file:
    models = joblib.load(model_file)

rf_emergency = models["rf_emergency"]
rf_opd = models["rf_opd"]


@app.route('/api/hospital/predict-patients', methods=['GET'])
def predictpatients():
    try:
        date_str = request.args.get('date')
        if not date_str:
            return jsonify({"error": "Date parameter is required"}), 400

        print("Received date:", date_str)

        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        day = date_obj.day
        month = date_obj.month
        weekday = date_obj.weekday()
        pred_emergency, pred_opd = predict_patients(
            day=day, month=month, weekday=weekday, prev_emergency=10, prev_opd=15)
        print(
            f"Predicted Emergency Patients: {pred_emergency}, Predicted OPD Patients: {pred_opd}")
        print("Predicted OPD patients:", pred_opd)
        print("Predicted emergency patients:", pred_emergency)

        return jsonify({
            "date": date_str,
            "opd_patients": pred_opd,
            "emergency_patients": pred_emergency
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=4000)
