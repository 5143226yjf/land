/**
 * Created by yangjinfeng on 2016/7/13.
 */
window.onload = function(){
    var _$ = function(id){
        if(id){
            return document.getElementById(id);
        }
        else{
            throw new Error('argument cannot be null');
        }
    };
    var name =  _$('name');
    var password = _$('pass');
    var btn = _$('btn');
    var parameter=_$('parameter');

    var exp={
        name:/^[\u4e00-\u9fa5]{2,10}$/,
        pass:/^\w{6,12}$/
    };
    var check = function(exp,value){
        return exp.test(value);
    };
    function uppercase(){
        if(localStorage.getItem('data1')) {
            var Data = JSON.parse(localStorage.getItem('data1'));
            for(var i = 0; i < Data.name.length; i++) {
                if ( Data.name[i]=name.value) {
                    console.log(Data.name[i]);
                    password.value = Data.password[i];
                    return password.value;
                }
                else{
                    password.value='';
                }
            }
        }
    }
    name.onblur=uppercase;
    var isLegal = function(){
        if(!check(exp.name,name.value)){
            alert("请输入正确的中文用户名");
            return false;
        }
        if(!check(exp.pass,password.value)){
            alert("密码输入错误");
            return false;
        }
        fetch('http://api.neuqstlab.qoder.cn/users/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                password: password.value
            })
        }).then(function(res){
            return res.json();
        }).then(function(json){
            console.log(json);
            localStorage.setItem('id',json.data.id);
        });
        return true;
    };

    var login = function(){
        if(isLegal()){
            location.href= './index.html';
            alert("登录成功");
            a();
        }
    };
    var data1={
        name:[],
        password:[]
    };
    //密码保存
     var a=function (){
        if(parameter.checked == true)
        {
            //把用户名和密码存入LocalStorage
            if(localStorage.getItem('data1'))
            {
                data1=JSON.parse(localStorage.getItem('data1'))
            }
            data1.name.push(name.value);
            data1.password.push(password.value);
            localStorage.setItem("data1", JSON.stringify(data1));
        }

    };


    btn.onclick=login;


};
