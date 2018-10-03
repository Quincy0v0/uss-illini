'''
Download Data From API return in Tuple

Main Methods:
    tuple = get_ship_encyclopedia(application_id,ship_id)
    tuple = get_module_encylopedia(application_id,module_id)
    tuple = get_ship_account(application_id,account_id,ship_id)
    tuple = get_clan_details(application_id,clan_id)
    tuple = get_clan_player(application_id,account_id)
    dict of tuple = get_rank_player(application_id,account_id) = {'1':(),'2':(),...}
    list of dict of tuple = get_rank_ship(application_id,account_id) = [{season1:(ship_id1,...),season2:(ship_id1,...)},
                                                                        {season1:(ship_id2,...),season2:(ship_id2,...)},...]

    tuple = get_account_latest(application_id,account_id)
    tuple = get_account_data(application_id,account_id)
    string = get_account_id(application_id,nickname)
    string = application_id
    tuple = get_consumables_encylopedia(application_id,consumable_id)

Indexing:
    Read Details Below

Content Related:
    Battle = Total PVP Battle
    Battle_Total = Total PVP+PVE Battle
'''
import urllib.request
import json

application_id = "b2f122ce4941da951c7b0cafa659608e"

def get_ship_encyclopedia(application_id,ship_id):
    link = "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id="+application_id+"&ship_id="+ship_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        name = data['data'][ship_id]['name'] #0
        tier = data['data'][ship_id]['tier'] #1
        type = data['data'][ship_id]['type'] #2
        nation = data['data'][ship_id]['nation'] #3
        #Useful Information
        price_credit = data['data'][ship_id]['price_credit'] #4
        price_gold = data['data'][ship_id]['price_gold'] #5
        ship_id_str = data['data'][ship_id]['ship_id_str'] #6
        #ship_id = data['data'][ship_id]['ship_id'] #7
        is_premium = data['data'][ship_id]['is_premium'] #8
        is_special = data['data'][ship_id]['is_special'] #9
        description = data['data'][ship_id]['description'] #10
        mod_slots = data['data'][ship_id]['mod_slots'] #11
        #Nested Information
        next_ships = data['data'][ship_id]['next_ships'] #12
        upgrades = data['data'][ship_id]['upgrades'] #13
        #default_profile_xx = data['data'][ship_id]['default_profile']['xx'];
        default_profile_engine = data['data'][ship_id]['default_profile']['engine'] #14
        default_profile_torpedo_bomber = data['data'][ship_id]['default_profile']['torpedo_bomber'] #15
        default_profile_anti_aircraft = data['data'][ship_id]['default_profile']['anti_aircraft'] #16
        default_profile_mobility = data['data'][ship_id]['default_profile']['mobility'] #17
        default_profile_hull = data['data'][ship_id]['default_profile']['hull'] #18
        default_profile_atbas = data['data'][ship_id]['default_profile']['atbas'] #19
        default_profile_artillery = data['data'][ship_id]['default_profile']['artillery'] #20
        default_profile_torpedoes = data['data'][ship_id]['default_profile']['torpedoes'] #21
        default_profile_fighters = data['data'][ship_id]['default_profile']['fighters'] #22
        default_profile_fire_control = data['data'][ship_id]['default_profile']['fire_control'] #23
        default_profile_weaponry = data['data'][ship_id]['default_profile']['weaponry'] #24
        default_profile_battle_level_range_max = data['data'][ship_id]['default_profile']['battle_level_range_max'] #25
        default_profile_battle_level_range_min = data['data'][ship_id]['default_profile']['battle_level_range_min'] #26
        default_profile_flight_control = data['data'][ship_id]['default_profile']['flight_control'] #27
        default_profile_concealment = data['data'][ship_id]['default_profile']['concealment'] #28
        default_profile_armour = data['data'][ship_id]['default_profile']['armour'] #29
        default_profile_dive_bomber = data['data'][ship_id]['default_profile']['dive_bomber'] #30
        #images_xx = data['data'][ship_id]['images']['xx'];
        images_small = data['data'][ship_id]['images']['small'] #31
        images_medium = data['data'][ship_id]['images']['medium'] #32
        images_large = data['data'][ship_id]['images']['large'] #33
        images_contour = data['data'][ship_id]['images']['contour'] #34
        #modules_xx = data['data'][ship_id]['modules']['xx']; returns [module_id] or []
        modules_engine = data['data'][ship_id]['modules']['engine'] #35
        modules_torpedo_bomber = data['data'][ship_id]['modules']['torpedo_bomber'] #36
        modules_fighter = data['data'][ship_id]['modules']['fighter'] #37
        modules_hull = data['data'][ship_id]['modules']['hull'] #38
        modules_artillery = data['data'][ship_id]['modules']['artillery'] #39
        modules_torpedoes = data['data'][ship_id]['modules']['torpedoes'] #40
        modules_fire_control = data['data'][ship_id]['modules']['fire_control'] #41
        modules_flight_control = data['data'][ship_id]['modules']['flight_control'] #42
        modules_dive_bomber = data['data'][ship_id]['modules']['dive_bomber'] #43
        #{module_id_1:{name:,next_modules:,is_default:,price_xp:,price_credit:,next_ships:,module_id:,type:,module_id_str} module_id_2:{...}...}
        modules_tree = data['data'][ship_id]['modules_tree'] #44

        return (name,tier,type,nation,price_credit,price_gold,ship_id_str,int(ship_id),is_premium,is_special,description,mod_slots,next_ships,upgrades,default_profile_engine,default_profile_torpedo_bomber,default_profile_anti_aircraft,default_profile_mobility,default_profile_hull,default_profile_atbas,default_profile_artillery,default_profile_torpedoes,default_profile_fighters,default_profile_fire_control,default_profile_weaponry,default_profile_battle_level_range_max,default_profile_battle_level_range_min,default_profile_flight_control,default_profile_concealment,default_profile_armour,default_profile_dive_bomber,images_small,images_medium,images_large,images_contour,modules_engine,modules_torpedo_bomber,modules_fighter,modules_hull,modules_artillery,modules_torpedoes,modules_fire_control,modules_flight_control,modules_dive_bomber,modules_tree)
    except:
        return

