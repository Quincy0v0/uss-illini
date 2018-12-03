var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var cors = require("cors");

var pool = require('./MysqlPool');

var con = mysql.createConnection({
    host: "localhost",
    user: "ussillini_usserikaze",
    password: "219749ajfcg",
    database: "ussillini_ussillini"
});

/* GET users listing. */
router.post('/ships', function(req, res) {
    ship_id = req.body.ship_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        connection.query("SELECT * FROM ships WHERE ship_id = '" + ship_id + "';",function(error,results,fields) {
            connection.release();
            if(error) throw error;
            var data = results[0];
            res.json([data]);
        });
    });
});

/* Query ship information by name. */
router.post('/name', function(req, res) {
    ship_name = req.body.name;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        connection.query("SELECT * FROM ships WHERE ship_name = '" + ship_name + "';",function(error,results,fields) {
            connection.release();
            if(error) throw error;
            var data = results[0];
            res.json([data]);
        });
    });
});

router.post('/insert',function(req, res){
    var ship_id = String(req.body.ship_id);
    // console.log("insert ship!!!!");
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    request({
        url: "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=" + application_id + "&ship_id=" + ship_id,
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode === 200) {
            //Key Information
            var name = data['data'][ship_id]['name']; //0
            var tier = data['data'][ship_id]['tier']; //1
            var type = data['data'][ship_id]['type']; //2
            var nation = data['data'][ship_id]['nation']; //3
            //Useful Information
            var price_credit = data['data'][ship_id]['price_credit']; //4
            var price_gold = data['data'][ship_id]['price_gold']; //5
            var ship_id_str = data['data'][ship_id]['ship_id_str']; //6
            //ship_id = data['data'][ship_id]['ship_id']; //7
            var is_premium = data['data'][ship_id]['is_premium']; //8
            var is_special = data['data'][ship_id]['is_special']; //9
            var description = data['data'][ship_id]['description']; //10
            var mod_slots = data['data'][ship_id]['mod_slots']; //11
            //Nested Information
            var next_ships = data['data'][ship_id]['next_ships']; //12
            var upgrades = data['data'][ship_id]['upgrades']; //13
            //default_profile_xx = data['data'][ship_id]['default_profile']['xx'];
            var default_profile_engine = data['data'][ship_id]['default_profile']['engine']; //14
            var default_profile_torpedo_bomber = data['data'][ship_id]['default_profile']['torpedo_bomber']; //15
            var default_profile_anti_aircraft = data['data'][ship_id]['default_profile']['anti_aircraft']; //16
            var default_profile_mobility = data['data'][ship_id]['default_profile']['mobility']; //17
            var default_profile_hull = data['data'][ship_id]['default_profile']['hull']; //18
            var default_profile_atbas = data['data'][ship_id]['default_profile']['atbas']; //19
            var default_profile_artillery = data['data'][ship_id]['default_profile']['artillery']; //20
            var default_profile_torpedoes = data['data'][ship_id]['default_profile']['torpedoes']; //21
            var default_profile_fighters = data['data'][ship_id]['default_profile']['fighters']; //22
            var default_profile_fire_control = data['data'][ship_id]['default_profile']['fire_control']; //23
            var default_profile_weaponry = data['data'][ship_id]['default_profile']['weaponry']; //24
            var default_profile_battle_level_range_max = data['data'][ship_id]['default_profile']['battle_level_range_max']; //25
            var default_profile_battle_level_range_min = data['data'][ship_id]['default_profile']['battle_level_range_min']; //26
            var default_profile_flight_control = data['data'][ship_id]['default_profile']['flight_control']; //27
            var default_profile_concealment = data['data'][ship_id]['default_profile']['concealment']; //28
            var default_profile_armour = data['data'][ship_id]['default_profile']['armour']; //29
            var default_profile_dive_bomber = data['data'][ship_id]['default_profile']['dive_bomber']; //30
            //images_xx = data['data'][ship_id]['images']['xx'];
            var images_small = data['data'][ship_id]['images']['small']; //31
            var images_medium = data['data'][ship_id]['images']['medium']; //32
            var images_large = data['data'][ship_id]['images']['large']; //33
            var images_contour = data['data'][ship_id]['images']['contour']; //34
            // var modules_xx = data['data'][ship_id]['modules']['xx']; returns [module_id] or []
            var modules_engine = data['data'][ship_id]['modules']['engine']; //35
            var modules_torpedo_bomber = data['data'][ship_id]['modules']['torpedo_bomber']; //36
            var modules_fighter = data['data'][ship_id]['modules']['fighter']; //37
            var modules_hull = data['data'][ship_id]['modules']['hull']; //38
            var modules_artillery = data['data'][ship_id]['modules']['artillery']; //39
            var modules_torpedoes = data['data'][ship_id]['modules']['torpedoes']; //40
            var modules_fire_control = data['data'][ship_id]['modules']['fire_control']; //41
            var modules_flight_control = data['data'][ship_id]['modules']['flight_control']; //42
            var modules_dive_bomber = data['data'][ship_id]['modules']['dive_bomber']; //43
            //{module_id_1:{name:,next_modules:,is_default:,price_xp:,price_credit:,next_ships:,module_id:,type:,module_id_str} module_id_2:{...}...}
            var modules_tree = data['data'][ship_id]['modules_tree']; //44

            var ship = [];
            ship.push(name, tier, type, nation, price_credit, price_gold, ship_id_str, ship_id, is_premium, is_special, description, mod_slots, next_ships, upgrades, default_profile_engine, default_profile_torpedo_bomber, default_profile_anti_aircraft, default_profile_mobility, default_profile_hull, default_profile_atbas, default_profile_artillery, default_profile_torpedoes, default_profile_fighters, default_profile_fire_control, default_profile_weaponry, default_profile_battle_level_range_max, default_profile_battle_level_range_min, default_profile_flight_control, default_profile_concealment, default_profile_armour, default_profile_dive_bomber, images_small, images_medium, images_large, images_contour, modules_engine, modules_torpedo_bomber, modules_fighter, modules_hull, modules_artillery, modules_torpedoes, modules_fire_control, modules_flight_control, modules_dive_bomber, modules_tree);

            var command = "INSERT INTO ships VALUES(";
            for (var value in ship) {
                if (!ship[value] || ship[value] == "null") {
                    command += "NULL,"
                } else if (typeof(ship[value]) === "string") {
                    command += "'"
                    command += ship[value].split("'").join('');
                    command += "',"
                } else if (ship[value] instanceof Array) {
                    command += '"['
                    for (var i in ship[value]) {
                        command += String(ship[value][i]).split('"').join('');
                        command += ','
                    }
                    command.slice(0, -1);
                    command += ']",'
                } else if (typeof(ship[value]) === "object") {
                    command += '"'
                    command += JSON.stringify(ship[value]).split('"').join('');
                    command += '",'
                } else {
                    command += String(ship[value]) + ","
                }
            }
            command = command.slice(0, -1);
            command += ");";

            // console.log("command");
            // console.log(command);
            pool.getConnection(function(error, connection){
                if (error){
                    connection.release();
                    throw error;
                }
                // console.log("command");
                // console.log(command);
                connection.query(command,function(error,results,fields) {
                    connection.release();
                    if(error) throw error;
                    var data = results[0];
                    res.json([data]);
                });
            });
        }else{
            console.log(error);
        }
    })
});

