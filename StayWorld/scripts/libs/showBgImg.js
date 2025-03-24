// houseセクションの画像の表示 -------------------------------------------
class showBgImg {
  constructor(el) {
    this.houseBgImgs = document.querySelectorAll(el);
		this._houseBgImgs();
  }
  //ハウスセクション向けのbackground-imageの表示
  _houseBgImgs() {
    this.houseBgImgs.forEach((houseBgImg, index) => {
      const imageUrl = `url(images/villa-${index + 1}.jpg)`;
      houseBgImg.style.backgroundImage = imageUrl;
    });
  }
}