def get_module_encylopedia(application_id,module_id):
    link = "https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id="+application_id+"&module_id="+module_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        #Key Information
        name = data['data'][module_id]['name'] #0
        type = data['data'][module_id]['type'] #1
        type_name = list(data['data'][module_id]['profile'])[0] #2

        #Useful Information
        image = data['data'][module_id]['image'] #3
        tag = data['data'][module_id]['tag'] #4
        module_id_str = data['data'][module_id]['module_id_str'] #5
        #module_id = data['data'][module_id]['module_id'] #6
        price_credit = data['data'][module_id]['price_credit'] #7

        #Nested Information
        profile = data['data'][module_id]['profile'][list(data['data'][module_id]['profile'])[0]] #8 {attr:data,...}

        return (name,type,type_name,image,tag,module_id_str,int(module_id),price_credit,profile)
    except:
        return

def get_consumables_encylopedia(application_id,consumable_id):
    link = "https://api.worldofwarships.com/wows/encyclopedia/consumables/?application_id="+application_id+"&consumable_id="+consumable_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        profile = data['data'][consumable_id]['profile'] #0 {attr:data,...}
        name = data['data'][consumable_id]['name'] #1
        price_gold = data['data'][consumable_id]['price_gold'] #2
        image = data['data'][consumable_id]['image'] #3
        #consumable_id = data['data'][consumable_id]['consumable_id'] #4
        price_credit = data['data'][consumable_id]['price_credit'] #5
        type = data['data'][consumable_id]['type'] #6
        description = data['data'][consumable_id]['description'] #7

        return (profile,name,price_gold,image,int(consumable_id),price_credit,type,description)
    except:
        return

