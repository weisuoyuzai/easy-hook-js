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

    // hook(objectName,funcName,newfunc,useorigin=false){
    //     typeof newfunc=='function'?newfunc:()=>{};
    //     let _class=this.getClassName(objectName).prototype;        
    //     let originFunc=_class[funcName];            //拷贝原始方法
    //     if(typeof _class=='object'){                //判断是否对象
    //         let _method=[];                         //保存所有对象的方法名称
    //         for(let i in _class){                     
    //             _method.push(i);
    //         }
    //         if(_method.indexOf(funcName)==-1){
    //             throw '无此函数'
    //         }
    //         if(!window._originMethod){              //原始方法保存至window._originMethod中
    //             window._originMethod=new Object();
    //         }

    //         let json={
    //             funcName:originFunc
    //         }

    //         if(!window._originMethod[_class.constructor.name]){
    //             window._originMethod[_class.constructor.name]=new Object();
    //         }

    //         window._originMethod[_class.constructor.name][funcName]=originFunc;
    //         _class[funcName]=function(){
    //             newfunc();
    //             if(useorigin){                              //自定义方法
    //                 originFunc.apply(this,arguments);       //调用原始方法
    //             }
    //         };
    //         return Promise.resolve('hook success');
    //     }else{
    //         throw `${objectName} not a object`;
    //     }
        
    // },

    // unhook(objectName,funcName){
    //     let _class=this.getClassName(objectName).prototype;
    //     let originFunc=window._originMethod[_class.constructor.name][funcName];
    //     _class[funcName]=originFunc;
    // }


    hook(parent,funcName,newFunc,useorigin=false){
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

    unhook(parent,funcName){
        let name=this.getClassName(parent);
        let originFunc=window._originMethod[name][funcName];
        parent[funcName]=function(){
            originFunc.apply(this,arguments);
        }
    }
}

export default Tools;