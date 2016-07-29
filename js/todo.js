/**
 * Created by yangjinfeng on 2016/7/14.
 */
window.onload = function() {
    var _$ = function (id) {
        if (id) {
            return document.getElementById(id);
        }
        else {
            throw new Error('argument cannot be null');
        }
    };
    //获得TODO
    if(localStorage.getItem('data'))
    {
        //var Data=JSON.parse(localStorage.getItem('data'));
        //for(var i=0;i<Data.time.length;i++)
        //{
        //    var para=document.createElement('li');
        //    var node=document.createElement('a');
        //    var text=document.createTextNode(Data.time[i]+' '+Data.title[i]);
        //    node.appendChild(text);
        //    para.appendChild(node);
        //    _$('ul').appendChild(para);
        //}
        fetch('http://api.neuqstlab.qoder.cn/users/todos/'+localStorage.getItem('data'),{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            return res.json();
        }).then(function(json){
            console.log(json);
        });
    }
    var data={
        time:[],
        title:[],
        data:[]
    };
    var title=_$('bt');
    var time=_$('sj');
    var content=_$('nr');
    var btn1=_$('btn1');
    var btn2=_$('btn2');
    var id=localStorage.getItem('data');

    btn1.onclick=function(){
        if(localStorage.getItem('data'))
        {
            data=JSON.parse(localStorage.getItem('data'))
        }
        data.title.push(title.value);
        data.time.push(time.value);
        data.data.push(content.value);
        localStorage.setItem("data", JSON.stringify(data));
        var para=document.createElement('li');
        var node=document.createElement('a');
        var text=document.createTextNode(time.value+' '+title.value);
        node.appendChild(text);
        para.appendChild(node);
        _$('ul').appendChild(para);

        add();
    };



    btn2.onclick=function(){
        title.value = '';
        time.value = '';
        content.value = '';
        clear();
    };


    //添加TODO
    var add=function(){
        fetch('http://api.neuqstlab.qoder.cn/users/todos/:'+id,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               title:title.value,
                time:time.value,
                cotent:content.value

            })
        }).then(function(res){
            return res.json();
        }).then(function(json){
            console.log(json);
        })
    };

    //清除功能
   var clear=function(){
       fetch('http://api.neuqstlab.qoder.cn/users/todos/'+id,{
           method:'DELETE',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           }
       }).then(function(res){
           return res.json();
       }).then(function(json){
           console.log(json);
       });
   };


    var li=document.getElementsByTagName('li');
    for(var j=0;j< li.length;j++) {
        li[j].onclick = function () {
            var a = this.getElementsByTagName('a')[0];
            time.value = a.innerHTML.split('&nbsp;')[0];
            title.value = a.innerHTML.split('&nbsp;')[1];
            content.value = this.getAttribute('data');
        }
    }



};