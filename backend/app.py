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
    'database':'hostel_management'
}

def get_db_connection():
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
        userType = data.get('userType')
    
        
        
        db_connection = get_db_connection()
        cursor = db_connection.cursor()
        
        # Corrected SQL query to use proper parameterized input
        cursor.execute('SELECT count(*) FROM user_data WHERE e_mail = %s and password = %s and Acc_type = %s;', (username,password,userType))
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
                "login": False,
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
        
        db_connection = get_db_connection()
        cursor = db_connection.cursor()
        
        # Use parameterized query to prevent SQL injection
        cursor.execute('SELECT fname, lname, Rno, Hno, e_mail FROM user_data WHERE e_mail = %s;', (username,))
        row = cursor.fetchone()
        db_connection.close()

        if row:  # If a user was found
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "Login successful",
                "fname": row[0],
                "lname": row[1],
                "Rno": row[2],
                "Hno": row[3],
                "e_mail": row[4],
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


@app.route("/roomdetails", methods=['POST'])   
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
        
        db_connection = get_db_connection()
        cursor = db_connection.cursor()
        
        # Use parameterized query to prevent SQL injection
        cursor.execute('''
            SELECT Rono, fname , Floor FROM 
            room_data as x,user_data as y 
            where x.Hno = y.Hno AND x.Hno  != %s AND Rono = 
            (SELECT Rono FROM room_data WHERE Hno = %s);
        ''', (Hno,Hno))
        
        rows = cursor.fetchall()  # Fetch all rows matching the query
        db_connection.close()
        
        if rows:  # If any users were found
            rono = rows[0][0]
            floor = rows[0][2]
            roommates = [row[1] for row in rows]  # Extract full names from rows
            
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "Got details successfully",
                "Rono": rono,
                "roomate": roommates,
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


# Add student user 
@app.route("/addstudent", methods=["POST"])
def add_student():
    try:
        data = request.json
        sName = data.get('studentName')
        sEmail = data.get('studentEmail')
        rno = data.get('rno')
        Hno = rno
        passwd = sEmail# random.randint(10, 200)

        db_connection = get_db_connection()
        cursor = db_connection.cursor()

        # Check if user already exists
        cursor.execute('SELECT COUNT(*) FROM user_data WHERE e_mail = %s;', (sEmail,))
        check = cursor.fetchone()[0]  # Fetch the count directly
        db_connection.close()

        if check > 0:
            return jsonify({
                "statusDesc": "Failure",
                "statusCode": {"code": "F005"},
                "message": 'User already exists',
                "login": False,
            }), 400
        else:
            db_connection = get_db_connection()
            cursor = db_connection.cursor()

            # Insert new user into the database
            cursor.execute('''
                INSERT INTO user_data (Hno, Rno, fname, e_mail, password) VALUES (%s, %s, %s, %s, %s);
            ''', (Hno, rno, sName, sEmail, passwd))
            
            db_connection.commit()  # Commit the transaction
            db_connection.close()

            return jsonify({
                "statusDesc": "Success",
                "statusCode": {"code": "SC000"},
                "message": "User added successfully",
                "login": True            
            }), 201  # Use 201 for successful creation

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# To view the complaints
@app.route("/complaints",methods=['POST'])
def complaints():
    try:
        # data = request.json
        db_connection = get_db_connection()
        cursor = db_connection.cursor()
        cursor.execute(''' select fname , lname as name, content ,status 
                       FROM complaint_data as c , user_data as u 
                       WHERE c.Hno = u.Hno; ''')
        rows = cursor.fetchall()  # Fetch all rows matching the query
        db_connection.close()
        return jsonify({"users":rows})        
    
   
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/newcomplaint",methods=['POST'])
def newcomplaint():
    try:
        data = request.json
        Hno = data.get('Hno')
        content = data.get('content')
        
        
        db_connection = get_db_connection()
        cursor = db_connection.cursor()
        cursor.execute(''' insert into complaint_data values(%s,%s,0); ''',(Hno,content))
        rows = cursor.fetchone()  # Fetch all rows matching the query
        db_connection.close()
        return jsonify({"message":"succes"})  
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    

    
# Starting 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5080,debug=True )