def get_ship_account(application_id,account_id,ship_id):
    link = "https://api.worldofwarships.com/wows/ships/stats/?application_id="+application_id+"&account_id="+account_id +"&ship_id="+ship_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        #Key Information
        wins = data['data'][account_id][0]['pvp']['wins'] #0
        draws = data['data'][account_id][0]['pvp']['draws'] #1
        losses = data['data'][account_id][0]['pvp']['losses'] #2
        battles = data['data'][account_id][0]['pvp']['battles'] #3
        survived_wins = data['data'][account_id][0]['pvp']['survived_wins'] #4
        survived_battles = data['data'][account_id][0]['pvp']['survived_battles'] #5
        xp = data['data'][account_id][0]['pvp']['xp'] #6
        max_xp = data['data'][account_id][0]['pvp']['max_xp'] #7
        frags = data['data'][account_id][0]['pvp']['frags'] #8
        max_frags_battle = data['data'][account_id][0]['pvp']['max_frags_battle'] #9
        damage_scouting = data['data'][account_id][0]['pvp']['damage_scouting'] #10
        max_damage_scouting = data['data'][account_id][0]['pvp']['max_damage_scouting'] #11
        damage_dealt = data['data'][account_id][0]['pvp']['damage_dealt'] #12
        max_damage_dealt = data['data'][account_id][0]['pvp']['max_damage_dealt'] #13
        ships_spotted = data['data'][account_id][0]['pvp']['ships_spotted'] #14
        max_ships_spotted = data['data'][account_id][0]['pvp']['max_ships_spotted'] #15
        team_capture_points = data['data'][account_id][0]['pvp']['team_capture_points'] #16
        capture_points = data['data'][account_id][0]['pvp']['capture_points'] #17
        dropped_capture_points = data['data'][account_id][0]['pvp']['dropped_capture_points'] #18
        team_dropped_capture_points = data['data'][account_id][0]['pvp']['team_dropped_capture_points'] #19
        planes_killed = data['data'][account_id][0]['pvp']['planes_killed'] #20
        max_planes_killed = data['data'][account_id][0]['pvp']['max_planes_killed'] #21

        #Userful Information
        last_battle_time = data['data'][account_id][0]['last_battle_time'] #22
        distance = data['data'][account_id][0]['distance'] #23
        updated_at = data['data'][account_id][0]['updated_at'] #24
        private = data['data'][account_id][0]['private'] #25
        #forts related
        damage_to_buildings = data['data'][account_id][0]['pvp']['damage_to_buildings'] #26
        max_damage_dealt_to_buildings = data['data'][account_id][0]['pvp']['max_damage_dealt_to_buildings'] #27
        suppressions_count = data['data'][account_id][0]['pvp']['suppressions_count'] #28
        max_suppressions_count = data['data'][account_id][0]['pvp']['max_suppressions_count'] #29
        #argos
        art_agro = data['data'][account_id][0]['pvp']['art_agro'] #30
        torpedo_agro = data['data'][account_id][0]['pvp']['torpedo_agro'] #31
        max_total_agro = data['data'][account_id][0]['pvp']['max_total_agro'] #32
        battles_total = data['data'][account_id][0]['battles'] #total pve + pvp battle #33
        battles_since_510 = data['data'][account_id][0]['pvp']['battles_since_510'] #34
        battles_since_512 = data['data'][account_id][0]['pvp']['battles_since_512'] #35
        #ship_id = data['data'][account_id][0]['ship_id'] #36
        #account_id = data['data'][account_id][0]['account_id'] #37

        #Nested Information
        #main_battery_xx = data['data'][account_id][0]['pvp']['main_battery']['xx]
        main_battery_max_frags_battle = data['data'][account_id][0]['pvp']['main_battery']['max_frags_battle'] #38
        main_battery_frags = data['data'][account_id][0]['pvp']['main_battery']['frags'] #39
        main_battery_hits = data['data'][account_id][0]['pvp']['main_battery']['hits'] #40
        main_battery_shots = data['data'][account_id][0]['pvp']['main_battery']['shots'] #41
        #second_battery_xx = data['data'][account_id][0]['pvp']['second_battery']['xx']
        second_battery_max_frags_battle = data['data'][account_id][0]['pvp']['second_battery']['max_frags_battle'] #42
        second_battery_frags = data['data'][account_id][0]['pvp']['second_battery']['frags'] #43
        second_battery_hits = data['data'][account_id][0]['pvp']['second_battery']['hits'] #44
        second_battery_shots = data['data'][account_id][0]['pvp']['second_battery']['shots'] #45
        #ramming_xx = data['data'][account_id][0]['pvp']['ramming']['xx']
        ramming_max_frags_battle = data['data'][account_id][0]['pvp']['ramming']['max_frags_battle'] #46
        ramming_frags = data['data'][account_id][0]['pvp']['ramming']['frags'] #47
        #torpedoes_xx = data['data'][account_id][0]['pvp']['torpedoes']['xx']
        torpedoes_max_frags_battle = data['data'][account_id][0]['pvp']['torpedoes']['max_frags_battle'] #48
        torpedoes_frags = data['data'][account_id][0]['pvp']['torpedoes']['frags'] #49
        torpedoes_hits = data['data'][account_id][0]['pvp']['torpedoes']['hits'] #50
        torpedoes_shots = data['data'][account_id][0]['pvp']['torpedoes']['shots'] #51
        #aircraft = data['data'][account_id][0]['pvp']['aircraft']
        aircraft_max_frags_battle = data['data'][account_id][0]['pvp']['aircraft']['max_frags_battle'] #52
        aircraft_frags = data['data'][account_id][0]['pvp']['aircraft']['frags'] #53

        return (wins,draws,losses,battles,survived_wins,survived_battles,xp,max_xp,frags,max_frags_battle,damage_scouting,max_damage_scouting,damage_dealt,max_damage_dealt,ships_spotted,max_ships_spotted,team_capture_points,capture_points,dropped_capture_points,team_dropped_capture_points,planes_killed,max_planes_killed,last_battle_time,distance,updated_at,private,damage_to_buildings,max_damage_dealt_to_buildings,suppressions_count,max_suppressions_count,art_agro,torpedo_agro,max_total_agro,battles_total,battles_since_510,battles_since_512,int(ship_id),int(account_id),main_battery_max_frags_battle,main_battery_frags,main_battery_hits,main_battery_shots,second_battery_max_frags_battle,second_battery_frags,second_battery_hits,second_battery_shots,ramming_max_frags_battle,ramming_frags,torpedoes_max_frags_battle,torpedoes_frags,torpedoes_hits,torpedoes_shots,aircraft_max_frags_battle,aircraft_frags)
    except:
        return


