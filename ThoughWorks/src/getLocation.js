/*
  1. 题目要求输入两个值，一个是文本内容，一个是消息序列，即两个参数
  2. 判断无人机的ID和和坐标位置
  3. 无人机飞行时传回来的坐标是否有故障
  4. 消息测试
  比如： plane 1 1 1 plane 1 1 1 1 2 3
  */
  function getLocation(infomation,signalIndex){
    let planeInfomation=infomation.trim();
    let planeName=planeInfomation.split(' ')[0];
    let regName=/^[A-Za-z0-9]+$/gi;
    let location=infomation.split(`${planeName}`);//此时是带有空格的数组里面包着字符串，为了后面计算坐标方便需要转换为数字数组
    //console.log(infomation);
    let locations=location.map(function(ele,index,array){
      return ele.trim().split(' ').join('');
    }).slice(1);
    location=location.map(function(ele,index,array){
      return ele.trim().split(' ');
    }).slice(1)
    //判断坐标是不是数字
    let isNumber=locations.every(function(ele){
      return (ele-0);
    });
    if(regName.test(planeName)&&isNumber===true&&location[0].length==3){
      //如果消息不存在
      if(location.length<(signalIndex+1)){
        //alert(`Cannot found : ${signalIndex}`);有弹出框更方便看到效果
        console.log(`Cannot found : ${signalIndex}`);
        return `Cannot found : ${signalIndex}`
      }else{//消息存在，应该对坐标值进行计算
        //保存初始位置
        let a=location[0][0];
        let b=location[0][1];
        let c=location[0][2];
        let arr=[a,b,c];
        let locationArr=[];//用于保存所有的坐标值
        locationArr.push(arr);
        for(let i=0;i<location.length;i++){
          //第二行数据
          if(i==1){
            if(((location[0][0]==location[1][0])===true)&&((location[0][1]==location[1][1])===true)&&((location[0][2]==location[1][2])===true)&&(location[1].length==6)){
              a=location[1][0]-0+(location[1][3]-0);
              b=location[1][1]-0 + (location[1][4]-0);
              c=location[1][2]-0 + (location[1][5]-0);
              arr=[a,b,c];
              locationArr.push(arr);
            }else{
              //坐标有误
              let r = ["na", "na", "na"];
                locationArr.push(r);
            }
          }
          if(i>1){
            //判断当前的坐标的起始位置是不是上次坐标的位置
            if(((location[i][0]==locationArr[i-1][0])==true)&&((location[i][1]==locationArr[i-1][1])==true)&&((location[i][2]==locationArr[i-1][2])==true)&&(location[i].length==6)){
              //把坐标的起始位置加上偏移量，计算出现在坐标的位置作为下次坐标的起始位置，保存到数组
              a=location[i][0]-0+(location[i][3]-0);
              b=location[i][1]-0 + (location[i][4]-0);
              c=location[i][2]-0 + (location[i][5]-0);
              arr=[a,b,c];
              locationArr.push(arr);
            }else{
              //坐标有误
              let r = ["na", "na", "na"];
                locationArr.push(r);
            }
            }
          }
          if(locationArr[signalIndex][0]=='na'){
            console.log(`Error: ${signalIndex}`);
            //alert(`Error: ${signalIndex}`);有弹出框更方便看到效果
            return `Error: ${signalIndex}`;
          }else{
            console.log(`${planeName} ${signalIndex} ${locationArr[signalIndex]}`);
            //alert(`${planeName} ${signalIndex} ${locationArr[signalIndex]}`);有弹出框更方便看到效果
            return `${planeName} ${signalIndex} ${locationArr[signalIndex]}`;
          }
        }
      }else{
      console.log("无人机处于故障");
      //alert("无人机处于故障");
    }
  }
