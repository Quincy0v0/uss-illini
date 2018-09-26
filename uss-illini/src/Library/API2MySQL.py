'''
Quick 1-Stop Update DB

Main Methods:
    create_db(DB_NAME,DB_user,DB_password)
    create_table(DB_NAME,DB_user,DB_password)
    UpdateDB(account_ids,ship_ids,module_ids,clan_ids,DB_NAME,DB_user,DB_password)
    ------------>pass in [] in the field if no update should be made<-------------

    list("") = example_account_ids #ericsama, Quincy0v0
    list("") = example_ship_ids #all non-gold ships id
    list("") = example_module_ids #all shima's module
    list("") = example_clan_ids #kuma, seal
'''
import TableSchema
import InsertSchema
import Python2MySQL as p2m
import Ship_idDict.ship_id_dict

def create_db(DB_NAME,DB_user,DB_password):
    p2m.create_DB(DB_NAME,DB_user,DB_password)

def create_table(DB_NAME,DB_user,DB_password):
    p2m.create_Table(DB_NAME,DB_user,DB_password,TableSchema.TABLES)

def UpdateDB(account_ids,ship_ids,module_ids,clan_ids,DB_NAME,DB_user,DB_password):
    for account_id in account_ids:
        InsertSchema.insert_account_stats(account_id,DB_NAME,DB_user,DB_password)
        InsertSchema.insert_rank_ship_stats(account_id,DB_NAME,DB_user,DB_password)
        InsertSchema.insert_rank_account_stats(account_id,DB_NAME,DB_user,DB_password)
        for ship_id in ship_ids:
            InsertSchema.insert_random_ships_stats(account_id,ship_id,DB_NAME,DB_user,DB_password)
    for module_id in module_ids:
        InsertSchema.insert_module(module_id,DB_NAME,DB_user,DB_password)
    for ship_id in ship_ids:
        InsertSchema.insert_ship(ship_id,DB_NAME,DB_user,DB_password)
    for clan_id in clan_ids:
        InsertSchema.insert_clan(clan_id,DB_NAME,DB_user,DB_password)

example_account_ids = ["1011528019","1019218342"]
example_ship_ids = [Ship_idDict.ship_id_dict[nation][ship_type][tier][ship] for nation in Ship_idDict.ship_id_dict.keys() for ship_type in Ship_idDict.ship_id_dict[nation].keys() for tier in Ship_idDict.ship_id_dict[nation][ship_type].keys() for ship in Ship_idDict.ship_id_dict[nation][ship_type][tier].keys()]
example_module_ids = ["3308105424","3453759184","3318722256","3349589712","3349556944","3345362640","3346411216"]
example_clan_ids = ["1000043952","1000044201"]
