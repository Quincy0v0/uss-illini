
#MYSQL Connector example format

import mysql.connector
from mysql.connector import errorcode

'''
Database Creation
'''

DB_NAME = 'warships'

cnx = mysql.connector.connect(user='erikaze',password='219749ajfcg')
cursor = cnx.cursor()

try:
    cursor.execute("CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
except:
    print("create DB error")

cnx.database = DB_NAME

'''
Table Creation
'''

TABLES = {}
TABLES['SHIPS'] = ("""CREATE TABLE IF NOT EXISTS SHIPS(
                       SHIP_ID INTEGER NOT NULL PRIMARY KEY,
                       NAME TEXT,
                       TIER INTEGER,
                       TYPE TEXT,
                       NATION TEXT,
                       PRICE_CREDIT INTEGER,
                       PRICE_GOLD INTEGER,
                       SHIP_ID_STR TEXT,
                       IS_PREMIUM BOOL,
                       IS_SPECIAL BOOL,
                       DESCRIPTION TEXT,
                       MOD_SLOTS INTEGER,
                       NEXT_SHIPS TEXT,
                       UPGRADES TEXT,
                       DEFAULT_PROFILE TEXT,
                       IMAGES TEXT,
                       MODULES TEXT,
                       MODULES_TREE TEXT           
                    );""")

TABLES['MODULES'] = ("""CREATE TABLE IF NOT EXISTS MODULES(
                       MODULE_ID INTEGER NOT NULL PRIMARY KEY,
                       NAME TEXT,
                       TYPE TEXT,
                       IMAGE TEXT,
                       TAG TEXT,
                       PRICE_CREDIT INTEGER,
                       MODULE_ID_STR TEXT,
                       PROFILE TEXT          
                    );""")

TABLES['STATS'] = ("""CREATE TABLE IF NOT EXISTS STATS(
                       ID INTEGER UNIQUE NOT NULL AUTO_INCREMENT,
                       ACCOUNT_ID INTEGER NOT NULL,
                       SHIP_ID INTEGER NOT NULL,
                       WINS INTEGER,
                       DRAWS INTEGER,
                       LOSSES INTEGER,
                       BATTLES INTEGER,
                       SURVIVED_WINS INTEGER,
                       SURVIVED_BATTLES INTEGER,
                       XP INTEGER,
                       MAX_XP INTEGER,
                       FRAGS INTEGER,
                       DAMAGE_SCOUTING INTEGER,
                       DAMAGE_DEALT INTEGER,
                       SHIPS_SPOTTED INTEGER,
                       MAX_SHIPS_SPOTTED INTEGER,
                       TEAM_CAPTURE_POINTS INTEGER,
                       CAPTURE_POINTS INTEGER,
                       DROPPED_CAPTURE_POINTS INTEGER,
                       TEAM_DROPPED_CAPTURE_POINTS INTEGER,
                       PLANES_KILLED INTEGER,
                       MAX_PLANES_KILLED INTEGER,
                       LAST_BATTLE_TIME INTEGER,
                       DISTANCE INTEGER,
                       UPDATED_AT INTEGER,
                       PRIVATE BOOL,
                       DAMAGE_TO_BUILDINGS INTEGER,
                       MAX_DAMAGE_DEALT_TO_BUILDINGS INTEGER,
                       SUPPRESSIONS_COUNT INTEGER,
                       MAX_SUPPRESSIONS_COUNT INTEGER,
                       ART_AGRO INTEGER,
                       TORPEDO_AGRO INTEGER,
                       MAX_TOTAL_AGRO INTEGER,
                       BATTLES_SINCE_510 INTEGER,
                       BATTLES_SINCE_512 INTEGER,
                       MAIN_BATTERY TEXT,
                       SECOND_BATTERY TEXT,
                       RAMMING TEXT,
                       TORPEDOES TEXT,
                       AIRCRAFT TEXT,
                       KEY(ID, ACCOUNT_ID, SHIP_ID)
                    );""")
    
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
cursor.close()
cnx.close()

'''
INSERT
'''

cnx = mysql.connector.connect(user='erikaze',password='219749ajfcg', database='warships')
cursor = cnx.cursor()

add_module = ("INSERT INTO MODULES "
              "(MODULE_ID, NAME, TYPE, IMAGE, TAG, PRICE_CREDIT, MODULE_ID_STR, PROFILE)" 
              "VALUES (%(MODULE_ID)s, %(NAME)s, %(TYPE)s, %(IMAGE)s, %(TAG)s, %(PRICE_CREDIT)s, %(MODULE_ID_STR)s, %(PROFILE)s)")

data_module = {
   'MODULE_ID' : 12345678,
   'NAME' : "Test Module",
   'TYPE' : "Test type",
   'IMAGE' : "../Test_Img.jpg",
   'TAG' : "Test tag",
   'PRICE_CREDIT' : 100,
   'MODULE_ID_STR' : "Test Module ID Str",
   'PROFILE' : "Test Profile",   
}
try:
    cursor.execute(add_module, data_module)
except:
    print("insert error")

'''
QUERY
'''

query = ("SELECT * FROM MODULES "
     "WHERE MODULE_ID = %(MODULE_ID)s")

query_module = {
   'MODULE_ID' : 12345678,
   'NAME' : "Test Module",
   'TYPE' : "Test type",
   'IMAGE' : "../Test_Img.jpg",
   'TAG' : "Test tag",
   'PRICE_CREDIT' : 100,
   'MODULE_ID_STR' : "Test Module ID Str",
   "PROFILE" : "Test Profile",  
}
cursor.execute(query, (query_module))

for (MODULE_ID, NAME, TYPE, IMAGE, TAG, PRICE_CREDIT, MODULE_ID_STR, PROFILE) in cursor:
    print("MODULE_ID:{}, NAME:{}, TYPE:{}, IMAGE:{}, TAG:{}, PRICE_CREDIT:{}, MODULE_ID_STR:{}, PROFILE:{}".format(MODULE_ID, NAME, TYPE, IMAGE, TAG, PRICE_CREDIT, MODULE_ID_STR, PROFILE))
    
cnx.commit()

cursor.close()
cnx.close()
