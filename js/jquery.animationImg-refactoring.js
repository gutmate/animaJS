/**
 * jQuery.animationImg
 * @author Jinhyung Park
 * @date 2017-03-23
 */
;(function(global, $){
  'use strict';

  var plugin_name = 'animationImg';
  var run = false;

  if (!$.fn[plugin_name]) {
    $.fn[plugin_name] = function(settings) {
      if(!run) { //실행여부 체크
        run = true;
        var $this = $(this);
        var path = $this.attr('src');
        var rePath = /.+(?=[0-9]{4}.)/gm; //[첫번째 문자] ~ [4자리 숫자.] 전까지의 값을 반환 (4자리 숫자.png/jpg/gif (0000.jpg) 는 반환값에 포함되지 않는다.)
        var matchPath = path.match(rePath); //4자리 숫자.확장자를 제외한 경로부분 반환
        var reversePath = path.replace(rePath,''); //4자리 숫자.확장자 반환
        matchPath = matchPath || ['null']; //에러 방지
        var imgPath = matchPath[0]; //배열에서 값 가져오기
        var reExtn = /[0-9]+/gm; //모든 숫자 선택
        var imgExtn = reversePath.replace(reExtn,''); //4자리숫자.확장자 값에서 확장자만 반환
        var arrImg = [];
        var i;
        var anim;

        //기본값 설정 & 사용자 설정과 병합
        var option = $.extend({
          start: 0,         //시작 이미지 위치
          steps: 10,        //총 이미지 개수
          duration: 30,     //애니메이션 실행 속도
          repeat: true,     //반복
          delay: 0          //첫 시작 애니메이션 지연시간
        }, settings);

        //이미지 담아두기
        for(i=option.start; i<option.steps+1; i++) {
          if (i < 10) {
            arrImg.push(imgPath + '000' + i + imgExtn);
          } else if (i < 100) {
            arrImg.push(imgPath + '00' + i + imgExtn);
          } else if (i < 1000) {
            arrImg.push(imgPath + '0' + i + imgExtn);
          } else {
            arrImg.push(imgPath + i + imgExtn);
          }
        }

        if (matchPath[0] !== 'null') { //올바른 값일때만 실행
          setTimeout(function(){
            anim = setInterval(aniImg, option.duration);

            function aniImg() {
              option.start = option.start + 1;

              if (option.start > option.steps) {
                if (option.repeat) {
                  option.start = 0; //반복
                } else {
                  clearInterval(anim); //정지
                }
              } else {
                  $this.attr('src',arrImg[option.start]);
              }
            }

          }, option.delay);
        }

        //플러그인 종료
        $.fn[plugin_name].destroy = function() {
          clearInterval(anim);
          run = false;
        };

        //jQuery 체이닝 설정
        return this;

      } else {
        alert('중복실행은 되지 않아요!! >_<');
      }

    };
  }

})(window, window.jQuery);

/**
 * 개선해야 할 과제
 *
 * 이미지가 없어서 에러가 날 때에 에러난 시점을 저장해서 다음 반복 실행시에는
 * 종료 시점을 에러나기 전 시점으로 재실행시켜주기
 * 그러면 두번째 반복부터는 에러가 나지 않을 것이니까
 */