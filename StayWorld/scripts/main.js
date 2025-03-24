class Main {
  #observers;

  constructor() {
    this.header = document.querySelector(".header");
    // swiperslider
    this.hero = new HeroSlider(".swiper");
    this.sides = document.querySelectorAll(".side");
    //ScrollObserverのクラスの呼び出しを配列にまとめる
    this.#observers = [];
    // メソッドの呼び出し
    this.#init();
  }
  #init() {
    // モバイルメニュー開閉
    new MobileMenu();
    // houseセクション向けの背景画像表示
    new showBgImg(".bg-img-zoom");
    // ページローダー完了後にscrollイベントの呼び出しをする
    Pace.on("done", this.#scrollInit.bind(this));
    // this.#scrollInit();
  }
  // scrollイベントの処理
  #scrollInit() {
    this.#observers.push(
      //headerスクロール時の背景
      new ScrollObserver(".nv-trigger", this.#navAnimation.bind(this), {
        once: false,
        rootMargin: "-300px 0px",
      }),
      // サイドメニューの表示
      new ScrollObserver("#main-content", this.#sideAnimation.bind(this), {
        once: false,
        rootMargin: "-300px 0px",
      }),
      //heroスライダーのスライダーOn/Off切り替え
      new ScrollObserver(".swiper", this.#toggleSlideAnimation.bind(this), {
        once: false,
      }),
      //画像スライド
      new ScrollObserver(".cover-slide", this.#inviewAnimation),
      //ロード完了時の浮き上がる表示
      new ScrollObserver(".appear", this.#inviewAnimation),
      //テキストアニメーション
      new ScrollObserver(".tween-animate-title", this.#textAnimation)
    );
  }
  // ↓el:交差する要素 inview:true or false
  //heroスライダーのスライダーOn/Off切り替え(cb)
  #toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }
  //headerスクロール時の背景の付与(cb)
  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      //監視対象クラスからスクロールで出た場合に、'triggered'が付与される
      this.header.classList.add("triggered");
    }
  }
  // asideの表示タイミングの調整
  #sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add("inview"));
    } else {
      this.sides.forEach((side) => side.classList.remove("inview"));
    }
  }
  //画像スライド(cb)
  #inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }
  // テキストアニメーション(cb)
  #textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }
}
new Main();

// クラス構文でまとめる前の記載-----------------------------------------------------

// const hero = new HeroSlider(".swiper");
// hero.start();

// const showBI = new showBgImg(".bg-img-zoom");
// showBI.#houseBgImgs();

// テキストアニメーション(cb)
// const cb = function (el, inview) {
//   if (inview) {
//     const ta = new TweenTextAnimation(el);
//     ta.animate();
//   }
// };
// const so = new ScrollObserver(".tween-animate-title", cb);

//画像スライド(cb)
// const inviewAnimation = function (el, inview) {
//   if (inview) {
//     el.classList.add("inview");
//   } else {
//     el.classList.remove("inview");
//   }
// };

//headerスクロール時の背景(cb)
// const header = document.querySelector(".header");
// const navAnimation = function (el, inview) {
//   if (inview) {
//     header.classList.remove("triggered");
//   } else {
//     //監視対象クラスからスクロールで出た場合に、'triggered'が付与される
//     header.classList.add("triggered");
//   }
// };

//画像スライド
// const so2 = new ScrollObserver(".cover-slide", inviewAnimation);

//headerスクロール時の背景
// const so3 = new ScrollObserver(".nv-trigger", navAnimation, {once: false});

// ハンバーガーメニュー開閉
// new MobileMenu();

// // houseセクションの画像の表示 -------------------------------------------
// class showBgImg {
//   constructor(el) {
//     this.houseBgImgs = document.querySelectorAll(el);
//   }
//   //ハウスセクション向けのbackground-imageの表示
//   #houseBgImgs() {
//     this.houseBgImgs.forEach((houseBgImg, index) => {
//       const imageUrl = `url(images/villa-${index + 1}.jpg)`;
//       houseBgImg.style.backgroundImage = imageUrl;
//     });
//   }
// }
