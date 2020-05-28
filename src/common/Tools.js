const Tools={
    // constructor(){

    // }

    getClassName(objectName){

        let className=objectName.__proto__.constructor.name;
        // console.log(className);
        return className;
        switch(className){
            case 'Storage':
                return Storage;
            case 'Location':
                return Location;
            case 'Console':
                return Console;
            default:
                return Object;
        }
    },


    hook1(parent,funcName,newFunc,useorigin=false){
        typeof newFunc=='function'?newFunc:function(){};
        let name=this.getClassName(parent);
        let originFunc=parent[funcName];
        return new Promise((reslove,reject)=>{
            let _method=[];                         //保存所有对象的方法名称
            for(let i in parent){                     
                _method.push(i);
            }
            if(_method.indexOf(funcName)==-1){
                throw '无此函数'
            }
            if(!window._originMethod){              //原始方法保存至window._originMethod中
                window._originMethod=new Object();
            }
            if(!window._originMethod[name]){
                window._originMethod[name]=new Object();
            }
            window._originMethod[name][funcName]=originFunc //保存


            try {
                parent[funcName]=function(){
                    newFunc(originFunc);
                    useorigin&&originFunc.apply(this,arguments);        //调用原始方法
                };

                reslove('success');
            } catch (error) {
                reject(error);
            }
            
        })
    },

    unhook2(parent,funcName){
        let name=this.getClassName(parent);
        let originFunc=window._originMethod[name][funcName];
        parent[funcName]=function(){
            originFunc.apply(this,arguments);
        }
    },

    getFuncName(obj){
        let a=String(obj);
        let b=a.match(/function (.*)\(\)/);
        if(b){
            return b[1];
        }else{
            throw new Error('找不到对象');
        }
        
    },

    hook2(parent,funcName,newFunc,useorigin=false){
        let name=this.getFuncName(parent);
        let _origin=window[name].prototype[funcName];
        if(_origin){
            if(!window._originMethod2){              //原始方法保存至window._originMethod中
                window._originMethod2=new Object();
            }
            if(!window._originMethod2[name]){
                window._originMethod2[name]=new Object();
            }
            window._originMethod2[name][funcName]=_origin;
            parent.prototype[funcName]=function(){
                newFunc(_origin);
                useorigin&&_origin.apply(this,arguments); 
            }
            return window._originMethod2;
        }else{
            throw new Error(`${name}中无${funcName}函数`);
        }
        
    },

    unhook2(parent,funcName){
        let name=this.getFuncName(parent);
        let originFunc=window._originMethod2[name][funcName];
        parent.prototype[funcName]=function(){
            originFunc.apply(this,arguments);
        }
    },

    hook(parent,funcName,newFunc,useorigin=false){
        let a=String(parent);
        let b=/\[object (.*)\]/.test(a);
        if(b){
            this.hook1.apply(this,arguments);
        }else{
            this.hook2.apply(this,arguments);
        }
    },

    unhook(parent,funcName){
        let a=String(parent);
        let b=/\[object (.*)\]/.test(a);
        if(b){
            this.unhook1.apply(this,arguments);
        }else{
            this.unhook2.apply(this,arguments);
        }
    },

    restore(){
        for(let k in window._originMethod){
            console.log(k);
            for(let i in window._originMethod[k]){
                window[k].prototype[i]=function(){
                    window._originMethod[k][i].apply(this,arguments);
                }
            }
        }
        for(let k in window._originMethod2){
            for(let i in window._originMethod2[k]){
                console.log(window[k]);
                window[k].prototype[i]=function(){
                    window._originMethod2[k][i].apply(this,arguments);
                }
            }
        }
    }
}

export default Tools;