router.post('/update',function(req,res){
    var ship_id = String(req.body.ship_id);
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    request({
        url: "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=" + application_id + "&ship_id=" + ship_id,
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode === 200) {
          //Key Information
          var name = data['data'][ship_id]['name']; //0
          var tier = data['data'][ship_id]['tier']; //1
          var type = data['data'][ship_id]['type']; //2
          var nation = data['data'][ship_id]['nation']; //3
          //Useful Information
          var price_credit = data['data'][ship_id]['price_credit']; //4
          var price_gold = data['data'][ship_id]['price_gold']; //5
          var ship_id_str = data['data'][ship_id]['ship_id_str']; //6
          //ship_id = data['data'][ship_id]['ship_id']; //7
          var is_premium = data['data'][ship_id]['is_premium']; //8
          var is_special = data['data'][ship_id]['is_special']; //9
          var description = data['data'][ship_id]['description']; //10
          var mod_slots = data['data'][ship_id]['mod_slots']; //11
          //Nested Information
          var next_ships = data['data'][ship_id]['next_ships']; //12
          var upgrades = data['data'][ship_id]['upgrades']; //13
          //default_profile_xx = data['data'][ship_id]['default_profile']['xx'];
          var default_profile_engine = data['data'][ship_id]['default_profile']['engine']; //14
          var default_profile_torpedo_bomber = data['data'][ship_id]['default_profile']['torpedo_bomber']; //15
          var default_profile_anti_aircraft = data['data'][ship_id]['default_profile']['anti_aircraft']; //16
          var default_profile_mobility = data['data'][ship_id]['default_profile']['mobility']; //17
          var default_profile_hull = data['data'][ship_id]['default_profile']['hull']; //18
          var default_profile_atbas = data['data'][ship_id]['default_profile']['atbas']; //19
          var default_profile_artillery = data['data'][ship_id]['default_profile']['artillery']; //20
          var default_profile_torpedoes = data['data'][ship_id]['default_profile']['torpedoes']; //21
          var default_profile_fighters = data['data'][ship_id]['default_profile']['fighters']; //22
          var default_profile_fire_control = data['data'][ship_id]['default_profile']['fire_control']; //23
          var default_profile_weaponry = data['data'][ship_id]['default_profile']['weaponry']; //24
          var default_profile_battle_level_range_max = data['data'][ship_id]['default_profile']['battle_level_range_max']; //25
          var default_profile_battle_level_range_min = data['data'][ship_id]['default_profile']['battle_level_range_min']; //26
          var default_profile_flight_control = data['data'][ship_id]['default_profile']['flight_control']; //27
          var default_profile_concealment = data['data'][ship_id]['default_profile']['concealment']; //28
          var default_profile_armour = data['data'][ship_id]['default_profile']['armour']; //29
          var default_profile_dive_bomber = data['data'][ship_id]['default_profile']['dive_bomber']; //30
          //images_xx = data['data'][ship_id]['images']['xx'];
          var images_small = data['data'][ship_id]['images']['small']; //31
          var images_medium = data['data'][ship_id]['images']['medium']; //32
          var images_large = data['data'][ship_id]['images']['large']; //33
          var images_contour = data['data'][ship_id]['images']['contour']; //34
          // var modules_xx = data['data'][ship_id]['modules']['xx']; returns [module_id] or []
          var modules_engine = data['data'][ship_id]['modules']['engine']; //35
          var modules_torpedo_bomber = data['data'][ship_id]['modules']['torpedo_bomber']; //36
          var modules_fighter = data['data'][ship_id]['modules']['fighter']; //37
          var modules_hull = data['data'][ship_id]['modules']['hull']; //38
          var modules_artillery = data['data'][ship_id]['modules']['artillery']; //39
          var modules_torpedoes = data['data'][ship_id]['modules']['torpedoes']; //40
          var modules_fire_control = data['data'][ship_id]['modules']['fire_control']; //41
          var modules_flight_control = data['data'][ship_id]['modules']['flight_control']; //42
          var modules_dive_bomber = data['data'][ship_id]['modules']['dive_bomber']; //43
          //{module_id_1:{name:,next_modules:,is_default:,price_xp:,price_credit:,next_ships:,module_id:,type:,module_id_str} module_id_2:{...}...}
          var modules_tree = data['data'][ship_id]['modules_tree']; //44

          var ship = [];
          ship.push(name, tier, type, nation, price_credit, price_gold, ship_id_str, ship_id, is_premium, is_special, description, mod_slots, next_ships, upgrades, default_profile_engine, default_profile_torpedo_bomber, default_profile_anti_aircraft, default_profile_mobility, default_profile_hull, default_profile_atbas, default_profile_artillery, default_profile_torpedoes, default_profile_fighters, default_profile_fire_control, default_profile_weaponry, default_profile_battle_level_range_max, default_profile_battle_level_range_min, default_profile_flight_control, default_profile_concealment, default_profile_armour, default_profile_dive_bomber, images_small, images_medium, images_large, images_contour, modules_engine, modules_torpedo_bomber, modules_fighter, modules_hull, modules_artillery, modules_torpedoes, modules_fire_control, modules_flight_control, modules_dive_bomber, modules_tree);

           var command = "INSERT INTO ships VALUES(";
           for (var value in ship) {
             if (!ship[value] || ship[value] == "null") {
               command += "NULL,"
             } else if (typeof(ship[value]) === "string") {
               command += "'"
               command += ship[value].split("'").join('');
               command += "',"
             } else if (ship[value] instanceof Array) {
               command += '"['
               for (var i in ship[value]) {
                 command += String(ship[value][i]).split('"').join('');
                 command += ','
               }
               command.slice(0, -1);
               command += ']",'
             } else if (typeof(ship[value]) === "object") {
               command += '"'
               command += JSON.stringify(ship[value]).split('"').join('');
               command += '",'
             } else {
               command += String(ship[value]) + ","
             }
           }
           command = command.slice(0, -1);
           command += ");";

            pool.getConnection(function(error, connection){
                if (error){
                    throw error;
                }

                connection.query("DELETE FROM ships WHERE ship_id = '" + ship_id + "';", function(err, result) {
                    if (err) throw err;
                    //connection.release();
                    console.log("1 record updated");
                });

                connection.query(command,function(error,results,fields) {
                    connection.release();
                    if(error) throw error;
                    var data = results[0];
                    res.json([data]);
                });
            });
       }else{
           console.log(error);
       }
   })
});

