import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

//Locomotive init
const locoScroll = new LocomotiveScroll({
  el: document.getElementById('app'),
  smooth: true
});


/*
-------------------
Proxy  gsap + locomotive
Full documentation of proxy:  https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()
Example proxy + locomotive: https://codepen.io/GreenSock/pen/zYrELYe
Al reutilizar sustituir #app por el id del contenedor envolvente
--------------------
*/
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#app", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#app").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();