const blockHero = document.querySelector(".terem__block-welcome");
const teremContentWrap = document.querySelector(".terem__wrap");
const secondBlockWelcome = document.querySelector(".terem__welcome");
const blockCatalog = document.querySelector(".terem__catalog");
const mainBlockCatalog = document.querySelector(".terem__block-catalog");
const blockCollection = document.querySelector(".terem__block-collection");
const header = document.querySelector(".header")
const modalWindow = document.getElementById('dialog');

window.addEventListener('load', () => {
  modalWindow.showModal()
})

window.addEventListener('click', (event) => {
  if (event.target === modalWindow) {
    modalWindow.close()
  }
})

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY

  if (scrollPos > 100) {
    header.classList.add("header__mini")
  } else {
    header.classList.remove("header__mini")
  }
})

// анимация движения блока terem
if (window.matchMedia("(min-width: 500px)").matches) {
  let isAtInitialPosition = true;
  let initialPosition
  let finalPosition = 0;
  let duration = 500;
  initialPosition = teremContentWrap.offsetTop;

  function animateElement(startPosition, endPosition) {

    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      // это коэффициент, который показывает, сколько времени прошло с начала анимации относительно её общей продолжительности.
      let percentage = Math.min(progress / duration, 1);
      // Рассчитываем текущее положение через пропорцию
      let currentPosition = startPosition + (endPosition - startPosition) * percentage;

      teremContentWrap.style.top = currentPosition + "px";

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  // Отслеживание клика на кнопку
  document.getElementById("btn-one").addEventListener("click", () => {
    if (isAtInitialPosition) {
      // Первый клик: анимация вверх
      animateElement(initialPosition, finalPosition);
      blockHero.classList.remove('back');
      blockHero.classList.add('hide');
      teremContentWrap.style.position = "relative";
      secondBlockWelcome.classList.add('hide-text');
      blockCatalog.classList.add('show-text');
    } else {
      blockHero.classList.add('back');
      secondBlockWelcome.classList.remove('hide-text');
      blockCatalog.classList.remove('show-text');
      blockCatalog.classList.add('hide-text');
      animateElement(finalPosition, initialPosition);
      setTimeout(() => {
        teremContentWrap.style.position = "static";
        blockHero.classList.remove('hide');
        teremContentWrap.style.top = 0;
      }, 550)
    }

    // Меняем флаговое состояние
    isAtInitialPosition = !isAtInitialPosition;
  });


  document.getElementById("btn-two").addEventListener("click", () => {
    // Получаем текущие координаты блоков относительно окна браузера
    const blockCatalogSite = mainBlockCatalog.getBoundingClientRect();
    const blockCollectionSite = blockCollection.getBoundingClientRect();

    // Вычисляем разницу по осям X и Y
    const deltaX = blockCollectionSite.left - blockCatalogSite.left;
    const deltaY = blockCollectionSite.top - blockCatalogSite.top;

    // Переключаем классы с динамическими значениями смещения
    mainBlockCatalog.style.transform = mainBlockCatalog.style.transform ? '' : `translate(${deltaX}px, ${deltaY}px)`;
    blockCollection.style.transform = blockCollection.style.transform ? '' : `translate(${-deltaX}px, ${-deltaY}px)`;
  })
}


