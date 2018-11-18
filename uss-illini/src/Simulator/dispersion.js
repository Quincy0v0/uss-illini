export default function main(shots,distance,nation,tier,is_locked,x,y,theta){
    var sigma = get_sigma(nation,tier);
    var max_dispersion = get_max_dispersion(nation,distance*1000);
    var vertical = get_vertical(nation,tier);
    if (sigma == -1 || max_dispersion == -1 || vertical == -1){
        return;
    }
    var arr = dispersion(shots,sigma,max_dispersion,vertical,is_locked);
    var tweaked = new Array(shots)
    var tweakedx = new Array(shots);
    var tweakedy = new Array(shots);
    var target_mean = [x,y];
    var target_cov = [[1,0],[0,0.5]];
    var T = target_cov[0][0]+target_cov[1][1];
    var D = target_cov[0][0]*target_cov[1][1];
    var eigenvalues = [T/2 + Math.sqrt(T*T/4-D),T/2 - Math.sqrt(T*T/4-D)];
    var l = [[Math.sqrt(eigenvalues[0]),0],[0,Math.sqrt(eigenvalues[1])]];
    if(target_cov[0][1] == 0 && target_cov[1][0] == 0){
        var eigenvectors = [[1,0],[0,1]];
    }else if(target_cov[1][0] != 0){
        var eigenvectors = [[eigenvalues[0]-target_cov[1][1],eigenvalues[1]-target_cov[1][1]],[target_cov[1][0],target_cov[1][0]]];
    }else{
        var eigenvectors = [[target_cov[0][1],target_cov[0][1]],[eigenvalues[0]-target_cov[0][0],eigenvalues[1]-target_cov[0][0]]];
    }
    for (var i = 0; i < shots ; i++){
        tweaked[i] = [(l[0][0]*arr[0][i]+target_mean[0]),(l[1][1]*arr[1][i]+target_mean[1])]
        tweakedx[i] = tweaked[i][0]*Math.cos(theta*Math.PI/180) - tweaked[i][1]*Math.sin(theta*Math.PI/180);
        tweakedy[i] = tweaked[i][0]*Math.sin(theta*Math.PI/180) + tweaked[i][1]*Math.cos(theta*Math.PI/180);
    }
    var trace = {
      x: tweakedx,
      y: tweakedy,
      mode: 'markers',
      type: 'scattergl',
      marker: {color: 'red',size : 12},
    };
    var groundzero = {
        x: [target_mean[0]],
        y: [target_mean[1]],
        mode: 'markers',
        type: 'scatter',
        marker: {color: 'white',size : 24},
    }
    return [trace,groundzero];
}

//n shots, sigma, max_dispersion at given distance
//return array of x,y cord center at 0
function dispersion(n,sigma,max_dispersion,vertical,is_locked){
    var x = 0, y = 0;
    var arrx = new Array(n);
    var arry = new Array(n);
    for (var i = 0; i < n; i++) {
        if (is_locked){
            x = (get_gaussian_random()) * max_dispersion/2/3 * sigma;
            y = (get_gaussian_random()) * vertical/2/3 * sigma;
        }else{
          x = (get_gaussian_random()) * max_dispersion/3 * sigma;
          y = (get_gaussian_random()) * vertical/3 * sigma;
        }
        arrx[i] = x;
        arry[i] = y;
    }
    return [arrx,arry];
}

function get_gaussian_random(){
    var m = 0;
    while (m == 0){m = Math.round(Math.random() * 100);}
    var summation = 0;
    for (var i = 0; i < m; i++){summation += Math.random();}
    var gaussian = (summation - m/2) / Math.sqrt(m/12.0);
    return gaussian
}

function get_max_dispersion(nation,dist){
    if (nation == 'japan'){
        return 0.00716 * dist + 84.23257;
    }else if (nation == 'usa') {
        return 0.009933 * dist + 60.92578;
    }else if (nation == 'germany'){
        return 0.009741 * dist + 66.49091;
    }else if(nation == 'uk'){
        return 0.009791 * dist + 65.69861;
    }else if(nation == 'france'){
        return 0.010099 * dist + 57.29566;
    }else{
        return -1;
    }
}

function get_sigma(nation,tier){
    var ger = [0,0,0,0,1.8,1.8,1.8,1.8,1.8,1.8,1.8,1.8];
    var usa = [0,0,0,0,1.9,1.5,1.8,1.5,1.9,2,1.9,1.9];
    var ijn = [0,0,0,0,1.8,2,1.8,1.5,2,1.8,1.8,2.1];
    var fra = [0,0,0,0,1.8,1.8,1.8,1.6,1.5,1.8,1.6,2];
    var uk = [0,0,0,0,1.8,1.6,1.8,2,1.8,1.8,1.8,1.8];
    if (nation == 'japan'){
        return ijn[tier];
    }else if (nation == 'usa') {
        return usa[tier];
    }else if (nation == 'germany'){
        return ger[tier];
    }else if(nation == 'uk'){
        return uk[tier];
    }else if(nation == 'france'){
        return fra[tier];
    }else{
        return -1;
    }
}

function get_vertical(nation,tier){
    var ger = [0,0,0,0,394,448,458,466,594,602,656,728];
    var usa = [0,0,0,0,376,443,450,481,482,546,625,662];
    var ijn = [0,0,0,0,405,527,545,510,550,605,616,662];
    var fra = [0,0,0,0,390,432,432,478,508,348,365,387];
    var uk = [0,0,0,0,420,454,478,492,554,554,578,637];
    if (nation == 'japan'){
        return ijn[tier];
    }else if (nation == 'usa') {
        return usa[tier];
    }else if (nation == 'germany'){
        return ger[tier];
    }else if(nation == 'uk'){
        return uk[tier];
    }else if(nation == 'france'){
        return fra[tier];
    }else{
        return -1;
    }
}
