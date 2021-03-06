(() => {
  "use strict";
  const e = {};
  let t = !0,
    o = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function a(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function n(e) {
    return e.filter(function (e, t, o) {
      return o.indexOf(e) === t;
    });
  }
  let s = (e, t = !1, r = 500, n = 0) => {
    const s = "string" == typeof e ? document.querySelector(e) : e;
    if (s) {
      let c = "",
        l = 0;
      t &&
        ((c = "header.header"), (l = document.querySelector(c).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: r,
        header: c,
        offset: n,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(s, "", i);
      else {
        let e = s.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      a(`[gotoBlock]: ????????...???????? ?? ${e}`);
    } else a(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${e}`);
  };
  let c = {
    getErrors(e) {
      let t = 0,
        o = e.querySelectorAll("*[data-required]");
      return (
        o.length &&
          o.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let o = t.querySelectorAll("input,textarea");
          for (let e = 0; e < o.length; e++) {
            const t = o[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              c.removeError(t);
          }
          let r = t.querySelectorAll(".checkbox__input");
          if (r.length > 0)
            for (let e = 0; e < r.length; e++) {
              r[e].checked = !1;
            }
          if (e.select) {
            let o = t.querySelectorAll(".select");
            if (o.length)
              for (let t = 0; t < o.length; t++) {
                const r = o[t].querySelector("select");
                e.select.selectBuild(r);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${e.length})...`
        ),
          n(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let o = t.split("|"),
              r = { root: o[0], margin: o[1], threshold: o[2] },
              a = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  o = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  a = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === r.root &&
                  String(o) === r.margin &&
                  String(a) === r.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(r);
            this.scrollWatcherInit(a, n);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${e.root} ?????? ???? ????????????????`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${t.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${t.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && a(`[??????????????????????]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const o = e.target;
      this.scrollWatcherIntersecting(e, o),
        o.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(o, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let l = !1;
  setTimeout(() => {
    if (l) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const i = document.querySelector(".about");
  i &&
    document.addEventListener("watcherCallback", function (e) {
      const t = e.detail.entry;
      "penguin" === t.target.dataset.watch &&
        (t.isIntersecting
          ? i.classList.add("_penguin-frame")
          : i.classList.remove("_penguin-frame"));
    });
  const d = document.querySelector(".advantages");
  d &&
    document.addEventListener("watcherCallback", function (e) {
      const t = e.detail.entry;
      "card-anim" === t.target.dataset.watch &&
        (t.isIntersecting
          ? d.classList.add("_cards-animation")
          : d.classList.remove("_cards-animation"));
    }),
    document.addEventListener("click", function (e) {
      const t = e.target;
      if (t.closest("[data-target]") && innerWidth < 991.98) {
        const o = t.dataset.target ? t.dataset.target : null,
          r = document.querySelector(`[data-card-content='${o}']`),
          a = document.querySelector(`[data-items='${o}']`);
        r
          ? (a.classList.toggle("_hide"), r.classList.toggle("_active"))
          : console.log("ouh, nothing there!"),
          e.preventDefault();
      }
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          t &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? o(e) : r(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            c.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && c.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const o = document.forms;
      if (o.length)
        for (const e of o)
          e.addEventListener("submit", function (e) {
            r(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              c.formClean(t);
            });
      async function r(e, o) {
        if (0 === (t ? c.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            o.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              r = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              a = new FormData(e);
            e.classList.add("_sending");
            const s = await fetch(t, { method: r, body: a });
            if (s.ok) {
              await s.json();
              e.classList.remove("_sending"), n(e);
            } else alert("????????????"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (o.preventDefault(), n(e));
        } else {
          o.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && s(t, !0, 1e3);
        }
      }
      function n(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } })
        ),
          setTimeout(() => {
            if (e.popup) {
              const o = t.dataset.popupMessage;
              o && e.popup.open(o);
            }
          }, 0),
          c.formClean(t),
          a(`[??????????]: ${"?????????? ????????????????????!"}`);
      }
    })(!0),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const o = t.closest("[data-goto]"),
              r = o.dataset.goto ? o.dataset.goto : "",
              a = !!o.hasAttribute("data-goto-header"),
              n = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            s(r, a, n), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            o = t.target;
          if ("navigator" === o.dataset.watch) {
            const e = o.id,
              r =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? r && r.classList.add("_navigator-active")
              : r && r.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })();
})();