def get_clan_details(application_id,clan_id):
    link =  "https://api.worldofwarships.com/wows/clans/info/?clan_id=" + clan_id + "&application_id=" + application_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        #Key Information
        tag = data['data'][clan_id]['tag'] #0
        name = data['data'][clan_id]['name'] #1

        #Useful Information
        members_count = data['data'][clan_id]['members_count'] #2
        leader_id = data['data'][clan_id]['leader_id'] #3
        leader_name = data['data'][clan_id]['leader_name'] #4
        creator_name = data['data'][clan_id]['creator_name'] #5
        description = data['data'][clan_id]['description'] #6
        old_name = data['data'][clan_id]['old_name'] #7
        old_tag = data['data'][clan_id]['old_tag'] #8
        renamed_at = data['data'][clan_id]['renamed_at'] #9
        #clan_id = data['data'][clan_id]['clan_id'] #10
        created_at = data['data'][clan_id]['created_at'] #11
        updated_at = data['data'][clan_id]['updated_at'] #12
        is_clan_disbanded = data['data'][clan_id]['is_clan_disbanded'] #13

        #Nested Information
        #[id_1,id_2,...]
        members_ids = data['data'][clan_id]['members_ids'] #14

        return (tag,name,members_count,int(leader_id),leader_name,creator_name,description,old_name,old_tag,renamed_at,int(clan_id),created_at,updated_at,is_clan_disbanded,members_ids)
    except:
        return


def get_clan_player(application_id,account_id):
    link = "https://api.worldofwarships.com/wows/clans/accountinfo/?application_id="+application_id+"&account_id="+account_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    #Key Information
    clan_id = data['data'][account_id]['clan_id'] #0
    #account_id = data['data'][account_id]['account_id'] #1
    account_name = data['data'][account_id]['account_name']#2

    #Useful Information
    joined_at = data['data'][account_id]['joined_at'] #3
    role = data['data'][account_id]['role'] #4

    return (clan_id,account_id,account_name,joined_at,role)

