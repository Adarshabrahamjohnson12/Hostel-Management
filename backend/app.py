from flask import Flask,jsonify,request 
from flask_cors import CORS
import mysql.connector
# import random
import json
import string

# from database import MySqlDB


# db = MySqlDB()

app = Flask(__name__)
CORS(app)

print("Server starting ")

# data base connection
db_config = {
    'host':'localhost',
    'user':'root',
    'password' :'',
    'database':'hostal_management'
}

def get_db_coneection():
    return mysql.connector.connect(**db_config)

'''
@app.route("/root",methods=['GET'])
def root():
    return jsonify({
        "statusCode" : "SC0000",
        "statusDesc" : "Success"
    })   
'''


@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        
        db_connection = get_db_coneection()
        cursor = db_connection.cursor()
        
        # Corrected SQL query to use proper parameterized input
        cursor.execute('SELECT count(*) FROM user_data WHERE e_mail = %s and password = %s;', (username,password))
        row = cursor.fetchone()
        db_connection.close()
        
        if row[0] > 0 :
            # Here you might want to check password as well
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "Login successfully",
                "login": True            
            }), 200
        else:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F005"},
                "message": 'User does not exist',
                "login": False
            }), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# for user details 
@app.route("/userdetails", methods=['POST'])
def userdetails():
    try:
        data = request.json
        username = data.get('username')
        
        if not username:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F001"},
                "message": 'Username is required',
                "login": False
            }), 400
        
        db_connection = get_db_coneection()
        cursor = db_connection.cursor()
        
        # Use parameterized query to prevent SQL injection
        cursor.execute('SELECT full_name, Rno, Hno, e_mail FROM user_data WHERE e_mail = %s;', (username,))
        row = cursor.fetchone()
        db_connection.close()

        if row:  # If a user was found
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "Login successful",
                "full_name": row[0],
                "Rno": row[1],
                "Hno": row[2],
                "e_mail": row[3],
                "login": True            
            }), 200
        else:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F005"},
                "message": 'User does not exist',
                "login": False
            }), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#to get room details  
@app.route("/roomdetails",methods=['POST'])   
def roomdetails():
    try:
        data = request.json
        Hno = data.get('Hno')
        
        if not Hno:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F001"},
                "message": 'Hostel id is required',
                "login": False
            }), 400
        
        db_connection = get_db_coneection()
        cursor = db_connection.cursor()
        
        # Use parameterized query to prevent SQL injection
        cursor.execute('SELECT Rono, full_name , Floor FROM `room_data` as x,`user_data` as y where x.Hno = y.Hno AND Rono = (SELECT Rono FROM `room_data` WHERE Hno = %s);', (Hno,))
        row = cursor.fetchone()
        db_connection.close()
        
        rono = row[0][0]
        floor = row[0][2]
        roomate = []
        for i in row:
            roomate.append(row[i][1])
            
        if row:  # If a user was found
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "Got details sucess",
                "Rono": rono,
                "roomate" : roomate,
                "floor": floor
            }), 200
        else:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F005"},
                "message": 'User does not exist'
            }), 400
        
        

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5080,debug=True )