router.post('/update_val',function(req,res){
    var ship_id = String(req.body.ship_id);
    var colname = String(req.body.colname);
    var colval  = String(req.body.colval);

    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        var command = "UPDATE ships SET name ='" + colval + "' WHERE ship_id = '" + ship_id + "' ;";
        connection.query(command, function(error,result,fields) {
            connection.release();
            if(error) throw error;
            var data = result[0];
            res.json([data]);
        });
    });

});


router.post('/delete', function(req, res){
    var ship_id = String(req.body.ship_id);

    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        var command = "DELETE FROM ships WHERE ship_id = '" + ship_id + "';";
        connection.query(command, function(error, results, fields) {
            if(error) throw error;
            connection.release();
            var data = results[0];
            res.json([data]);
        });
    });

});


router.post('/listAllShips', function(req, res) {
    // ship_id = req.body.ship_id;
    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        connection.query("SELECT name, ship_id FROM ships;",function(error,results,fields) {
            if(error) throw error;
            connection.release();
            var data = results;
            var ret = {};
            for(var i = 0; i < data.length; i++)
            {
                ret[data[i]["name"]] = data[i]["ship_id"];
            }
            res.json(ret);
        });
    });

});


router.post('/radar', function(req, res){
    var account_id = String(req.body.account_id);
    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        var command = "SELECT avg((meKills-totalKills)/(stdtotalKills)) AS Kills, " +
            "avg((meSurvival-totalSurvival)/(stdtotalSurvival)) " +
            "AS Survival, avg((meWins-totalWins)/(stdtotalWins)) " +
            "AS Wins, avg((meDamage-totalDamage)/(stdtotalDamage)) " +
            "AS Damage, avg((meObjective-totalObjective)/(stdtotalObjective)) " +
            "AS Objective FROM (SELECT ship_id, avg(frags/battles) " +
            "AS meKills, avg(survived_battles/battles) " +
            "AS meSurvival, avg(wins/battles) " +
            "AS meWins, avg(damage_dealt/battles) " +
            "AS meDamage, avg(capture_points/battles) " +
            "AS meObjective " +
            "FROM random_ships_stats " +
            "WHERE account_id = '"+account_id+"' " +
            "GROUP BY ship_id) " +
            "AS me " +
            "INNER JOIN " +
            "(SELECT ship_id, avg(frags/battles) " +
            "AS totalKills, avg(survived_battles/battles) " +
            "AS totalSurvival, avg(wins/battles) " +
            "AS totalWins, avg(damage_dealt/battles) " +
            "AS totalDamage, avg(capture_points/battles) " +
            "AS totalObjective, std(frags/battles) " +
            "AS stdtotalKills, std(survived_battles/battles) " +
            "AS stdtotalSurvival, std(wins/battles) " +
            "AS stdtotalWins, std(damage_dealt/battles) " +
            "AS stdtotalDamage, std(capture_points/battles) " +
            "AS stdtotalObjective " +
            "FROM random_ships_stats " +
            "GROUP BY ship_id) AS total " +
            "ON me.ship_id = total.ship_id;";
        connection.query(command, function(error, results, fields) {
            if(error) throw error;
            connection.release();
            var data = results[0];
            res.json([data]);
        });
    });

});

router.post('/player', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        connection.query("SELECT * FROM account_stats INNER JOIN clans on account_stats.clan_id = clans.clan_id WHERE account_id = '" + account_id + "';",function(error,results,fields) {
            connection.release();
            if(error) throw error;
            var data = results[0];
            res.json([data]);
        });
    });
});

router.post('/playerShip', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        connection.query("SELECT DISTINCT * FROM random_ships_stats WHERE account_id = '" + account_id + "';",function(error,results,fields) {
            connection.release();
            if(error) throw error;
            res.json(results);
        });
    });
});

router.post('/playerShips', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        command = "SELECT * FROM (SELECT DISTINCT * FROM random_ships_stats AS t1 INNER JOIN (SELECT DISTINCT ship_id AS ship_id_key, name, tier, nation, type, images_small, images_medium, images_large, images_contour FROM ships) AS t2 ON t1.ship_id = t2.ship_id_key WHERE account_id = '"+ account_id +"') AS t3 INNER JOIN (SELECT me.ship_id, avg((meKills-totalKills)/(stdtotalKills)) AS Kills, avg((meSurvival-totalSurvival)/(stdtotalSurvival)) AS Survival, avg((meWins-totalWins)/(stdtotalWins)) AS Wins, avg((meDamage-totalDamage)/(stdtotalDamage)) AS Damage, avg((meObjective-totalObjective)/(stdtotalObjective)) AS Objective FROM (SELECT ship_id, avg(frags/battles) AS meKills, avg(survived_battles/battles) AS meSurvival, avg(wins/battles) AS meWins, avg(damage_dealt/battles) AS meDamage, avg(capture_points/battles) AS meObjective FROM random_ships_stats WHERE account_id = '"+ account_id +"' GROUP BY ship_id) AS me INNER JOIN (SELECT ship_id, avg(frags/battles) AS totalKills, avg(survived_battles/battles) AS totalSurvival, avg(wins/battles) AS totalWins, avg(damage_dealt/battles) AS totalDamage, avg(capture_points/battles) AS totalObjective, std(frags/battles) AS stdtotalKills, std(survived_battles/battles) AS stdtotalSurvival, std(wins/battles) AS stdtotalWins, std(damage_dealt/battles) AS stdtotalDamage, std(capture_points/battles) AS stdtotalObjective FROM random_ships_stats GROUP BY ship_id) AS total ON me.ship_id = total.ship_id GROUP BY ship_id) AS t4 ON t3.ship_id = t4.ship_id;"
        connection.query(command,function(error,results,fields) {
            connection.release();
            if(error) throw error;
            res.json(results);
        });
    });
});

