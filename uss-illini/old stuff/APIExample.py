import urllib.request
import json
from pprint import pprint

application_id = "b2f122ce4941da951c7b0cafa659608e"

def get_ship_encyclopedia(application_id,ship_id):
    link = "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id="+application_id+"&ship_id="+ship_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)
    
    #Key Information
    name = data['data'][ship_id]['name']
    tier = data['data'][ship_id]['tier']
    type = data['data'][ship_id]['type']
    nation = data['data'][ship_id]['nation']
    
    #Useful Information
    price_credit = data['data'][ship_id]['price_credit']
    price_gold = data['data'][ship_id]['price_gold']
    ship_id_str = data['data'][ship_id]['ship_id_str']
    #ship_id = data['data'][ship_id]['ship_id']
    is_premium = data['data'][ship_id]['is_premium']
    is_special = data['data'][ship_id]['is_special']
    description = data['data'][ship_id]['description']
    mod_slots = data['data'][ship_id]['mod_slots']
    
    #Nested Information
    next_ships = data['data'][ship_id]['next_ships']
    upgrades = data['data'][ship_id]['upgrades']
    default_profile = data['data'][ship_id]['default_profile']
    images = [data['data'][ship_id]['images']['small'],data['data'][ship_id]['images']['medium'],data['data'][ship_id]['images']['large'],data['data'][ship_id]['images']['contour']]
    modules = data['data'][ship_id]['modules']
    modules_tree = data['data'][ship_id]['modules_tree']

def get_module_encylopedia(application_id,module_id):
    link = "https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id="+application_id+"&module_id="+module_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)
    
    #Key Information
    name = data['data'][module_id]['name']
    type = data['data'][module_id]['type']

    #Useful Information
    image = data['data'][module_id]['image']
    tag = data['data'][module_id]['tag']
    module_id_str = data['data'][module_id]['module_id_str']
    #module_id = data['data'][module_id]['module_id']
    price_credit = data['data'][module_id]['price_credit']

    #Nested Information
    profile = data['data'][module_id]['profile']

def get_ship_account(application_id,account_id,ship_id):
    link = "https://api.worldofwarships.com/wows/ships/stats/?application_id="+application_id+"&account_id="+account_id +"&ship_id="+ship_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)
    
    #Key Information
    wins = data['data'][account_id][0]['pvp']['wins']
    draws = data['data'][account_id][0]['pvp']['draws']
    losses = data['data'][account_id][0]['pvp']['losses']
    battles = data['data'][account_id][0]['pvp']['battles']
    survived_wins = data['data'][account_id][0]['pvp']['survived_wins']
    survived_battles = data['data'][account_id][0]['pvp']['survived_battles']
    xp = data['data'][account_id][0]['pvp']['xp']
    max_xp = data['data'][account_id][0]['pvp']['max_xp']
    frags = data['data'][account_id][0]['pvp']['frags']
    max_frags_battle = data['data'][account_id][0]['pvp']['max_frags_battle']
    damage_scouting = data['data'][account_id][0]['pvp']['damage_scouting']
    max_damage_scouting = data['data'][account_id][0]['pvp']['max_damage_scouting']
    damage_dealt = data['data'][account_id][0]['pvp']['damage_dealt']
    max_damage_dealt = data['data'][account_id][0]['pvp']['max_damage_dealt']
    ships_spotted = data['data'][account_id][0]['pvp']['ships_spotted']
    max_ships_spotted = data['data'][account_id][0]['pvp']['max_ships_spotted']
    team_capture_points = data['data'][account_id][0]['pvp']['team_capture_points']
    capture_points = data['data'][account_id][0]['pvp']['capture_points']
    dropped_capture_points = data['data'][account_id][0]['pvp']['dropped_capture_points']
    team_dropped_capture_points = data['data'][account_id][0]['pvp']['team_dropped_capture_points']
    planes_killed = data['data'][account_id][0]['pvp']['planes_killed']
    max_planes_killed = data['data'][account_id][0]['pvp']['max_planes_killed']
    
    #Userful Information
    last_battle_time = data['data'][account_id][0]['last_battle_time']
    distance = data['data'][account_id][0]['distance']
    updated_at = data['data'][account_id][0]['updated_at']
    private = data['data'][account_id][0]['private']
    #forts related
    damage_to_buildings = data['data'][account_id][0]['pvp']['damage_to_buildings']
    max_damage_dealt_to_buildings = data['data'][account_id][0]['pvp']['max_damage_dealt_to_buildings']
    suppressions_count = data['data'][account_id][0]['pvp']['suppressions_count']
    max_suppressions_count = data['data'][account_id][0]['pvp']['max_suppressions_count']
    #argos
    art_agro = data['data'][account_id][0]['pvp']['art_agro']
    torpedo_agro = data['data'][account_id][0]['pvp']['torpedo_agro']
    max_total_agro = data['data'][account_id][0]['pvp']['max_total_agro']
    #battles = data['data'][account_id][0]['battles'] #total pve + pvp battle
    #battles_since_510 = data['data'][account_id][0]['pvp']['battles_since_510']
    #battles_since_512 = data['data'][account_id][0]['pvp']['battles_since_512']
    #ship_id = data['data'][account_id][0]['ship_id']
    #account_id = data['data'][account_id][0]['account_id']
   
    #Nested Information
    main_battery = data['data'][account_id][0]['pvp']['main_battery']
    second_battery = data['data'][account_id][0]['pvp']['second_battery']
    ramming = data['data'][account_id][0]['pvp']['ramming']
    torpedoes = data['data'][account_id][0]['pvp']['torpedoes']
    aircraft = data['data'][account_id][0]['pvp']['aircraft']

account_id = "1011528019"
ship_id = "4282267344"
module_id = "3345362640"
get_ship_account(application_id,account_id,ship_id)
