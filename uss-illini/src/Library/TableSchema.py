'''
Table Schema in MySQL

Main Methods:
    {} = TABLES
'''
TABLES = {}
TABLES['random_ships_stats'] = ("""CREATE TABLE IF NOT EXISTS random_ships_stats(
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_scouting INTEGER,
        max_damage_scouting INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        ships_spotted INTEGER,
        max_ships_spotted INTEGER,
        team_capture_points INTEGER,
        capture_points INTEGER,
        dropped_capture_points INTEGER,
        team_dropped_capture_points INTEGER,
        planes_killed INTEGER,
        max_planes_killed INTEGER,
        last_battle_time INTEGER,
        distance INTEGER,
        updated_at INTEGER,
        private INTEGER,
        damage_to_buildings INTEGER,
        max_damage_dealt_to_buildings INTEGER,
        suppressions_count INTEGER,
        max_suppressions_count INTEGER,
        art_agro INTEGER,
        torpedo_agro INTEGER,
        max_total_agro INTEGER,
        battles_total INTEGER,
        battles_since_510 INTEGER,
        battles_since_512 INTEGER,
        ship_id BIGINT,
        account_id BIGINT,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        KEY(ship_id,account_id)
        );""")

TABLES['modules'] = ("""CREATE TABLE IF NOT EXISTS modules(
        name VARCHAR(50),
        type VARCHAR(50),
        type_name VARCHAR(50),
        image TEXT,
        tag VARCHAR(50),
        module_id_str VARCHAR(50),
        module_id BIGINT,
        price_credit INTEGER,
        profile TEXT,
        KEY(module_id)
        );""")

TABLES['ships'] = ("""CREATE TABLE IF NOT EXISTS ships(
        name VARCHAR(50),
        tier INTEGER,
        type VARCHAR(50),
        nation VARCHAR(50),
        price_credit INTEGER,
        price_gold INTEGER,
        ship_id_str VARCHAR(50),
        ship_id BIGINT,
        is_premium BOOLEAN,
        is_special BOOLEAN,
        description TEXT,
        mod_slots INTEGER,
        next_ships TEXT,
        upgrades TEXT,
        default_profile_engine TEXT,
        default_profile_torpedo_bomber TEXT,
        default_profile_anti_aircraft TEXT,
        default_profile_mobility TEXT,
        default_profile_hull TEXT,
        default_profile_atbas TEXT,
        default_profile_artillery TEXT,
        default_profile_torpedoes TEXT,
        default_profile_fighters TEXT,
        default_profile_fire_control TEXT,
        default_profile_weaponry TEXT,
        default_profile_battle_level_range_max INTEGER,
        default_profile_battle_level_range_min INTEGER,
        default_profile_flight_control TEXT,
        default_profile_concealment TEXT,
        default_profile_armour TEXT,
        default_profile_dive_bomber TEXT,
        images_small TEXT,
        images_medium TEXT,
        images_large TEXT,
        images_contour TEXT,
        modules_engine TEXT,
        modules_torpedo_bomber TEXT,
        modules_fighter TEXT,
        modules_hull TEXT,
        modules_artillery TEXT,
        modules_torpedoes TEXT,
        modules_fire_control TEXT,
        modules_flight_control TEXT,
        modules_dive_bomber TEXT,
        modules_tree TEXT,
        KEY (ship_id)
);""")

TABLES['clans'] = ("""CREATE TABLE IF NOT EXISTS clans(
        tag VARCHAR(50) UNIQUE,
        name VARCHAR(50) UNIQUE,
        members_count INTEGER,
        leader_id BIGINT,
        leader_name VARCHAR(50),
        creator_name VARCHAR(50),
        description TEXT,
        old_name VARCHAR(50),
        old_tag VARCHAR(50),
        renamed_at INTEGER,
        clan_id BIGINT,
        created_at INTEGER,
        updated_at INTEGER,
        is_clan_disbanded BOOLEAN,
        members_ids TEXT,
        KEY (clan_id)
);""")

TABLES['account_stats'] = ("""CREATE TABLE IF NOT EXISTS account_stats(
        nickname VARCHAR(50) UNIQUE,
        account_id BIGINT,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        battles_total INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_scouting INTEGER,
        max_damage_scouting INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        ships_spotted INTEGER,
        max_ships_spotted INTEGER,
        team_capture_points INTEGER,
        capture_points INTEGER,
        dropped_capture_points INTEGER,
        team_dropped_capture_points INTEGER,
        planes_killed INTEGER,
        max_planes_killed INTEGER,
        distance INTEGER,
        leveling_tier INTEGER,
        leveling_points INTEGER,
        private INTEGER,
        hidden_profile BOOLEAN,
        karma INTEGER,
        damage_to_buildings INTEGER,
        max_damage_dealt_to_buildings INTEGER,
        suppressions_count INTEGER,
        max_suppressions_count INTEGER,
        art_agro INTEGER,
        torpedo_agro INTEGER,
        max_total_agro INTEGER,
        last_battle_time INTEGER,
        logout_at INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        stats_updated_at INTEGER,
        battles_since_510 INTEGER,
        battles_since_512 INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        clan_id BIGINT,
        account_id_clan BIGINT,
        account_name VARCHAR(50),
        role VARCHAR(50),
        joined_at INTEGER,
        KEY (account_id)
);""")

TABLES['rank_ships_stats'] = ("""CREATE TABLE IF NOT EXISTS rank_ships_stats(
        season INTEGER,
        ship_id BIGINT,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        max_planes_killed INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        account_id BIGINT,
        KEY (account_id,ship_id,season)
);""")

TABLES['rank_account_stats'] = ("""CREATE TABLE IF NOT EXISTS rank_account_stats(
        season INTEGER,
        max_rank INTEGER,
        start_rank INTEGER,
        stars INTEGER,
        rank INTEGER,
        stage INTEGER,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        max_planes_killed INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        account_id BIGINT,
        KEY (account_id,season)
);""")

TABLES['consumables'] = ("""CREATE TABLE IF NOT EXISTS consumables(
        profile TEXT,
        name VARCHAR(50),
        price_gold INTEGER,
        image TEXT,
        consumable_id BIGINT,
        price_credit INTEGER,
        type VARCHAR(50),
        description TEXT,
        KEY (consumable_id)
);""")