router.post('/playerShipInfo', function(req, res) {
    var ship_id = req.body.ship_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        connection.query("SELECT * FROM ships WHERE ship_id = '" + ship_id + "';",function(error,results,fields) {
            connection.release();
            if(error) throw error;
            res.json([results[0]]);
        });
    });
});

router.post('/playerShipScore', function(req, res) {
    var account_id = req.body.account_id;
    var ship_id = req.body.ship_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        command = "SELECT avg((meKills-totalKills)/(stdtotalKills)) AS Kills, " +
            "avg((meSurvival-totalSurvival)/(stdtotalSurvival)) " +
            "AS Survival, avg((meWins-totalWins)/(stdtotalWins)) " +
            "AS Wins, avg((meDamage-totalDamage)/(stdtotalDamage)) " +
            "AS Damage, avg((meObjective-totalObjective)/(stdtotalObjective)) " +
            "AS Objective FROM (SELECT ship_id, avg(frags/battles) " +
            "AS meKills, avg(survived_battles/battles) " +
            "AS meSurvival, avg(wins/battles) " +
            "AS meWins, avg(damage_dealt/battles) " +
            "AS meDamage, avg(capture_points/battles) " +
            "AS meObjective " +
            "FROM random_ships_stats " +
            "WHERE account_id = '"+account_id+"' AND " +
            "ship_id = '" + ship_id +
            "' GROUP BY ship_id) " +
            "AS me " +
            "INNER JOIN " +
            "(SELECT ship_id, avg(frags/battles) " +
            "AS totalKills, avg(survived_battles/battles) " +
            "AS totalSurvival, avg(wins/battles) " +
            "AS totalWins, avg(damage_dealt/battles) " +
            "AS totalDamage, avg(capture_points/battles) " +
            "AS totalObjective, std(frags/battles) " +
            "AS stdtotalKills, std(survived_battles/battles) " +
            "AS stdtotalSurvival, std(wins/battles) " +
            "AS stdtotalWins, std(damage_dealt/battles) " +
            "AS stdtotalDamage, std(capture_points/battles) " +
            "AS stdtotalObjective " +
            "FROM random_ships_stats " +
            "WHERE ship_id = '"  + ship_id + "' "+
            "GROUP BY ship_id) AS total " +
            "ON me.ship_id = total.ship_id;";
        connection.query(command,function(error,results,fields) {
            connection.release();
            if(error) throw error;
            res.json([results[0]]);
        });
    });
});

router.post('/listAllAccounts', function(req, res) {
    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        connection.query("SELECT nickname, account_id FROM account_stats;",function(error,results,fields) {
            if(error) throw error;
            connection.release();
            var data = results;
            var ret = {};
            for(var i = 0; i < data.length; i++)
            {
                ret[data[i]["nickname"]] = data[i]["account_id"];
            }
            res.json(ret);
        });
    });

});

router.post('/listAllName', function(req, res) {
    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        connection.query("SELECT nickname FROM account_stats ORDER BY nickname;",function(error,results,fields) {
            if(error) throw error;
            connection.release();
            var ret = [];
            for(var i = 0; i < results.length ; i++){
                ret.push(results[i]['nickname']);
            }
            res.json(ret);
        });
    });

});

router.post('/players', function(req, res) {
    var account_ids = req.body.account_ids;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "SELECT * FROM account_stats WHERE False";
        if (account_ids.length > 0){
            command = "SELECT * FROM account_stats WHERE ";
            for(var i = 0; i < account_ids.length ; i++){
                command += "account_id = '"  + account_ids[i] + "' OR ";
            }
            command = command.substring(0, command.length - 4);
            command += ";";
        }
        connection.query(command,function(error,results,fields) {
            connection.release();
            if(error) throw error;
            res.json(results);
        });
    });
});

router.post('/behavior1', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select sum(battles) as battles, nation from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by nation;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});

router.post('/behavior2', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select sum(battles) as battles,type from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by type;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});
router.post('/behavior3', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select sum(battles) as battles,nation,type from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by nation,type;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});
router.post('/behavior4', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select ROUND(avg(survived_battles/battles),2) as survival,nation from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by nation;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});
router.post('/behavior5', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select ROUND(avg(survived_battles/battles),2) as survival,type from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by type;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});
router.post('/behavior6', function(req, res) {
    var account_id = req.body.account_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }
        var command = "select ROUND(avg(survived_battles/battles),2) as survival,nation,type from random_ships_stats inner join ships on random_ships_stats.ship_id = ships.ship_id where account_id = '" + account_id + "' group by nation,type;";
        connection.query(command,function(error,results,fields) {
            connection.release();

            if(error) throw error;
            res.json(results);
        });
    });
});