def get_rank_player(application_id,account_id):
    link = "https://api.worldofwarships.com/wows/seasons/accountinfo/?application_id="+application_id+"&account_id="+account_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        seasons = {}
        for season in data['data'][account_id]['seasons'].keys():
            if (data['data'][account_id]['seasons'][str(season)]['rank_solo'] is not None):
                #Key Information
                #xx = data['data'][account_id]['seasons'][str(season)]['rank_info']['xx']
                max_rank = data['data'][account_id]['seasons'][str(season)]['rank_info']["max_rank"] #0
                start_rank = data['data'][account_id]['seasons'][str(season)]['rank_info']["start_rank"] #1
                stars = data['data'][account_id]['seasons'][str(season)]['rank_info']["stars"] #2
                rank = data['data'][account_id]['seasons'][str(season)]['rank_info']["rank"] #3
                stage = data['data'][account_id]['seasons'][str(season)]['rank_info']["stage"] #4

                #xx = data['data'][account_id]['seasons'][str(season)]['rank_solo']['xx']
                wins = data['data'][account_id]['seasons'][str(season)]['rank_solo']['wins'] #5
                draws = data['data'][account_id]['seasons'][str(season)]['rank_solo']['draws'] #6
                losses = data['data'][account_id]['seasons'][str(season)]['rank_solo']['losses'] #7
                battles = data['data'][account_id]['seasons'][str(season)]['rank_solo']['battles'] #8
                survived_wins = data['data'][account_id]['seasons'][str(season)]['rank_solo']['survived_wins'] #9
                survived_battles = data['data'][account_id]['seasons'][str(season)]['rank_solo']['survived_battles'] #10
                xp = data['data'][account_id]['seasons'][str(season)]['rank_solo']['xp'] #11
                max_xp = data['data'][account_id]['seasons'][str(season)]['rank_solo']['max_xp'] #12
                frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['frags'] #13
                max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['max_frags_battle'] #14
                damage_dealt = data['data'][account_id]['seasons'][str(season)]['rank_solo']['damage_dealt'] #15
                max_damage_dealt = data['data'][account_id]['seasons'][str(season)]['rank_solo']['max_damage_dealt'] #16
                max_planes_killed = data['data'][account_id]['seasons'][str(season)]['rank_solo']['max_planes_killed'] #17

                #Nested Information
                #main_battery_xx = data['data'][account_id]['seasons'][str(season)]['rank_solo']['main_battery']['xx]
                main_battery_max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['main_battery']['max_frags_battle'] #18
                main_battery_frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['main_battery']['frags'] #19
                main_battery_hits = data['data'][account_id]['seasons'][str(season)]['rank_solo']['main_battery']['hits'] #20
                main_battery_shots = data['data'][account_id]['seasons'][str(season)]['rank_solo']['main_battery']['shots'] #21
                #second_battery_xx = data['data'][account_id]['seasons'][str(season)]['rank_solo']['second_battery']['xx']
                second_battery_max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['second_battery']['max_frags_battle'] #22
                second_battery_frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['second_battery']['frags'] #23
                second_battery_hits = data['data'][account_id]['seasons'][str(season)]['rank_solo']['second_battery']['hits'] #24
                second_battery_shots = data['data'][account_id]['seasons'][str(season)]['rank_solo']['second_battery']['shots'] #25
                #ramming_xx = data['data'][account_id]['seasons'][str(season)]['rank_solo']['ramming']['xx']
                ramming_max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['ramming']['max_frags_battle'] #26
                ramming_frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['ramming']['frags'] #27
                #torpedoes_xx = data['data'][account_id]['seasons'][str(season)]['rank_solo']['torpedoes']['xx']
                torpedoes_max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['torpedoes']['max_frags_battle'] #28
                torpedoes_frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['torpedoes']['frags'] #29
                torpedoes_hits = data['data'][account_id]['seasons'][str(season)]['rank_solo']['torpedoes']['hits'] #30
                torpedoes_shots = data['data'][account_id]['seasons'][str(season)]['rank_solo']['torpedoes']['shots'] #31
                #aircraft = data['data'][account_id]['seasons'][str(season)]['rank_solo']['aircraft']
                aircraft_max_frags_battle = data['data'][account_id]['seasons'][str(season)]['rank_solo']['aircraft']['max_frags_battle'] #32
                aircraft_frags = data['data'][account_id]['seasons'][str(season)]['rank_solo']['aircraft']['frags'] #33

                #account_id = account_id #34

                seasons[season] = (max_rank,start_rank,stars,rank,stage,wins,draws,losses,battles,survived_wins,survived_battles,xp,max_xp,frags,max_frags_battle,damage_dealt,max_damage_dealt,max_planes_killed,main_battery_max_frags_battle,main_battery_frags,main_battery_hits,main_battery_shots,second_battery_max_frags_battle,second_battery_frags,second_battery_hits,second_battery_shots,ramming_max_frags_battle,ramming_frags,torpedoes_max_frags_battle,torpedoes_frags,torpedoes_hits,torpedoes_shots,aircraft_max_frags_battle,aircraft_frags,int(account_id))
            else:
                seasons[season] = ()
        return seasons
    except:
        return

