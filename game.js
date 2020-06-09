// setting up of game with phaser


let config={
    width:800,
    height:400,
    scene:{
            preload:preload,
            create:create,
            update:update
    }

}

let game=new Phaser.Game(config)

function preload(){
    // console.log(scene)
    // console.log("In preload") 
    this.load.image('background',"/Assets/back.jpg")
    this.load.image('stand',"Assets/stand.png");
    this.load.image('wheel',"Assets/wheel.png");
    this.load.image('pin',"Assets/pin.png");
    this.load.image('button', "Assets/spin-n-win-logo.png");
    this.load.audio('spin', "Assets/Spinsound.mp3");
    this.load.image('tryagain',"Assets/try again.png")

}
function create(){
    // console.log("In create")//create that image
    let W = game.config.width;
    let H = game.config.height;
    
    this.add.sprite(0,0,'background');
    
    this.button=this.add.sprite(W/4,H/2,'button').setScale(0.15).setInteractive({
        cursor: 'pointer'
    });
    this.tryagain=this.add.sprite(W/4,H/2,'tryagain').setScale(0.15).setInteractive({
        cursor: 'pointer'
    });
    this.tryagain.visible=false;
    let pin = this.add.sprite((3*W)/4,H/2-165,'pin').setScale(0.15);
    
    pin.depth = 5;
    
    this.add.sprite((3*W)/4,(H-30),'stand').setScale(0.15);
    
    
    //let create wheel
    this.wheel = this.add.sprite((3*W)/4,H/2,"wheel");
    this.wheel.setScale(0.15); 
    console.log(this.wheel.depth);
//    this.input.on("pointerdown",spinwheel,this);
    this.button.on('pointerdown', spinwheel, this);
    this.spin = this.sound.add('spin');
    this.add.text(0,0, `Try Your Luck And Win Exciting Prizes!!!`, 
        {
        fontSize: '25px',
        color: 'black',
        })
}
function update(){
     
    console.log("In update ")
}
function spinwheel(){
    let W = game.config.width;
    let H = game.config.height;
    console.log("Time to spin the wheel");
    this.button.visible = false;
    this.sound.play('spin');
    let rounds = Phaser.Math.Between(2,4);
    console.log(rounds);
    
    let extra_degrees = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_degrees;
    let prizes = ["CB BOOK", "CB TSHIRT", "2 EXTRA SPIN", "AMAZON VOUCHER", "50% OFF", "NETFLIX SUBS", "100% OFF", "CB SWAGPACK", "70% OFF", "HARD LUCK", "35% OFF", "3000 CB CREDITS" ];
    console.log((prizes[extra_degrees/30]));
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        duration: 5000,
    });
    if(extra_degrees!=9*30){
    setTimeout(() => {
//        this.button.visible=true,
        this.tryagain.visible=true,
        this.add.text(15, H/2-125, `Congratulations You Have Won`, 
        {
        fontSize: '25px',
        color: 'purple',
        }),
        this.add.text(100, H/2-75, `${prizes[extra_degrees/30]}`, 
        {
        fontSize: '30px',
        color: 'purple',
        }),
        this.tryagain.on("pointerdown", restart, this);
    }, 5010);
    }
    else{
        setTimeout(() => {
//        this.button.visible=true,
        this.tryagain.visible=true,
        this.add.text(80, H/2-125, `Try Again You Got`, 
        {
        fontSize: '25px',
        color: 'red',
        }),
        this.add.text(125, H/2-75, `HARD LUCK`, 
        {
        fontSize: '30px',
        color: 'red',
        }),
        this.tryagain.on("pointerdown", restart, this);
    }, 5010);
    }
    
}
function restart() {
    this.scene.restart();
}