// Insert
router.post('/insert_player',function(req, res){
    // var ship_id = String(req.body.ship_id);
    console.log("insert player!!");
    var ship_id = 4282267344;
    // var player_id = String(req.body.player_id);
    var player_id = String(req.body.ship_id);
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    request({
        url: "https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id + "&account_id=" + player_id,
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode === 200) {
            //Key Information
            var wins = data['data'][player_id]['statistics']['pvp']['wins'];
            var draws = data['data'][player_id]['statistics']['pvp']['draws'];
            var losses = data['data'][player_id]['statistics']['pvp']['losses'];
            var battles = data['data'][player_id]['statistics']['battles'];
            var survived_wins = data['data'][player_id]['statistics']['pvp']['survived_wins'];
            var survived_battles = data['data'][player_id]['statistics']['pvp']['survived_battles'];
            var xp = data['data'][player_id]['statistics']['pvp']['xp'];
            var max_xp = data['data'][player_id]['statistics']['pvp']['max_xp'];
            var frags = data['data'][player_id]['statistics']['pvp']['frags'];
            var max_frags_battle = data['data'][player_id]['statistics']['pvp']['max_frags_battle'];
            var damage_scouting = data['data'][player_id]['statistics']['pvp']['damage_scouting'];
            var max_damage_scouting = data['data'][player_id]['statistics']['pvp']['max_damage_scouting'];
            var damage_dealt = data['data'][player_id]['statistics']['pvp']['damage_dealt'];
            var max_damage_dealt = data['data'][player_id]['statistics']['pvp']['max_damage_dealt'];
            var ships_spotted = data['data'][player_id]['statistics']['pvp']['ships_spotted'];
            var max_ships_spotted = data['data'][player_id]['statistics']['pvp']['max_ships_spotted'];
            var team_capture_points = data['data'][player_id]['statistics']['pvp']['team_capture_points'];
            var capture_points = data['data'][player_id]['statistics']['pvp']['capture_points'];
            var dropped_capture_points = data['data'][player_id]['statistics']['pvp']['dropped_capture_points'];
            var team_dropped_capture_points = data['data'][player_id]['statistics']['pvp']['team_dropped_capture_points'];
            var planes_killed = data['data'][player_id]['statistics']['pvp']['planes_killed'];
            var max_planes_killed = data['data'][player_id]['statistics']['pvp']['max_planes_killed'];
            var last_battle_time = data['data'][player_id]['last_battle_time'];
            var distance = data['data'][player_id]['statistics']['distance'];

            var updated_at = data['data'][player_id]['updated_at'];
            //private
            var private = data['data'][player_id]['private'];
            var damage_to_buildings = data['data'][player_id]['statistics']['pvp']['damage_to_buildings'];
            var max_damage_dealt_to_buildings = data['data'][player_id]['statistics']['pvp']['max_damage_dealt_to_buildings'];
            var suppressions_count = data['data'][player_id]['statistics']['pvp']['suppressions_count'];
            var max_suppressions_count = data['data'][player_id]['statistics']['pvp']['max_suppressions_count'];
            var art_agro = data['data'][player_id]['statistics']['pvp']['art_agro'];
            var torpedo_agro = data['data'][player_id]['statistics']['pvp']['torpedo_agro'];
            var max_total_agro = data['data'][player_id]['statistics']['pvp']['max_total_agro'];

            var battles_total = data['data'][player_id]['statistics']['pvp']['battles'];
            var battles_since_510 = data['data'][player_id]['statistics']['pvp']['battles_since_510'];
            var battles_since_512 = data['data'][player_id]['statistics']['pvp']['battles_since_512'];
            // var ship_id = data['data'][player_id]['statistics']['pvp']['max_ships_spotted_ship_id'];// Not sure what is ship_id

            var account_id = data['data'][player_id]['account_id'];
            var main_battery_max_frags_battle = data['data'][player_id]['statistics']['pvp']['main_battery']['max_frags_battle'];
            var main_battery_frags = data['data'][player_id]['statistics']['pvp']['main_battery']['frags'];
            var main_battery_hits = data['data'][player_id]['statistics']['pvp']['main_battery']['hits'];
            var main_battery_shots = data['data'][player_id]['statistics']['pvp']['main_battery']['shots'];
            var second_battery_max_frags_battle = data['data'][player_id]['statistics']['pvp']['second_battery']['max_frags_battle'];
            var second_battery_frags = data['data'][player_id]['statistics']['pvp']['second_battery']['frags'];
            var second_battery_hits = data['data'][player_id]['statistics']['pvp']['second_battery']['hits'];
            var second_battery_shots = data['data'][player_id]['statistics']['pvp']['second_battery']['shots'];
            var ramming_max_frags_battle = data['data'][player_id]['statistics']['pvp']['ramming']['max_frags_battle'];
            var ramming_frags = data['data'][player_id]['statistics']['pvp']['ramming']['ramming_frags'];
            var torpedoes_max_frags_battle = data['data'][player_id]['statistics']['pvp']['torpedoes']['max_frags_battle'];
            var torpedoes_frags = data['data'][player_id]['statistics']['pvp']['torpedoes']['frags'];
            var torpedoes_hits = data['data'][player_id]['statistics']['pvp']['torpedoes']['hits'];
            var torpedoes_shots = data['data'][player_id]['statistics']['pvp']['torpedoes']['shots'];
            var aircraft_max_frags_battle = data['data'][player_id]['statistics']['pvp']['aircraft']['max_frags_battle'];
            var aircraft_frags = data['data'][player_id]['statistics']['pvp']['aircraft']['frags'];

            // var data;
            // var random_ship = [];
            // random_ship.push(wins, draws, losses, battles, survived_wins, survived_battles, xp, max_xp, frags, max_frags_battle, damage_scouting, max_damage_scouting, damage_dealt, max_damage_dealt, ships_spotted, max_ships_spotted, team_capture_points,
            //     capture_points, dropped_capture_points, team_dropped_capture_points, planes_killed, max_planes_killed, last_battle_time, distance, updated_at, private, damage_to_buildings, max_damage_dealt_to_buildings,
            //     suppressions_count, max_suppressions_count, art_agro, torpedo_agro, max_total_agro, battles_total, battles_since_510, battles_since_512, ship_id, account_id, main_battery_max_frags_battle, main_battery_frags, main_battery_hits, main_battery_shots,
            //     second_battery_max_frags_battle, second_battery_frags, second_battery_hits, second_battery_shots, ramming_max_frags_battle, ramming_frags, torpedoes_max_frags_battle, torpedoes_frags, torpedoes_hits, torpedoes_shots,
            //     aircraft_max_frags_battle, aircraft_frags);

            // var command = "INSERT INTO random_ships_stats VALUES(";
            // for (var value in random_ship) {
            //     if (!random_ship[value] || random_ship[value] == "null") {
            //         command += "NULL,"
            //     } else if (typeof(random_ship[value]) === "string") {
            //         command += "'"
            //         command += random_ship[value].split("'").join('');
            //         command += "',"
            //     } else if (random_ship[value] instanceof Array) {
            //         command += '"['
            //         for (var i in random_ship[value]) {
            //             command += String(random_ship[value][i]).split('"').join('');
            //             command += ','
            //         }
            //         command.slice(0, -1);
            //         command += ']",'
            //     } else if (typeof(random_ship[value]) === "object") {
            //         command += '"'
            //         command += JSON.stringify(random_ship[value]).split('"').join('');
            //         command += '",'
            //     } else {
            //         command += String(random_ship[value]) + ","
            //     }
            // }
            // command = command.slice(0, -1);
            // command += ")";
            //
            // console.log("command !!");
            // console.log(command);

            var nickname = data['data'][player_id]['nickname'];
            var battles_total = data['data'][player_id]['statistics']['battles'];
            var leveling_tier = data['data'][player_id]['leveling_tier'];
            var leveling_points = data['data'][player_id]['leveling_points'];
            var hidden_profile = data['data'][player_id]['hidden_profile'];
            var karma = data['data'][player_id]['karma'];
            var logout_at = data['data'][player_id]['logout_at'];
            var created_at = data['data'][player_id]['created_at'];
            var stats_updated_at = data['data'][player_id]['stats_updated_at'];
            var clan_id = "null";
            var account_id_clan = "null";
            var account_name = "null";
            var role = "null";
            var joined_at = "null";

            var account = [];
            account.push(nickname, account_id, wins, draws, losses, battles, battles_total, survived_wins, survived_battles, xp, max_xp, frags, max_frags_battle, damage_scouting, max_damage_scouting,
            damage_dealt, max_damage_dealt, ships_spotted, max_ships_spotted, team_capture_points, capture_points, dropped_capture_points, team_dropped_capture_points, planes_killed, max_planes_killed,
            distance, leveling_tier, leveling_points, private, hidden_profile, karma, damage_to_buildings, max_damage_dealt_to_buildings, suppressions_count, max_suppressions_count, art_agro, torpedo_agro, max_total_agro,
            last_battle_time, logout_at, created_at, updated_at, stats_updated_at, battles_since_510, battles_since_512, main_battery_max_frags_battle, main_battery_frags, main_battery_hits, main_battery_shots,
            second_battery_max_frags_battle, second_battery_frags, second_battery_hits, second_battery_shots, ramming_max_frags_battle, ramming_frags, torpedoes_max_frags_battle, torpedoes_frags, torpedoes_hits,
            torpedoes_shots, aircraft_max_frags_battle, aircraft_frags, clan_id, account_id_clan, account_name, role, joined_at);

            var command2 = "INSERT IGNORE INTO account_stats VALUES(";
            for (var value in account) {
                if (!account[value] || account[value] == "null") {
                    command2 += "NULL,"
                } else if (typeof(account[value]) === "string") {
                    command2 += "'"
                    command2 += account[value].split("'").join('');
                    command2 += "',"
                } else if (account[value] instanceof Array) {
                    command2 += '"['
                    for (var i in account[value]) {
                        command2 += String(account[value][i]).split('"').join('');
                        command2 += ','
                    }
                    command2.slice(0, -1);
                    command2 += ']",'
                } else if (typeof(account[value]) === "object") {
                    command2 += '"'
                    command2 += JSON.stringify(account[value]).split('"').join('');
                    command2 += '",'
                } else {
                    command2 += String(account[value]) + ","
                }
            }
            command2 = command2.slice(0, -1);
            command2 += ");";

            console.log("command2");
            console.log(command2);
            pool.getConnection(function(error, connection){
                if (error){
                    console.log("error1");
                    connection.release();
                    throw error;
                }

                console.log("command 1 start");
                connection.query(command,function(error,results,fields) {
                    // connection.release();
                    if(error) {
                        console.log("error2");
                        throw error;
                    }
                    // var data = results[0];
                    // res.json([data]);
                });
                console.log("command 1 end");

                console.log("command 2 start");
                connection.query(command2,function(error,results,fields) {
                    // connection.release();
                    if(error) {
                        console.log("error2");
                        throw error;
                    }
                    var data = results[0];
                    res.json([data]);
                });
                console.log("command 2 end");
            });
        }else{
            console.log(error);
        }
    })
});

