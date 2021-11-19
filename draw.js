import Draw_Info from "./draw_class.js";


var canvas = document.getElementById("my-canvas");
canvas.width = window.innerWidth;
canvas.height = 2000;
const MAX_LENGTH = canvas.width/4;
let ORIGIN = [canvas.width/2,200];
//global array that gets substrings added to it
let substring_arr = [];
let number_of_overlaps = 0; //To be updated in my function 
//For adding sub_string to array, that's easy
//Takes an array of two substrings being compared as argument
//This data structure uses the implied logic of every two elements being grouped
//Allows built-in Javascript functionality to be utilized
function add_to_arr([first,second],arr) {
    arr.push(first);
    arr.push(second);
}

//Now I need to make a function that compares the existing substring_arr to the one that may be added
//Note: hashtable would be best bet for this, but array should work

//This function is going to check if the substrings exist as a touple in the array
//If they do, then it will return true, if not it will return false
//If false, the substrings will be added to the end of the array
function compare_substrings([first,second],arr) {
    let length = arr.length;
    let count = 0;
    let found_index;
    let match = false;
    while(count < length && !match) {
        found_index = arr.indexOf(first, count);
        if(found_index >= 0) {
            if(found_index % 2 == 0) {
                //it's the first element of the pair
                //we check if second is in index+1
                if(second === arr[found_index+1]) {
                    //we have a match!
                    match = true;
                }
                //if not we keep searching
            }
            else {
                //the first element was odd, meaning its the last one
                //so we compare it to the first one
                if(second === arr[found_index-1]) {
                    match = true;
                }
            }
        }
        ++count;
    }
    if(match == false) {
        add_to_arr([first, second], arr);
    }
    return match;
}

//testing class constructor

var ctx = canvas.getContext('2d');
let my_object = new Draw_Info(ORIGIN,MAX_LENGTH,Math.PI/3,ctx);
// my_object.draw2();
// let my_object2 =new Draw_Info([500,20],100,45,ctx);
// my_object2.draw1();

//I want my recursive call here, for the longest common subsequence

function max(a,b) {
    return a > b ? a : b;
}

function LCS(M, N, m, n, draw) {
    if(m==0 || n==0) {
        return 0;
    }
    else if(M[m-1] == N[n-1]) {
        //this function renders the line, reutrns new origin
        //draw green triangle at old origin
        let left_sub = M.slice(0,m);
        let right_sub = N.slice(0,n);
        draw.text_render(left_sub,right_sub, draw.origin[0],draw.origin[1],max );
        draw.green_rect(draw.origin[0],draw.origin[1]);
        let new_origin = draw.draw1();
        //this function gets a new angle for next call
        let new_angle = draw.new_angle();
        //this function gets a new length for next call
        let new_length = draw.new_length();
        let new_object = new Draw_Info(new_origin, new_length, new_angle, ctx);
        // console.log(M.slice(0,m));

        let matching = compare_substrings([left_sub,right_sub],substring_arr);
       if(matching) {
           //draw red square
           ++number_of_overlaps;
           draw.red_rect(draw.origin[0],draw.origin[1]);
            // new_object.red_rect(new_origin[0],new_origin[1]);
            draw.text_render(left_sub,right_sub, draw.origin[0],draw.origin[1],true);
       }
        return 1 + LCS(M,N,m-1,n-1, new_object);
    }
    else
        {
            let left_sub = M.slice(0,m);
            let right_sub = N.slice(0,n);
            draw.text_render(left_sub,right_sub, draw.origin[0],draw.origin[1]);

            let new_origins = draw.draw2();
            let new_angle = draw.new_angle();
            let new_length = draw.new_length();
            let new_object_left = new Draw_Info(new_origins.left, new_length, new_angle,ctx);
            let new_object_right = new Draw_Info(new_origins.right, new_length, new_angle, ctx);
            let matching = compare_substrings([left_sub,right_sub],substring_arr);
            if(matching) {
                //draw red square
                ++number_of_overlaps;
                new_object_left.red_rect(draw.origin[0],draw.origin[1]);
                draw.text_render(left_sub,right_sub, draw.origin[0],draw.origin[1], true); 
            }
            // if(matching_right) {
            //     ++number_of_overlaps;
            //     new_object_right.red_rect(new_origins.right[0],new_origins.right[1]);
            // }
            return max(LCS(M,N,m-1,n, new_object_left),LCS(M,N,m,n-1, new_object_right));
        }
        
}

function add_counts(answer, overlaps, string1, string2, parent) {
    let to_append = document.getElementById("to_append");
    let lg_sub = document.createElement("h4");
    lg_sub.style.color = "white";
    //let over_p = document.createElement("p");
    lg_sub.innerHTML = `There were <b> ${overlaps} overlaps</b>  when comparing ${string1} to ${string2}`;
   // over_p.innerHTML = `The longest common subsequence had a length of ${answer}`;
    lg_sub.setAttribute("id","lg_sub");
    //over_p.setAttribute("id", "over_p");

    //parent.append(over_p);
    parent.append(lg_sub);
}

function submit(event) {
    event.preventDefault();
    let parent= document.getElementById("to_append");
    let string1 = document.getElementById("string1").value;
    let string2 = document.getElementById("string2").value;
    let length1 = string1.length;
    let length2 = string2.length; 
    let answer = LCS(string1,string2,length1,length2,my_object);
    add_counts(answer, number_of_overlaps, string1, string2, parent);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // substring_arr = [];
    // number_of_overlaps = 0;
};

function reset(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    substring_arr = [];
    number_of_overlaps = 0; 
    let parent= document.getElementById("to_append");
    let child1 = document.getElementById("lg_sub");
    //let child2 = document.getElementById("over_p");
    parent.removeChild(child1);
    parent.removeChild(child2);
}

let string_input = document.getElementById("string_input");

string_input.addEventListener("submit", (event)=> submit(event));

string_input.addEventListener("reset", (event)=> reset(event));


let string1 = "MIGHTY";
let string2 = "MOUSEE";
let length1 = string1.length;
let length2 = string2.length;

// let answer = LCS(string1,string2,length1,length2,my_object);
// console.log(string1.slice(1,length1));

// let my_array = ["MIGHT","MOUSE"];
// let matches = compare_substrings(["birdi","bi"], my_array);
// // console.log(matches);

// // my_object.text_render("lmn","ttp",100,100,150);
// // console.log(substring_arr);
// console.log(number_of_overlaps);
// // console.log(substring_arr);