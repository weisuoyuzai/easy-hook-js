# 轻松hook任意原生js代码

### 用法

```javascript
import hookjs form 'easy-hook-js';
hookjs.hook(HTMLVideoElement,'requestPictureInPicture',()=>{
	//新代码
},false);

或者

hookjs.hook(document.querySelector('video'),'requestPictureInPicture',()=>{
	//新代码
},false);
```

#### 方法:
**hook(Object,原方法名,新方法,是否调用原方法[true/false])**

代码hook基本方法

**restore()**

恢复所有方法
