'''
Basic Insertion Quick Lookup

Main Methods: query -> (delete ->) insert
    insert_module(module_id,DB_NAME,DB_user,DB_password)
    insert_ship(ship_id,DB_NAME,DB_user,DB_password)
    insert_random_ships_stats(account_id,ship_id,DB_NAME,DB_user,DB_password)
    insert_clan(clan_id,DB_NAME,DB_user,DB_password)
    insert_account_stats(account_id,DB_NAME,DB_user,DB_password)
    insert_rank_ship_stats(account_id,DB_NAME,DB_user,DB_password)
    insert_rank_account_stats(account_id,DB_NAME,DB_user,DB_password)
'''
import API2Python as a2p
import Python2MySQL as p2m

def insert_module(module_id,DB_NAME,DB_user,DB_password):
    query = ("SELECT * FROM modules "
         "WHERE module_id ="+module_id)
    if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
        code = ("DELETE FROM modules "
            "WHERE module_id ="+module_id)
        p2m.execute(DB_NAME,DB_user,DB_password,code)
    values = ""
    data = ()
    for value in a2p.get_module_encylopedia(a2p.application_id,module_id):
        values += "%s,"
        data += value
    values = values[:-1]
    schema = ("INSERT INTO modules "
                  "VALUES (" + values + ")")
    p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_ship(ship_id,DB_NAME,DB_user,DB_password):
    query = ("SELECT * FROM ships "
         "WHERE ship_id ="+ship_id)
    if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
        code = ("DELETE FROM ship "
            "WHERE ship_id ="+ship_id)
        p2m.execute(DB_NAME,DB_user,DB_password,code)
    values = ""
    data = ()
    for value in a2p.get_ship_encylopedia(a2p.application_id,ship_id):
        values += "%s,"
        data += value
    values = values[:-1]
    schema = ("INSERT INTO ships "
                  "VALUES (" + values + ")")
    p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_random_ships_stats(account_id,ship_id,DB_NAME,DB_user,DB_password):
    query = ("SELECT * FROM random_ships_stats "
         "WHERE ship_id ="+ship_id+"AND account_id ="+account_id)
    if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
        code = ("DELETE FROM random_ships_stats "
            "WHERE ship_id ="+ship_id+"AND account_id ="+account_id)
        p2m.execute(DB_NAME,DB_user,DB_password,code)
    values = ""
    data = ()
    for value in a2p.get_ship_account(a2p.application_id,account_id,ship_id):
        values += "%s,"
        data += value
    values = values[:-1]
    schema = ("INSERT INTO random_ships_stats "
                  "VALUES (" + values + ")")
    p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_clan(clan_id,DB_NAME,DB_user,DB_password):
    query = ("SELECT * FROM clans "
         "WHERE clan_id ="+clan_id)
    if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
        code = ("DELETE FROM clans "
            "WHERE clan_id ="+clan_id)
        p2m.execute(DB_NAME,DB_user,DB_password,code)
    values = ""
    data = ()
    for value in a2p.get_clan_details(a2p.application_id,clan_id):
        values += "%s,"
        data += value
    values = values[:-1]
    schema = ("INSERT INTO clans "
                  "VALUES (" + values + ")")
    p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_account_stats(account_id,DB_NAME,DB_user,DB_password):
    query = ("SELECT * FROM account_stats "
         "WHERE account_id ="+account_id)
    if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
        code = ("DELETE FROM account_stats "
            "WHERE account_id ="+account_id)
        p2m.execute(DB_NAME,DB_user,DB_password,code)
    values = ""
    data = ()
    for value in a2p.get_account_data(a2p.application_id,account_id):
        values += "%s,"
        data += value
    for value in a2p.get_clan_player(a2p.application_id,account_id):
        values += "%s,"
        data += value
    values = values[:-1]
    schema = ("INSERT INTO account_stats "
                  "VALUES (" + values + ")")
    p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_rank_ship_stats(account_id,DB_NAME,DB_user,DB_password):
    for ship in a2p.get_rank_ship(a2p.application_id,account_id):
        for season in ship.keys():
            query = ("SELECT * FROM rank_ship_stats "
                 "WHERE season ="+season+"AND ship_id ="+ship[season][0]+"AND account_id ="+account_id)
            if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
                code = ("DELETE FROM rank_ship_stats "
                    "WHERE season ="+season+"AND ship_id ="+ship[season][0]+"AND account_id ="+account_id)
                p2m.execute(DB_NAME,DB_user,DB_password,code)
            values = "%s,"
            data = (int(season))
            for value in ship[season]:
                values += "%s,"
                data += value
            values = values[:-1]
            schema = ("INSERT INTO rank_ship_stats "
                          "VALUES (" + values + ")")
            p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)

def insert_rank_account_stats(account_id,DB_NAME,DB_user,DB_password):
    for season in a2p.get_rank_player(a2p.application_id,account_id).keys():
        query = ("SELECT * FROM rank_account_stats "
             "WHERE season ="+season+"AND account_id ="+account_id)
        if(p2m.quick_query(DB_NAME,DB_user,DB_password,query)) != []:
            code = ("DELETE FROM rank_account_stats "
                 "WHERE season ="+season+"AND account_id ="+account_id)
            p2m.execute(DB_NAME,DB_user,DB_password,code)
        values = "%s,"
        data = (int(season))
        for value in a2p.get_rank_player(a2p.application_id,account_id)[season]:
            values += "%s,"
            data += value
        values = values[:-1]
        schema = ("INSERT INTO rank_account_stats "
                      "VALUES (" + values + ")")
        p2m.insert_modify_delete(DB_NAME,DB_user,DB_password,schema,data)