def get_rank_ship(application_id,account_id):
    link = "https://api.worldofwarships.com/wows/seasons/shipstats/?application_id="+application_id+"&account_id="+account_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        ships = []
        for ship in data['data'][account_id]:
            ship_id = ship['ship_id'] #0
            for season in ship['seasons']:
                #Key Information
                #xx = ship['seasons'][season]['rank_solo']['rank_solo']['xx']
                wins = ship['seasons'][season]['rank_solo']['wins'] #1
                draws = ship['seasons'][season]['rank_solo']['draws'] #2
                losses = ship['seasons'][season]['rank_solo']['losses'] #3
                battles = ship['seasons'][season]['rank_solo']['battles'] #4
                survived_wins = ship['seasons'][season]['rank_solo']['survived_wins'] #5
                survived_battles = ship['seasons'][season]['rank_solo']['survived_battles'] #6
                xp = ship['seasons'][season]['rank_solo']['xp'] #7
                max_xp = ship['seasons'][season]['rank_solo']['max_xp'] #8
                frags = ship['seasons'][season]['rank_solo']['frags'] #9
                max_frags_battle = ship['seasons'][season]['rank_solo']['max_frags_battle'] #10
                damage_dealt = ship['seasons'][season]['rank_solo']['damage_dealt'] #11
                max_damage_dealt = ship['seasons'][season]['rank_solo']['max_damage_dealt'] #12
                max_planes_killed = ship['seasons'][season]['rank_solo']['max_planes_killed'] #13

                #Nested Information
                #main_battery_xx = ship['seasons'][season]['rank_solo']['main_battery']['xx]
                main_battery_max_frags_battle = ship['seasons'][season]['rank_solo']['main_battery']['max_frags_battle'] #14
                main_battery_frags = ship['seasons'][season]['rank_solo']['main_battery']['frags'] #15
                main_battery_hits = ship['seasons'][season]['rank_solo']['main_battery']['hits'] #26
                main_battery_shots = ship['seasons'][season]['rank_solo']['main_battery']['shots'] #27
                #second_battery_xx = ship['seasons'][season]['rank_solo']['second_battery']['xx']
                second_battery_max_frags_battle = ship['seasons'][season]['rank_solo']['second_battery']['max_frags_battle'] #28
                second_battery_frags = ship['seasons'][season]['rank_solo']['second_battery']['frags'] #29
                second_battery_hits = ship['seasons'][season]['rank_solo']['second_battery']['hits'] #30
                second_battery_shots = ship['seasons'][season]['rank_solo']['second_battery']['shots'] #31
                #ramming_xx = ship['seasons'][season]['rank_solo']['ramming']['xx']
                ramming_max_frags_battle = ship['seasons'][season]['rank_solo']['ramming']['max_frags_battle'] #32
                ramming_frags = ship['seasons'][season]['rank_solo']['ramming']['frags'] #33
                #torpedoes_xx = ship['seasons'][season]['rank_solo']['torpedoes']['xx']
                torpedoes_max_frags_battle = ship['seasons'][season]['rank_solo']['torpedoes']['max_frags_battle'] #34
                torpedoes_frags = ship['seasons'][season]['rank_solo']['torpedoes']['frags'] #35
                torpedoes_hits = ship['seasons'][season]['rank_solo']['torpedoes']['hits'] #36
                torpedoes_shots = ship['seasons'][season]['rank_solo']['torpedoes']['shots'] #37
                #aircraft = ship['seasons'][season]['rank_solo']['aircraft']
                aircraft_max_frags_battle = ship['seasons'][season]['rank_solo']['aircraft']['max_frags_battle'] #38
                aircraft_frags = ship['seasons'][season]['rank_solo']['aircraft']['frags'] #39

                #account_id = account_id #40

                ships.append({season:(int(ship_id),wins,draws,losses,battles,survived_wins,survived_battles,xp,max_xp,frags,max_frags_battle,damage_dealt,max_damage_dealt,max_planes_killed,main_battery_max_frags_battle,main_battery_frags,main_battery_hits,main_battery_shots,second_battery_max_frags_battle,second_battery_frags,second_battery_hits,second_battery_shots,ramming_max_frags_battle,ramming_frags,torpedoes_max_frags_battle,torpedoes_frags,torpedoes_hits,torpedoes_shots,aircraft_max_frags_battle,aircraft_frags,int(account_id))})

        return ships
    except:
        return

