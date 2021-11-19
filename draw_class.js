//This file will implement a class, used to store information for the draw function
//It will have a parameterized constructor, and a shift function, that changes the 
//classes vars

export default class Draw_Info {
    constructor(origin, line_length, angle, ctx) {
        this.origin = origin;
        this.line_length = line_length;
        this.angle = angle;
        this.ctx = ctx;
    }

    new_length() {
        return this.line_length * 0.7;
    }

    new_angle() {
        return this.angle * 0.7;
    }

    calculate_cos(degrees) {
        let radians = (Math.PI/180) * degrees;
        return radians;
    }

    draw1() {
        //this should be the y component of the hypotenuse
        let new_origin = [this.origin[0],(this.line_length * Math.cos(this.angle))+this.origin[1]];
        this.ctx.beginPath();
        this.ctx.moveTo(this.origin[0], this.origin[1]);
        this.ctx.lineTo(new_origin[0],new_origin[1]);
        this.ctx.stroke();
        // console.log(`This is my function arg for a two y split: ${Math.cos(this.angle)}`);
        // console.log(`This is my function call for new_origin single: ${this.line_length}`)
        return new_origin;
    }

    draw2() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        // console.log(this.ctx);
         var originX = this.origin[0];
        var originY = this.origin[1];
        let new_left_origin = [originX-(Math.sin(this.angle)*this.line_length),originY+(Math.cos(this.angle)*this.line_length)];
        let new_right_origin = [originX+(Math.sin(this.angle)*this.line_length), originY+(Math.cos(this.angle)*this.line_length)];
        
        // console.log(`cos(${this.angle+90}): ${Math.cos(this.angle+90)}`)
        // console.log("This is the new left: " + new_left_origin);
        // console.log("This is the new right: " + new_right_origin);

        this.ctx.beginPath();
        this.ctx.moveTo(originX,originY);
        this.ctx.lineTo(new_left_origin[0],new_right_origin[1]);
        this.ctx.moveTo(originX,originY);
        this.ctx.lineTo(new_right_origin[0] , new_left_origin[1]);
        this.ctx.stroke();
        // console.log(`The origin should beat X = ${originY}`);
        return {"left": new_left_origin, "right": new_right_origin}
        }

        red_rect(x_center,y_center,width=8,height=8) {
            //we need to get the upper left corner
            let x = x_center-(width/2);
            let y = y_center-(height/2);
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(x,y,width,height);
            this.ctx.fillStyle = 'black';
        }

        green_rect(x_center,y_center,width=8,height=8) {
            //we need to get the upper left corner
            let x = x_center-(width/2);
            let y = y_center-(height/2);
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(x,y,width,height);
            this.ctx.fillStyle = 'black';
        }

        text_render(left_sub, right_sub, x_center,y_center,red=false) {
            let max = this.line_length/1.2;
            let height = this.line_length/3;
            let my_string = `${left_sub}  ${right_sub}`;
            let lower_left_x = x_center - max/2;
            let lower_left_y = y_center - height/2;
            this.ctx.font = `${height}px serif`;
            if(red == true) {
                this.ctx.fillStyle = "red";
            }
            this.ctx.fillText(my_string, lower_left_x, lower_left_y, max);
            this.ctx.fillStyle = "black";
        }
        

}