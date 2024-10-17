from flask import Flask,jsonify,request 
from flask_cors import CORS
import mysql.connector
import random
import json
import string

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

''''#for creating business id
def genrate_business_id(email):
    email_prefix = email.split('@')[0]
    random_number = ''.join(random.choices(string.digits,k=5))
    return f'{email_prefix}_{random_number}'''''

@app.route("/root",methods=['GET'])
def root():
    return jsonify({
        "statusCode" : "SC0000",
        "statusDesc" : "Success"
    })

@app.route("/list",methods=['GET'])
def  list():
    try:
        db_connection = get_db_coneection()
        cursor = db_connection.cursor()
        cursor.execute('select full_name FROM user_data ')
        listData = cursor.fetchall()
        db_connection.close()
        
        return jsonify(listData),200
    
        # else:
        #     return jsonify({
	    #     "statusDesc": "Failure",
        #     "statusCode": {
        # 	"code": "F005"
        #  	},
	    #     "message": "Some mandatory fields need to be filled"
                        
        # }),400
    except Exception as e:
        return jsonify({"error": str(e)}),500



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
    
# new
'''
@app.route("/authAdapter",methods=['POST'])
def authAdapter():
    try :
        data  = request.get_json()
        fullname = data.get('full_name')
        email = data.get('email')
        pWord = data.get('p_word')
        acc_type = data.get('Acc_type')
        hno = data.get('Hno')

        if (fullname and email and pWord and fullname != "" and email != "" and pWord != "" and fullname != "NA" and email != "NA" and pWord != "NA"  ) :
            
            #check user exit or not
            connection = get_db_coneection()
            cursor = connection.cursor()
            cursor.execute("SELECT COUNT(*) FROM user_data WHERE e_mail = %s or Hno = %s;",(email,hno))
            row = cursor.fetchone()
            connection.close()
            if row[0] > 0 :
                return jsonify({
                    "statusDesc": "Failure",
                    "statusCode":{
                        "code": "F005",
                        "message" : 'User already existed ',
                    }
                })
            else:
                #insert user data
                # business_id = genrate_business_id(email)
                # status = 1
                connection = get_db_coneection()
                cursor = connection.cursor()
                cursor.execute("INSERT INTO user_data (Hno,full_name,e_mail,password,Acc_type) VALUES (%s,%s,%s,%s,%s);",
                               (hno,fullname,email,pWord,acc_type))
                connection.commit()
                connection.close()
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {
                "code": "SC000"
                },
                "message": "New user created successfully",
                "params":{
                    # "business_id" : business_id,
                    # "status" : status

                }
                            
            }),200

                
        else:
            return jsonify({
	        "statusDesc": "Failure",
            "statusCode": {
        	"code": "F005"
         	},
	        "message": "Some mandatory fields need to be filled"
                        
        }),400
    except Exception as e:
        return jsonify({"error": str(e)}),500
 '''   

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5080,debug=True )