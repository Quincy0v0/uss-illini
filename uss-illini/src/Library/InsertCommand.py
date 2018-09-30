'''
Return Basic Insertion Commands

Main Methods:
    str = insert_module(module_id)
    str = insert_ship(ship_id)
    str = insert_random_ships_stats(account_id,ship_id)
    str = insert_clan(clan_id)
    str = insert_account_stats(account_id)
    str = insert_rank_ship_stats(account_id)
    str = insert_rank_account_stats(account_id)
'''
import API2Python as a2p

def insert_module(module_id):
    data = a2p.get_module_encylopedia(a2p.application_id,module_id)
    if not isinstance(data, type(None)):
        command = 'INSERT INTO modules VALUES'+'('
        for value in data:
            if isinstance(value,str):
                command += "'"
                command += str(value.replace("'", ""))
                command += "',"
            elif isinstance(value,list) or isinstance(value,dict):
                command += '"'
                command += str(value).replace('"', "")
                command += '",'
            elif value is None:
                command += "NULL,"
            else:
                command += str(value)+","
        command = command[:-1]
        command +=  ');'
        return command
    else:
        return ""

def insert_ship(ship_id):
    data =  a2p.get_ship_encyclopedia(a2p.application_id,ship_id)
    if not isinstance(data, type(None)):
        command = 'INSERT INTO ships VALUES'+'('
        for value in data:
            if isinstance(value,str):
                command += "'"
                command += str(value.replace("'", ""))
                command += "',"
            elif isinstance(value,list) or isinstance(value,dict):
                command += '"'
                command += str(value).replace('"', "")
                command += '",'
            elif value is None:
                command += "NULL,"
            else:
                command += str(value)+","
        command = command[:-1]
        command +=  ');'
        return command
    else:
        return ""

def insert_random_ships_stats(account_id,ship_id):
    data = a2p.get_ship_account(a2p.application_id,account_id,ship_id)
    if not isinstance(data, type(None)):
        command = 'INSERT INTO random_ships_stats VALUES'+'('
        for value in data:
            if isinstance(value,str):
                command += "'"
                command += str(value.replace("'", ""))
                command += "',"
            elif isinstance(value,list) or isinstance(value,dict):
                command += '"'
                command += str(value).replace('"', "")
                command += '",'
            elif value is None:
                command += "NULL,"
            else:
                command += str(value)+","
        command = command[:-1]
        command +=  ');'
        return command
    else:
        return ""

def insert_clan(clan_id):
    data = a2p.get_clan_details(a2p.application_id,clan_id)
    if not isinstance(data, type(None)):
        command = 'INSERT INTO clans VALUES'+'('
        for value in data:
            if isinstance(value,str):
                command += "'"
                command += str(value.replace("'", ""))
                command += "',"
            elif isinstance(value,list) or isinstance(value,dict):
                command += '"'
                command += str(value).replace('"', "")
                command += '",'
            elif value is None:
                command += "NULL,"
            else:
                command += str(value)+","
        command = command[:-1]
        command +=  ');'
        return command
    else:
        return ""

def insert_account_stats(account_id):
    data1 = a2p.get_account_data(a2p.application_id,account_id)
    data2 = a2p.get_clan_player(a2p.application_id,account_id)
    if not isinstance(data1, type(None)):
        command = 'INSERT INTO account_stats VALUES'+'('
        for value in data1:
            if isinstance(value,str):
                command += "'"
                command += str(value.replace("'", ""))
                command += "',"
            elif isinstance(value,list) or isinstance(value,dict):
                command += '"'
                command += str(value).replace('"', "")
                command += '",'
            elif value is None:
                command += "NULL,"
            else:
                command += str(value)+","
        if not isinstance(data2, type(None)):
            for value in data2:
                if isinstance(value,str):
                    command += "'"
                    command += str(value.replace("'", ""))
                    command += "',"
                elif isinstance(value,list) or isinstance(value,dict):
                    command += '"'
                    command += str(value).replace('"', "")
                    command += '",'
                elif value is None:
                    command += "NULL,"
                else:
                    command += str(value)+","
        else:
            for value in ("NULL","NULL","NULL","NULL","NULL"):
                command += "'"
                command += value
                command += "',"

        command = command[:-1]
        command +=  ');'
        return command
    else:
        return ""

def insert_rank_ship_stats(account_id):
    data = a2p.get_rank_ship(a2p.application_id,account_id)
    if not isinstance(data, type(None)):
        command = ""
        for ship in data:
            for season in ship.keys():
                if len(ship[season]) > 1:
                    command += 'INSERT INTO rank_ships_stats VALUES'+'('+str(season)+','
                    for value in ship[season]:
                        if isinstance(value,str):
                            command += "'"
                            command += str(value.replace("'", ""))
                            command += "',"
                        elif isinstance(value,list) or isinstance(value,dict):
                            command += '"'
                            command += str(value).replace('"', "")
                            command += '",'
                        elif value is None:
                            command += "NULL,"
                        else:
                            command += str(value)+","
                    command = command[:-1]
                    command +=  ');'
        return command
    else:
        return ""

def insert_rank_account_stats(account_id):
    data = a2p.get_rank_player(a2p.application_id,account_id)
    if not isinstance(data, type(None)):
        command = ""
        for season in data.keys():
            if len(data[season]) > 1:
                command += 'INSERT INTO rank_account_stats VALUES'+'('+str(season)+','
                for value in data[season]:
                    if isinstance(value,str):
                        command += "'"
                        command += str(value.replace("'", ""))
                        command += "',"
                    elif isinstance(value,list) or isinstance(value,dict):
                        command += '"'
                        command += str(value).replace('"', "")
                        command += '",'
                    elif value is None:
                        command += "NULL,"
                    else:
                        command += str(value)+","
                command = command[:-1]
                command +=  ');'
        return command
    else:
        return ""
