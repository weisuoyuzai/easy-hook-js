import Console from './common/Console';
import tools from './common/Tools';

(function(window){
    Console.init();
    
    tools.hook(window.localStorage,'setItem',function(){
        
    });
    
    tools.hook(window,'open',function(){
        
    });


    
    
})(window);