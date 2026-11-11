const sliderTabs = document.querySelectorAll(".slider-tab");
const indicator = document.querySelector(".slider-indicator");

const updatePagination = (tab, index) => {
  indicator.style.transform = `translateX(${tab.offsetLeft - 50}px)`;
  indicator.style.transition = "transform 0.3s ease-in-out";
  indicator.style.width = `${tab.getBoundingClientRect().width}px`;
  
  sliderTabs.forEach((item) => {
    item.style.color = item === tab ? "white" : "";
  });

  const pagination = tab.parentElement;
  if (window.matchMedia("(max-width: 768px)").matches && pagination) {
    const centeredScrollLeft =
      tab.offsetLeft - (pagination.clientWidth - tab.offsetWidth) / 2;
    pagination.scrollTo({ left: centeredScrollLeft, behavior: "smooth" });
  }
};
const swiper = new Swiper(".slider-container ", {
  // Optional parameters
  direction: "horizontal",
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
  },
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  on: {
    slideChange: () => {
      const currentTab = [...sliderTabs].indexOf(
        sliderTabs[swiper.activeIndex],
      );
      updatePagination(sliderTabs[swiper.activeIndex], currentTab);
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updatePagination(tab, index);
  });
});
updatePagination(sliderTabs[0]);
window.addEventListener("resize", () =>
  updatePagination(sliderTabs[swiper.activeIndex], 0),
);
