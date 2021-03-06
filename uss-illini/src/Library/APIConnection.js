/*const application_id = "b2f122ce4941da951c7b0cafa659608e";
const ship_id = "4181669712";

function get_ship_encyclopedia(application_id,ship_id) {
  var request = require("request")
  request({
      url: "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id="+application_id+"&ship_id="+ship_id,
      json: true
  }, function (error, response, data) {
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
          var default_profile_fire_control = data['data'][ship_id]['default_profile']['fire_control'];//23
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
          var modules_engine = data['data'][ship_id]['modules']['engine'];//35
          var modules_torpedo_bomber = data['data'][ship_id]['modules']['torpedo_bomber'];//36
          var modules_fighter = data['data'][ship_id]['modules']['fighter'];//37
          var modules_hull = data['data'][ship_id]['modules']['hull'];//38
          var modules_artillery = data['data'][ship_id]['modules']['artillery'];//39
          var modules_torpedoes = data['data'][ship_id]['modules']['torpedoes'];//40
          var modules_fire_control = data['data'][ship_id]['modules']['fire_control'];//41
          var modules_flight_control = data['data'][ship_id]['modules']['flight_control'];//42
          var modules_dive_bomber = data['data'][ship_id]['modules']['dive_bomber'];//43
          //{module_id_1:{name:,next_modules:,is_default:,price_xp:,price_credit:,next_ships:,module_id:,type:,module_id_str} module_id_2:{...}...}
          var modules_tree = data['data'][ship_id]['modules_tree'];//44

          var ship = [];
          ship.push(name,tier,type,nation,price_credit,price_gold,ship_id_str,ship_id,is_premium,is_special,description,mod_slots,next_ships,upgrades,default_profile_engine,default_profile_torpedo_bomber,default_profile_anti_aircraft,default_profile_mobility,default_profile_hull,default_profile_atbas,default_profile_artillery,default_profile_torpedoes,default_profile_fighters,default_profile_fire_control,default_profile_weaponry,default_profile_battle_level_range_max,default_profile_battle_level_range_min,default_profile_flight_control,default_profile_concealment,default_profile_armour,default_profile_dive_bomber,images_small,images_medium,images_large,images_contour,modules_engine,modules_torpedo_bomber,modules_fighter,modules_hull,modules_artillery,modules_torpedoes,modules_fire_control,modules_flight_control,modules_dive_bomber,modules_tree);
          console.log(ship)
      }
  })
}

get_ship_encyclopedia(application_id,ship_id);
*/