def get_account_latest(application_id,account_id):
    link = "https://api.worldofwarships.com/wows/account/statsbydate/?application_id="+application_id+"&account_id="+account_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        date = [i for i in data['data'][account_id]['pvp'].keys()][0]

        wins = data['data'][account_id]['pvp'][date]['wins'] #0
        battles = data['data'][account_id]['pvp'][date]['battles'] #1
        capture_points = data['data'][account_id]['pvp'][date]['capture_points'] #2
        #account_id = data['data'][account_id]['pvp'][date]['account_id'] #3
        max_xp = data['data'][account_id]['pvp'][date]['max_xp'] #4
        planes_killed = data['data'][account_id]['pvp'][date]['planes_killed'] #5
        damage_dealt = data['data'][account_id]['pvp'][date]['damage_dealt'] #6
        battle_type = data['data'][account_id]['pvp'][date]['battle_type'] #7
        #date = data['data'][account_id]['pvp'][today]['date'] #8
        xp = data['data'][account_id]['pvp'][date]['xp'] #9
        frags = data['data'][account_id]['pvp'][date]['frags'] #10
        survived_battles = data['data'][account_id]['pvp'][date]['survived_battles'] #11
        dropped_capture_points = data['data'][account_id]['pvp'][date]['dropped_capture_points'] #12

        return (wins,battles,capture_points,int(account_id),max_xp,planes_killed,damage_dealt,battle_type,date,xp,frags,survived_battles,dropped_capture_points)
    except:
        return