// Insert clan
router.post('/insert_account_clan',function(req, res){
    var player_id = String(req.body.ship_id);
    //var player_id = String(req.body.ship_id);
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    request({
        url: "https://api.worldofwarships.com/wows/clans/accountinfo/?application_id=" + application_id + "&account_id=" + player_id,
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode === 200) {
            var clan_id =  data['data'][player_id]['clan_id'];
            var account_id_clan = data['data'][player_id]['account_id'];
            var account_name = data['data'][player_id]['account_name'];
            var role = data['data'][player_id]['role'];
            var joined_at = data['data'][player_id]['joined_at'];
            var i = 0;

            var clan = [];
            clan.push(clan_id, account_id_clan, account_name, role, joined_at);

            var command2 = "UPDATE account_stats SET ";
            for (var value in clan) {
                i += 1;
                if(i == 1) {
                    command2 += "clan_id=";
                } else if (i == 2) {
                    command2 += "account_id_clan=";
                } else if (i == 3) {
                    command2 += "account_name=";
                } else if (i == 4) {
                    command2 += "role=";
                } else if (i == 5) {
                    command2 += "joined_at=";
                }

                if (!clan[value] || clan[value] == "null") {
                    command2 += "NULL,"
                } else if (typeof(clan[value]) === "string") {
                    command2 += "'"
                    command2 += clan[value].split("'").join('');
                    command2 += "',"
                } else if (clan[value] instanceof Array) {
                    command2 += '"['
                    for (var i in clan[value]) {
                        command2 += String(clan[value][i]).split('"').join('');
                        command2 += ','
                    }
                    command2.slice(0, -1);
                    command2 += ']",'
                } else if (typeof(clan[value]) === "object") {
                    command2 += '"'
                    command2 += JSON.stringify(clan[value]).split('"').join('');
                    command2 += '",'
                } else {
                    command2 += String(clan[value]) + ","
                }
            }
            command2 = command2.slice(0, -1);
            command2 += " WHERE account_id=" + player_id;
            command2 += ";";

            console.log("command for clan");
            console.log(command2);
            pool.getConnection(function(error, connection){
                if (error){
                    connection.release();
                    throw error;
                }

                connection.query(command2,function(error,results,fields) {
                    connection.release();
                    if(error) throw error;
                    var data = results[0];
                    res.json([data]);
                    // res.json(results);
                });
            });
        }else{
            console.log(error);
        }
    })
});


