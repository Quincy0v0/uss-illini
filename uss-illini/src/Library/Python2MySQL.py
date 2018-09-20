'''
Use Data To Execute MySQL Commands

Main Methods:
    create_DB(DB_NAME,DB_user,DB_password)
    create_Table(DB_NAME,DB_user,DB_password,TABLES)
    insert_modify_delete(DB_NAME,DB_user,DB_password,add_module,data_module)
    execute(DB_NAME,DB_user,DB_password,code)
    list() = query(DB_NAME,DB_user,DB_password,query,query_module
'''
import mysql.connector
from mysql.connector import errorcode

def create_DB(DB_NAME,DB_user,DB_password):
    cnx = mysql.connector.connect(user=DB_user,password=DB_password)
    cursor = cnx.cursor()
    try:
        cursor.execute("CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
    except:
        print("create DB error")
    cnx.commit()
    cursor.close()
    cnx.close()


def create_Table(DB_NAME,DB_user,DB_password,TABLES):
    cnx = mysql.connector.connect(user=DB_user,password=DB_password)
    cnx.database = DB_NAME
    cursor = cnx.cursor()
    for name, ddl in TABLES.items():
        try:
            print("Creating table {}: ".format(name), end='')
            cursor.execute(ddl)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")
    cnx.commit()
    cursor.close()
    cnx.close()


def insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data):
    cnx = mysql.connector.connect(user=DB_user,password=DB_password,database=DB_NAME)
    cursor = cnx.cursor()
    try:
        cursor.execute(schema, data)
    except:
        print("error")
    cnx.commit()
    cursor.close()
    cnx.close()

def execute(DB_NAME,DB_user,DB_password,code):
    cnx = mysql.connector.connect(user=DB_user,password=DB_password,database=DB_NAME)
    cursor = cnx.cursor()
    try:
        cursor.execute(code)
    except:
        print("error")
    cnx.commit()
    cursor.close()
    cnx.close()

def query(DB_NAME,DB_user,DB_password,query,query_module):
    cnx = mysql.connector.connect(user=DB_user,password=DB_password,database=DB_NAME)
    cursor = cnx.cursor()
    cursor.execute(query, (query_module))
    result = []]
    for data in cursor:
        result.append(data)
    cnx.commit()
    cursor.close()
    cnx.close()
    return result