def get_account_data(application_id,account_id):
    link = "https://api.worldofwarships.com/wows/account/info/?application_id="+application_id+"&account_id="+account_id
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)

    try:
        #Key Information
        nickname = data['data'][account_id]['nickname'] #0
        #account_id = data['data'][account_id]['account_id'] #1
        wins = data['data'][account_id]['statistics']['pvp']['wins'] #2
        draws = data['data'][account_id]['statistics']['pvp']['draws'] #3
        losses = data['data'][account_id]['statistics']['pvp']['losses'] #4
        battles = data['data'][account_id]['statistics']['pvp']['battles'] #5 pvp
        battles_total  = data['data'][account_id]['statistics']['battles'] #6 total
        survived_wins = data['data'][account_id]['statistics']['pvp']['survived_wins'] #7
        survived_battles = data['data'][account_id]['statistics']['pvp']['survived_battles'] #8
        xp = data['data'][account_id]['statistics']['pvp']['xp'] #9
        max_xp = data['data'][account_id]['statistics']['pvp']['max_xp'] #10
        frags = data['data'][account_id]['statistics']['pvp']['frags'] #11
        max_frags_battle = data['data'][account_id]['statistics']['pvp']['max_frags_battle'] #12
        damage_scouting = data['data'][account_id]['statistics']['pvp']['damage_scouting'] #13
        max_damage_scouting = data['data'][account_id]['statistics']['pvp']['max_damage_scouting'] #14
        damage_dealt = data['data'][account_id]['statistics']['pvp']['damage_dealt'] #15
        max_damage_dealt = data['data'][account_id]['statistics']['pvp']['max_damage_dealt'] #16
        ships_spotted = data['data'][account_id]['statistics']['pvp']['ships_spotted'] #17
        max_ships_spotted = data['data'][account_id]['statistics']['pvp']['max_ships_spotted'] #18
        team_capture_points = data['data'][account_id]['statistics']['pvp']['team_capture_points'] #19
        capture_points = data['data'][account_id]['statistics']['pvp']['capture_points'] #20
        dropped_capture_points = data['data'][account_id]['statistics']['pvp']['dropped_capture_points'] #21
        team_dropped_capture_points = data['data'][account_id]['statistics']['pvp']['team_dropped_capture_points'] #22
        planes_killed = data['data'][account_id]['statistics']['pvp']['planes_killed'] #23
        max_planes_killed = data['data'][account_id]['statistics']['pvp']['max_planes_killed'] #24
        distance = data['data'][account_id]['statistics']['distance'] #25

        #Userful Information
        leveling_tier = data['data'][account_id]['leveling_tier'] #26
        leveling_points = data['data'][account_id]['leveling_points'] #27
        private = data['data'][account_id]['private'] #28
        hidden_profile = data['data'][account_id]['hidden_profile'] #29
        karma = data['data'][account_id]['karma'] #30
        #forts related
        damage_to_buildings = data['data'][account_id]['statistics']['pvp']['damage_to_buildings'] #31
        max_damage_dealt_to_buildings = data['data'][account_id]['statistics']['pvp']['max_damage_dealt_to_buildings'] #32
        suppressions_count = data['data'][account_id]['statistics']['pvp']['suppressions_count'] #33
        max_suppressions_count = data['data'][account_id]['statistics']['pvp']['max_suppressions_count'] #34
        #argos
        art_agro = data['data'][account_id]['statistics']['pvp']['art_agro'] #35
        torpedo_agro = data['data'][account_id]['statistics']['pvp']['torpedo_agro'] #36
        max_total_agro = data['data'][account_id]['statistics']['pvp']['max_total_agro'] #37
        #Time based
        last_battle_time = data['data'][account_id]['last_battle_time'] #38
        logout_at = data['data'][account_id]['logout_at'] #39
        created_at = data['data'][account_id]['created_at'] #40
        updated_at = data['data'][account_id]['updated_at'] #41
        stats_updated_at = data['data'][account_id]['stats_updated_at'] #42
        battles_since_510 = data['data'][account_id]['statistics']['pvp']['battles_since_510'] #43
        battles_since_512 = data['data'][account_id]['statistics']['pvp']['battles_since_512'] #44

        #Nested Information
        #main_battery_xx = data['data'][account_id]['statistics']['pvp']['main_battery']['xx]
        main_battery_max_frags_battle = data['data'][account_id]['statistics']['pvp']['main_battery']['max_frags_battle'] #45
        main_battery_frags = data['data'][account_id]['statistics']['pvp']['main_battery']['frags'] #46
        main_battery_hits = data['data'][account_id]['statistics']['pvp']['main_battery']['hits'] #47
        main_battery_shots = data['data'][account_id]['statistics']['pvp']['main_battery']['shots'] #48
        #second_battery_xx = data['data'][account_id]['statistics']['pvp']['second_battery']['xx']
        second_battery_max_frags_battle = data['data'][account_id]['statistics']['pvp']['second_battery']['max_frags_battle'] #49
        second_battery_frags = data['data'][account_id]['statistics']['pvp']['second_battery']['frags'] #50
        second_battery_hits = data['data'][account_id]['statistics']['pvp']['second_battery']['hits'] #51
        second_battery_shots = data['data'][account_id]['statistics']['pvp']['second_battery']['shots'] #52
        #ramming_xx = data['data'][account_id]['statistics']['pvp']['ramming']['xx']
        ramming_max_frags_battle = data['data'][account_id]['statistics']['pvp']['ramming']['max_frags_battle'] #53
        ramming_frags = data['data'][account_id]['statistics']['pvp']['ramming']['frags'] #54
        #torpedoes_xx = data['data'][account_id]['statistics']['pvp']['torpedoes']['xx']
        torpedoes_max_frags_battle = data['data'][account_id]['statistics']['pvp']['torpedoes']['max_frags_battle'] #55
        torpedoes_frags = data['data'][account_id]['statistics']['pvp']['torpedoes']['frags'] #56
        torpedoes_hits = data['data'][account_id]['statistics']['pvp']['torpedoes']['hits'] #57
        torpedoes_shots = data['data'][account_id]['statistics']['pvp']['torpedoes']['shots'] #58
        #aircraft = data['data'][account_id]['statistics']['pvp']['aircraft']
        aircraft_max_frags_battle = data['data'][account_id]['statistics']['pvp']['aircraft']['max_frags_battle'] #59
        aircraft_frags = data['data'][account_id]['statistics']['pvp']['aircraft']['frags'] #60

        return (nickname,int(account_id),wins,draws,losses,battles,battles_total,survived_wins,survived_battles,xp,max_xp,frags,max_frags_battle,damage_scouting,max_damage_scouting,damage_dealt,max_damage_dealt,ships_spotted,max_ships_spotted,team_capture_points,capture_points,dropped_capture_points,team_dropped_capture_points,planes_killed,max_planes_killed,distance,leveling_tier,leveling_points,private,hidden_profile,karma,damage_to_buildings,max_damage_dealt_to_buildings,suppressions_count,max_suppressions_count,art_agro,torpedo_agro,max_total_agro,last_battle_time,logout_at,created_at,updated_at,stats_updated_at,battles_since_510,battles_since_512,main_battery_max_frags_battle,main_battery_frags,main_battery_hits,main_battery_shots,second_battery_max_frags_battle,second_battery_frags,second_battery_hits,second_battery_shots,ramming_max_frags_battle,ramming_frags,torpedoes_max_frags_battle,torpedoes_frags,torpedoes_hits,torpedoes_shots,aircraft_max_frags_battle,aircraft_frags)
    except:
        return

def get_account_id(application_id,nickname):
    link = "https://api.worldofwarships.com/wows/account/list/?application_id="+application_id+"&search="+nickname
    resp = urllib.request.urlopen(link).read()
    data = json.loads(resp)
    try:
        return data['data'][0]['account_id']
    except:
        return