router.post('/join_insert', function(req, res) {
    // var ship_id = 4282267344;
    var player_id = String(req.body.ship_id);
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    request({
        url: "https://api.worldofwarships.com/wows/ships/stats/?application_id=" + application_id + "&account_id=" + player_id,
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode === 200) {
            pool.getConnection(function(error, connection){
                if (error){
                    connection.release();
                    throw error;
                }

            var count = -1;
            for(var ele in data['data'][player_id]) {
                count += 1;
            }

            for(var ele in data['data'][player_id]) {
                // console.log("ele");
                // console.log(ele);

                var wins = data['data'][player_id][ele]['pvp']['wins'];
                var draws = data['data'][player_id][ele]['pvp']['draws'];
                var losses = data['data'][player_id][ele]['pvp']['losses'];
                var battles = data['data'][player_id][ele]['battles'];
                var survived_wins = data['data'][player_id][ele]['pvp']['survived_wins'];
                var survived_battles = data['data'][player_id][ele]['pvp']['survived_battles'];
                var xp = data['data'][player_id][ele]['pvp']['xp'];
                var max_xp = data['data'][player_id][ele]['pvp']['max_xp'];
                var frags = data['data'][player_id][ele]['pvp']['frags'];
                var max_frags_battle = data['data'][player_id][ele]['pvp']['max_frags_battle'];
                var damage_scouting = data['data'][player_id][ele]['pvp']['damage_scouting'];
                var max_damage_scouting = data['data'][player_id][ele]['pvp']['max_damage_scouting'];
                var damage_dealt = data['data'][player_id][ele]['pvp']['damage_dealt'];
                var max_damage_dealt = data['data'][player_id][ele]['pvp']['max_damage_dealt'];
                var ships_spotted = data['data'][player_id][ele]['pvp']['ships_spotted'];
                var max_ships_spotted = data['data'][player_id][ele]['pvp']['max_ships_spotted'];
                var team_capture_points = data['data'][player_id][ele]['pvp']['team_capture_points'];
                var capture_points = data['data'][player_id][ele]['pvp']['capture_points'];
                var dropped_capture_points = data['data'][player_id][ele]['pvp']['dropped_capture_points'];
                var team_dropped_capture_points = data['data'][player_id][ele]['pvp']['team_dropped_capture_points'];
                var planes_killed = data['data'][player_id][ele]['pvp']['planes_killed'];
                var max_planes_killed = data['data'][player_id][ele]['pvp']['max_planes_killed'];
                var last_battle_time = data['data'][player_id]['last_battle_time'];
                var distance = data['data'][player_id][ele]['distance'];

                var updated_at = data['data'][player_id][ele]['updated_at'];
                //private
                var private = data['data'][player_id]['private'];
                var damage_to_buildings = data['data'][player_id][ele]['pvp']['damage_to_buildings'];
                var max_damage_dealt_to_buildings = data['data'][player_id][ele]['pvp']['max_damage_dealt_to_buildings'];
                var suppressions_count = data['data'][player_id][ele]['pvp']['suppressions_count'];
                var max_suppressions_count = data['data'][player_id][ele]['pvp']['max_suppressions_count'];
                var art_agro = data['data'][player_id][ele]['pvp']['art_agro'];
                var torpedo_agro = data['data'][player_id][ele]['pvp']['torpedo_agro'];
                var max_total_agro = data['data'][player_id][ele]['pvp']['max_total_agro'];

                var battles_total = data['data'][player_id][ele]['pvp']['battles'];
                var battles_since_510 = data['data'][player_id][ele]['pvp']['battles_since_510'];
                var battles_since_512 = data['data'][player_id][ele]['pvp']['battles_since_512'];
                var ship_id = data['data'][player_id][ele]['ship_id'];// Not sure what is ship_id

                var account_id = data['data'][player_id][ele]['account_id'];
                var main_battery_max_frags_battle = data['data'][player_id][ele]['pvp']['main_battery']['max_frags_battle'];
                var main_battery_frags = data['data'][player_id][ele]['pvp']['main_battery']['frags'];
                var main_battery_hits = data['data'][player_id][ele]['pvp']['main_battery']['hits'];
                var main_battery_shots = data['data'][player_id][ele]['pvp']['main_battery']['shots'];
                var second_battery_max_frags_battle = data['data'][player_id][ele]['pvp']['second_battery']['max_frags_battle'];
                var second_battery_frags = data['data'][player_id][ele]['pvp']['second_battery']['frags'];
                var second_battery_hits = data['data'][player_id][ele]['pvp']['second_battery']['hits'];
                var second_battery_shots = data['data'][player_id][ele]['pvp']['second_battery']['shots'];
                var ramming_max_frags_battle = data['data'][player_id][ele]['pvp']['ramming']['max_frags_battle'];
                var ramming_frags = data['data'][player_id][ele]['pvp']['ramming']['ramming_frags'];
                var torpedoes_max_frags_battle = data['data'][player_id][ele]['pvp']['torpedoes']['max_frags_battle'];
                var torpedoes_frags = data['data'][player_id][ele]['pvp']['torpedoes']['frags'];
                var torpedoes_hits = data['data'][player_id][ele]['pvp']['torpedoes']['hits'];
                var torpedoes_shots = data['data'][player_id][ele]['pvp']['torpedoes']['shots'];
                var aircraft_max_frags_battle = data['data'][player_id][ele]['pvp']['aircraft']['max_frags_battle'];
                var aircraft_frags = data['data'][player_id][ele]['pvp']['aircraft']['frags'];

                var random_ship = [];
                random_ship.push(wins, draws, losses, battles, survived_wins, survived_battles, xp, max_xp, frags, max_frags_battle, damage_scouting, max_damage_scouting, damage_dealt, max_damage_dealt, ships_spotted, max_ships_spotted, team_capture_points,
                    capture_points, dropped_capture_points, team_dropped_capture_points, planes_killed, max_planes_killed, last_battle_time, distance, updated_at, private, damage_to_buildings, max_damage_dealt_to_buildings,
                    suppressions_count, max_suppressions_count, art_agro, torpedo_agro, max_total_agro, battles_total, battles_since_510, battles_since_512, ship_id, account_id, main_battery_max_frags_battle, main_battery_frags, main_battery_hits, main_battery_shots,
                    second_battery_max_frags_battle, second_battery_frags, second_battery_hits, second_battery_shots, ramming_max_frags_battle, ramming_frags, torpedoes_max_frags_battle, torpedoes_frags, torpedoes_hits, torpedoes_shots,
                    aircraft_max_frags_battle, aircraft_frags);

                var command = "INSERT IGNORE INTO random_ships_stats VALUES(";
                for (var value in random_ship) {
                    if ((!random_ship[value] && random_ship[value] != 0) || random_ship[value] == "null") {
                    // if (random_ship[value] == "null") {
                        command += "NULL,"
                    } else if (typeof(random_ship[value]) === "string") {
                        command += "'"
                        command += random_ship[value].split("'").join('');
                        command += "',"
                    } else if (random_ship[value] instanceof Array) {
                        command += '"['
                        for (var i in random_ship[value]) {
                            command += String(random_ship[value][i]).split('"').join('');
                            command += ','
                        }
                        command.slice(0, -1);
                        command += ']",'
                    } else if (typeof(random_ship[value]) === "object") {
                        command += '"'
                        command += JSON.stringify(random_ship[value]).split('"').join('');
                        command += '",'
                    } else {
                        command += String(random_ship[value]) + ","
                    }
                }
                command = command.slice(0, -1);
                command += ")";

                // console.log("command !!");
                // console.log(command);
                // if(ele == count) {
                //     connection.query(command,function(error,results,fields) {
                //         connection.release();
                //
                //         if(error) throw error;
                //         var data = results[0];
                //         res.json([data]);
                //     });
                // }
                // else {
                if(wins >= 1 && losses >= 1 && battles >= 1) {
                    connection.query(command,function(error,results,fields) {
                        // connection.release();

                        if(error) throw error;
                    });
                }
                // }
            }
            connection.query(command,function(error,results,fields) {
                // connection.release();
                var data = results[0];
                res.json([data]);
                if(error) throw error;
            });

            //
            // console.log("length");
            // console.log(count);
        });
        }else{
            console.log(error);
        }
    });
});

