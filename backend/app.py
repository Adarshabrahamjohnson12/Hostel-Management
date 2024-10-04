from flask import Flask,jsonify,request 
from flask_cors import CORS
import mysql.connector
import random
import json
import string

app = Flask(__name__)
CORS(app)

# data base connection
db_config = {
    'host':'localhost',
    'user':'root',
    'password' :'',
    'database':'lunar'
}

def get_db_coneection():
    return mysql.connector.connect(**db_config)

#for creating business id
def genrate_business_id(email):
    email_prefix = email.split('@')[0]
    random_number = ''.join(random.choices(string.digits,k=5))
    return f'{email_prefix}_{random_number}'

@app.route("/root",methods=['GET'])
def root():
    return jsonify({
        "statusCode" : "SC0000",
        "statusDesc" : "Success"
    })

# new
@app.route("/authAdapter",methods=['POST'])
def authAdapter():
    try :
        data  = request.get_json()
        fullname = data.get('full_name')
        email = data.get('email')
        pWord = data.get('p_word')

        if (fullname and email and pWord and fullname != "" and email != "" and pWord != "" and fullname != "NA" and email != "NA" and pWord != "NA"  ) :
            
            #check user exit or not
            connection = get_db_coneection()
            cursor = connection.cursor()
            cursor.execute("SELECT COUNT(*) FROM user_data WHERE e_mail = %s;",(email,))
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
                business_id = genrate_business_id(email)
                status = 1
                connection = get_db_coneection()
                cursor = connection.cursor()
                cursor.execute("INSERT INTO user_data (full_name,e_mail,password,status,business_id) VALUES (%s,%s,%s,%s,%s);",
                               (fullname,email,pWord,status,business_id))
                connection.commit()
                connection.close()
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {
                "code": "SC000"
                },
                "message": "New user created successfully",
                "params":{
                    "business_id" : business_id,
                    "status" : status
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
    


@app.route('/bmiApi',methods=['POST'])
def bmiApi():
    try:
        data = request.get_json()
        gender = data.get('gender')
        purpose = data.get('purpose')
        expWieght = data.get('expectedWieght')
        curWieght = data.get('currWieght')
        height = data.get('height')
        activity = data.get('activity')
        age  = data.get('age')
        business_id = data.get('business_id')

        if(gender and purpose and expWieght and curWieght and height and activity and age and business_id 
           and gender !="" and purpose != "" and expWieght != "" and curWieght != "" and height != "" and activity != "" and age != "" and business_id != ""
           and gender !="NA" and purpose != "NA" and expWieght != "NA" and curWieght != "NA" and height != "NA" and activity != "NA" and age != "NA" and business_id != "NA"  ):
                           
            if (gender == "M" ):
                BMR = (10 * float(curWieght)) + (6.25 * float(height)) - ( 5 * float(age)) + 5
            elif(gender == "F"):
                BMR = (10 * float(curWieght)) + (6.25 * float(height)) - ( 5 * float(age)) - 161
            #claculate the caloriy 
            curCalori = (BMR * float(activity))

            if(purpose == "0"):
                tag_per = float(curCalori *0.1)
                tagCal = curCalori + tag_per
            else:
                tag_per = float(curCalori *0.7)
                tagCal = curCalori + tag_per

            #database
            connection = get_db_coneection()
            cursor = connection.cursor()
            cursor.execute("INSERT INTO bmr_data (cur_cal,business_id,bmr,target_cal) VALUES (%s,%s,%s,%s);",
                        (curWieght,business_id,BMR,tag_per))
            connection.commit()
            connection.close()

            #Responses
            return jsonify({
                "statusDesc": "Success",
                "statusCode": {
                    "code": "SC000"
            },
            "message": "BMR successfully calculated",
            "params":{
                "business_id" : business_id
            }
                })

        
                

        else:
            return jsonify({
	        "statusDesc": "Failure",
            "statusCode": {
        	"code": "F005"
         	},
	        "message": "Some mandatory fields need to be filled"
                        
        }),400

        
        
     



    except Exception as e:
        return jsonify({"error":str(e)}),500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5080,debug=True )