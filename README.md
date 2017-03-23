# jQuery image animation

jQuery image animation

## 의존파일

```html
<script src="jquery-1.11.3.js"></script> <!-- jQuery 필수-->
<script src="jquery.animationjs-1.0.js"></script>
```

## 실행

html

```html
<img src="../images/animation_0000.png" class="animation_img">
```

javascript

```javascript
$(document).ready(function(){
  $('.animation_img').animationImg({
    startNum: 0,    //{number}    시작 이미지
    steps: 10,      //{number}    이미지 총 개수
    duration: 30,   //{number}    애니메이션 실행 속도
    repeat: true,   //{boolean}   반복 유무
    delay: 0        //{number}    애니메이션 시작하기 전 딜레이
  });
});
```