router.post('/insert_clan', function(req, res) {
    var player_id = String(req.body.ship_id);
    const application_id = "b2f122ce4941da951c7b0cafa659608e";
    var request = require("request");
    var command = "SELECT clan_id FROM account_stats WHERE account_id=" + player_id;
    pool.getConnection(function(error, connection){
        if (error){
            connection.release();
            throw error;
        }

        connection.query(command,function(error,results,fields) {
            // connection.release();
            if(error) throw error;
            var clan_id = results[0]['clan_id'];
            // res.json([data1]);

            request({
                url: "https://api.worldofwarships.com/wows/clans/info/?application_id=" + application_id + "&clan_id=" + clan_id,
                json: true
            }, function(error, response, data) {
                if (!error && response.statusCode === 200) {
                    console.log("data!!!");
                    console.log(data);
                    console.log("clan id is ");
                    console.log(clan_id);
                    var tag = data['data'][clan_id]['tag'];
                    var name = data['data'][clan_id]['name'];
                    var members_count = data['data'][clan_id]['members_count'];
                    var leader_id = data['data'][clan_id]['leader_id'];
                    var leader_name = data['data'][clan_id]['leader_name'];
                    var creator_name = data['data'][clan_id]['creator_name'];
                    var description = data['data'][clan_id]['description'];
                    var old_name = data['data'][clan_id]['old_name'];
                    var old_tag = data['data'][clan_id]['old_tag'];
                    var renamed_at = data['data'][clan_id]['renamed_at'];
                    var clan_id1 = data['data'][clan_id]['clan_id'];
                    var created_at = data['data'][clan_id]['created_at'];
                    var updated_at = data['data'][clan_id]['updated_at'];
                    var is_clan_disbanded = data['data'][clan_id]['is_clan_disbanded'];
                    var members_ids = data['data'][clan_id]['members_ids'];

                    var clan_data = [];
                    clan_data.push(tag, name, members_count, leader_id, leader_name, creator_name, description, old_name, old_tag, renamed_at,
                    clan_id1, created_at, updated_at, is_clan_disbanded, members_ids);

                    var command2 = "INSERT IGNORE INTO clans VALUES(";
                    for (var value in clan_data) {
                        if (!clan_data[value] || clan_data[value] == "null") {
                            command2 += "NULL,"
                        } else if (typeof(clan_data[value]) === "string") {
                            command2 += "'"
                            command2 += clan_data[value].split("'").join('');
                            command2 += "',"
                        } else if (clan_data[value] instanceof Array) {
                            command2 += '"['
                            for (var i in clan_data[value]) {
                                command2 += String(clan_data[value][i]).split('"').join('');
                                command2 += ','
                            }
                            command2.slice(0, -1);
                            command2 += ']",'
                        } else if (typeof(clan_data[value]) === "object") {
                            command2 += '"'
                            command2 += JSON.stringify(clan_data[value]).split('"').join('');
                            command2 += '",'
                        } else {
                            command2 += String(clan_data[value]) + ","
                        }
                    }
                    command2 = command2.slice(0, -1);
                    command2 += ");";

                    console.log("command2");
                    console.log(command2);
                    connection.query(command2,function(error,results,fields) {
                        connection.release();

                        if(error) throw error;
                        var data = results[0];
                        res.json([data]);
                    });
                }else{
                    console.log(error);
                }
            });
            });
        });
});


router.post('/delete_player', function(req, res) {
    var player_id = String(req.body.ship_id);
    pool.getConnection(function(error, connection){
        if (error){
            throw error;
        }
        var command_d_random = "DELETE FROM random_ships_stats WHERE account_id=" + player_id;
        connection.query(command_d_random,function(error,results,fields) {
            if(error) throw error;
            // connection.release();
        });

        var command_d_account = "DELETE FROM account_stats WHERE account_id=" + player_id;

        connection.query(command_d_account,function(error,results,fields) {
            connection.release();
            if(error) throw error;
            var data = results[0];
            res.json([data]);
        });
    });

});





module.exports = router;
