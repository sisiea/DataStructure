var questions = ['你是哺乳动物吗？','你比猫大吗？','你有脊椎吗？','你是灵长类动物吗？'
                 ,'你是家庭宠物吗？','你会飞吗？','你生活在水下吗？','你会说话吗？'
                 ,'你会发出哞哞叫吗？','你会发出吠声吗？','你能在蓝天翱翔吗？','你会自己捕食吗？'
                 ,'你的牙齿是尖的吗？','你有很多条腿？','你有粘液吗？'];
var answers = ['人','猿','牛','猪','狗','猫','蝙蝠','老鼠','鹰','鸽子','短鼻鳄鱼','青蛙','鱿鱼'
              ,'蛤','刺蛾','蚂蚁'];
var picIndex = [];                 

var tree = new Tree(questions[0],false);
var talkWin = document.getElementById('win-zone');
var picZone = document.getElementById('pic-zone');
var yesBtn = document.getElementById('yes-btn');
var replayBtn = document.getElementById('replay-btn');
var noBtn = document.getElementById('no-btn');
var currentPosition;
var isGaming = false;
 function initTree(){
 	var bottomQuestions = questions.slice(7);
 	for(var i = 0;i<=6;i++){
 		tree.add(questions[2*i+1],questions[i],false,tree.traverseDF);
 		tree.add(questions[2*i+2],questions[i],false,tree.traverseDF);
 	}
 	for(var i = 0;i<=7;i++){
 		tree.add(answers[2*i],bottomQuestions[i],true,tree.traverseDF);
 		tree.add(answers[2*i+1],bottomQuestions[i],true,tree.traverseDF);
 	}
 	// tree.show(tree.traverseDF);
 }
 function addTalk(content,classType){
 	if(classType === "robot-talk"){
 		var addRobotText = '<div class="robot-talk"><img src="pic/robot.jpg"><span>'+content+'</span></div>';
 		talkWin.innerHTML += addRobotText;

 	}
 	else if(classType === "man-talk"){
 		var addManText = '<div class="man-talk"><img src="pic/man.png"><span>'+content+'</span></div>';
 		talkWin.innerHTML += addManText;
 	}

 }

 function askQuestion(node){
 	if(node.isAnswer){
 		var answer = node.data;
 		var answerIndex = answers.indexOf(answer);
 		if(picIndex.indexOf(answerIndex) !== -1){
 			addTalk("哈哈我已经知道了！！！","robot-talk");
			addTalk("答案就是"+node.data,"robot-talk");
			gameOver();
 		}
 		else{
 			addTalk("你他妈在逗我...你想的东西不在右边啊","robot-talk");
 			gameOver();
 		}
 	}
 	else{
 		addTalk(node.data,"robot-talk");
 	}
 }
 function answerYes(){
 	if(isGaming){
	 	addTalk("Yes","man-talk");
	 	currentPosition = currentPosition.children[0];
	 	askQuestion(currentPosition);
 	}
 }
 function answerNo(){
 	if(isGaming){
	 	addTalk("No","man-talk");
	 	currentPosition = currentPosition.children[1];
	 	askQuestion(currentPosition);
	}
 }

 function gameStart(){
 	isGaming = true;
 	initPicData();
 	renderPicZone();
 	talkWin.innerHTML = '';
 	addTalk("按yes或者no回答问题，我就能猜到你在想右边哪个动物！","robot-talk")
 	currentPosition = tree._root;
 	askQuestion(currentPosition);
 }
 function gameOver(){
 	isGaming = false;
 	addTalk("我说对了吗？哈哈！","robot-talk");
 }
 function gameReplay(){
 	gameStart();
 }
function shuffle(aArr){
    var iLength = aArr.length,
        i = iLength,
        mTemp,
        iRandom;
 
    while(i--){
        if(i !== (iRandom = Math.floor(Math.random() * iLength))){
            mTemp = aArr[i];
            aArr[i] = aArr[iRandom];
            aArr[iRandom] = mTemp;
        }
    }
    return aArr;
}
 function renderPicZone(){
 	picZone.innerHTML = '';
 	var addInnerHTML = '';
 	for(var i =0;i<5;i++){
 		addInnerHTML += '<img src="pic/'+picIndex[i]+'.jpg">'
 	}
 	picZone.innerHTML = addInnerHTML;

 }
 function initPicData(){
 	allIndex = [];
 	for(var i=0;i<16;i++){
 		allIndex.push(i);
 	}
 	picIndex = shuffle(allIndex).slice(0,5);
 }
 window.onload = function(){
 	initTree();
 	gameStart();
 	yesBtn.onclick = answerYes;
 	noBtn.onclick = answerNo;
 	replayBtn.onclick = gameReplay;
 }

