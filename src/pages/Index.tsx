import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMAGE = "https://cdn.poehali.dev/projects/4a003fd6-c86a-4f2a-a535-e6526bf3cbbb/files/d893ec01-a636-4b21-b925-c79414bf9c69.jpg";
const MOVERS_IMAGE = "https://cdn.poehali.dev/projects/4a003fd6-c86a-4f2a-a535-e6526bf3cbbb/files/4e3ac0ce-25a6-4feb-ab29-2b7334f458c8.jpg";
const LOADING_IMAGE = "https://cdn.poehali.dev/projects/4a003fd6-c86a-4f2a-a535-e6526bf3cbbb/files/b0e6503b-f57b-4287-be91-91af5d0ca04a.jpg";
const WORKERS_IMAGE = "https://cdn.poehali.dev/projects/4a003fd6-c86a-4f2a-a535-e6526bf3cbbb/files/ba7d497b-6caf-4793-8f64-30b38242670d.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Цены", href: "#prices" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Truck", title: "Газель Стандарт", desc: "Перевозка мебели, техники, коробок. Грузоподъёмность до 1.5 тонны.", tag: "до 1.5 т", price: "от 1 200 ₽/ч" },
  { icon: "Package", title: "Газель ГАЗ", desc: "Крупногабаритные грузы, переезды квартир и офисов. До 3 тонн.", tag: "до 3 т", price: "от 1 800 ₽/ч" },
  { icon: "Users", title: "Грузчики", desc: "Профессиональные грузчики для погрузки, разгрузки и переноса любых грузов.", tag: "2–6 чел", price: "от 400 ₽/ч" },
  { icon: "Wrench", title: "Разнорабочие", desc: "Демонтаж, сборка мебели, уборка строительного мусора.", tag: "любые задачи", price: "от 350 ₽/ч" },
  { icon: "Home", title: "Переезды", desc: "Квартирные и офисные переезды под ключ: упаковка, перевозка, расстановка.", tag: "под ключ", price: "по проекту" },
  { icon: "Building2", title: "Стройматериалы", desc: "Доставка кирпича, плитки, сыпучих грузов и строительного инструмента.", tag: "тяжёлые грузы", price: "от 1 800 ₽/ч" },
];

const PRICES = [
  {
    name: "Газель Стандарт",
    price: "от 1 200 ₽",
    unit: "в час",
    features: ["Кузов 3×1.8×1.8 м", "До 1.5 тонны", "Водитель в комплекте", "Работа в городе и МО"],
    popular: false,
  },
  {
    name: "Газель ГАЗ",
    price: "от 1 800 ₽",
    unit: "в час",
    features: ["Кузов 4.2×2×2 м", "До 3 тонн", "Водитель в комплекте", "Межгород + МКД"],
    popular: true,
  },
  {
    name: "Грузчики",
    price: "от 400 ₽",
    unit: "в час",
    features: ["Минимум 2 человека", "Подъём на этаж включён", "Опытные специалисты", "Бережная работа"],
    popular: false,
  },
];

const ADVANTAGES = [
  { icon: "Clock", title: "Подача за 40 минут", desc: "Быстро реагируем и подаём машину в течение 40 минут после подтверждения." },
  { icon: "Shield", title: "Страхование груза", desc: "Все перевозки застрахованы. Несём ответственность за сохранность имущества." },
  { icon: "BadgeCheck", title: "Опытная команда", desc: "Водители с опытом от 5 лет, трезвые и вежливые. Работаем без нареканий." },
  { icon: "Banknote", title: "Честные цены", desc: "Никаких скрытых доплат. Цена по счётчику — платите только за фактическое время." },
  { icon: "Phone", title: "Работаем 24/7", desc: "Принимаем заказы круглосуточно, включая выходные и праздники." },
  { icon: "MapPin", title: "Вся Россия", desc: "Работаем по Москве, Московской области и выполняем межгородние перевозки." },
];

const REVIEWS = [
  { name: "Алексей М.", rating: 5, text: "Переезжали из 3-комнатной. Всё сделали чётко, быстро, без повреждений. Очень доволен!", date: "15 марта 2025", job: "Квартирный переезд" },
  { name: "Ольга К.", rating: 5, text: "Заказывала газель для перевозки мебели. Ребята приехали вовремя, помогли разобрать шкаф.", date: "2 февраля 2025", job: "Перевозка мебели" },
  { name: "Дмитрий Р.", rating: 5, text: "Использую компанию уже 3 года для доставки стройматериалов. Надёжные, пунктуальные.", date: "20 января 2025", job: "Стройматериалы" },
  { name: "Марина В.", rating: 4, text: "Хорошая работа. Грузчики аккуратные. Немного опоздали, но предупредили заранее.", date: "10 декабря 2024", job: "Офисный переезд" },
];

const STEPS = [
  { num: "01", title: "Оставьте заявку", desc: "Заполните форму или позвоните нам" },
  { num: "02", title: "Рассчитаем цену", desc: "Уточним детали и назовём стоимость" },
  { num: "03", title: "Подача машины", desc: "Газель приедет в удобное время" },
  { num: "04", title: "Готово!", desc: "Груз доставлен, оплата по факту" },
];

const TICKER_ITEMS = [
  "Перевозки по Москве", "Газели под ключ", "Грузчики 24/7",
  "Офисные переезды", "Стройматериалы", "Межгород",
  "Подача 40 мин", "Страхование груза", "Работаем с 2019",
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-left").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-base ${i < rating ? "text-brand-orange" : "text-white/10"}`}>★</span>
      ))}
    </div>
  );
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start = 0;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(start);
        if (start >= target) clearInterval(timer);
      }, 16);
      observer.disconnect();
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

function CountStat({ num, label, suffix = "" }: { num: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className="stat-pill">
      <div className="font-oswald text-3xl sm:text-4xl font-bold text-gradient">{count.toLocaleString("ru-RU")}{suffix}</div>
      <div className="text-white/40 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function Index() {
  useScrollAnimation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", from: "", to: "", date: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [calcData, setCalcData] = useState({ service: "gazelle", hours: 3, movers: 0, distance: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const calcPrice = () => {
    const base = calcData.service === "gazelle" ? 1200 : calcData.service === "gazelle-big" ? 1800 : 0;
    const moverCost = calcData.movers * 400;
    const distanceCost = calcData.distance > 0 ? calcData.distance * 25 : 0;
    return (base + moverCost) * calcData.hours + distanceCost;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] font-golos overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[70px]">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B00] to-[#FF8C38] rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(255,107,0,0.4)] group-hover:shadow-[0_4px_20px_rgba(255,107,0,0.6)] transition-shadow">
              <Icon name="Truck" size={18} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-xl text-white tracking-wider">
              ГРУЗОВОЗ<span className="text-gradient">ПРО</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+79001234567"
              className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm tracking-wide transition-colors">
              <div className="w-7 h-7 bg-[#FF6B00]/15 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={13} className="text-brand-orange" />
              </div>
              +7 (900) 123-45-67
            </a>
            <a href="#order" className="hidden sm:block btn-orange px-5 py-2.5 rounded-xl text-sm text-white">
              Заказать
            </a>
            <button className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0e0e0e]/98 backdrop-blur-2xl border-t border-white/5 px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/5 py-3 px-4 rounded-xl font-oswald uppercase tracking-wide text-sm transition-all">
                {l.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5">
              <a href="tel:+79001234567" className="flex items-center gap-2 text-brand-orange font-oswald font-bold text-lg">
                <Icon name="Phone" size={18} />
                +7 (900) 123-45-67
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-[70px] overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[radial-gradient(circle_at_70%_20%,rgba(255,107,0,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_20%_80%,rgba(255,107,0,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div style={{ animation: "fade-in 0.8s ease-out forwards" }}>
              <div className="label-tag mb-6">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                Работаем 24/7 · Подача за 40 минут
              </div>

              <h1 className="font-oswald font-bold text-[clamp(52px,8vw,88px)] leading-[0.95] text-white uppercase mb-6 tracking-tight">
                Газели<br />
                <span className="text-gradient text-glow">и Грузчики</span><br />
                <span className="text-white/30">в Москве</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                Перевозки на газелях ГАЗ, профессиональные грузчики<br />
                и разнорабочие. Работаем без выходных.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <a href="#order" className="btn-orange px-8 py-4 rounded-2xl text-white font-oswald text-lg">
                  Заказать перевозку
                </a>
                <a href="#calculator" className="btn-outline px-8 py-4 rounded-2xl text-white font-oswald text-lg flex items-center gap-2">
                  <Icon name="Calculator" size={18} />
                  Рассчитать цену
                </a>
              </div>

              {/* Stats row */}
              <div className="flex border border-white/6 rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm divide-x divide-white/6">
                <CountStat num={1200} label="выполненных заказов" suffix="+" />
                <CountStat num={5} label="лет на рынке" suffix="" />
                <CountStat num={40} label="мин подача" suffix="" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative" style={{ animation: "slide-right 0.9s ease-out 0.2s both" }}>
              <div className="absolute inset-[-20%] bg-[radial-gradient(circle,rgba(255,107,0,0.15)_0%,transparent_65%)] pointer-events-none" />

              <div className="relative rounded-[28px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/8">
                <img src={TRUCK_IMAGE} alt="Газель ГрузовозПРО" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
                {/* Bottom label on image */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="float-badge flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                      <Icon name="Star" size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-white font-oswald font-bold text-sm">4.9 / 5.0</div>
                      <div className="text-white/40 text-xs">1200+ отзывов</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute -top-5 -right-5 float-badge flex items-center gap-3"
                style={{ animation: "float-slow 4s ease-in-out infinite" }}>
                <div className="w-9 h-9 bg-green-500/15 rounded-xl flex items-center justify-center">
                  <Icon name="CheckCircle" size={18} className="text-green-400" />
                </div>
                <div>
                  <div className="text-white font-oswald font-bold text-sm">Страховка</div>
                  <div className="text-white/40 text-xs">на весь груз</div>
                </div>
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute -bottom-5 -left-5 float-badge flex items-center gap-3"
                style={{ animation: "float-slow 4s ease-in-out 2s infinite" }}>
                <div className="w-9 h-9 bg-[#FF6B00]/15 rounded-xl flex items-center justify-center">
                  <Icon name="Clock" size={18} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-white font-oswald font-bold text-sm">40 минут</div>
                  <div className="text-white/40 text-xs">подача машины</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-orange" />
          <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Листайте</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-4 border-y border-white/5 bg-[#0e0e0e] overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8 text-white/25 text-sm font-oswald uppercase tracking-[0.15em]">
                {item}
                <span className="w-1.5 h-1.5 bg-brand-orange/40 rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-5 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3">
            {STEPS.map((step, i) => (
              <div key={i} className="relative p-6 animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 h-px bg-gradient-to-r from-brand-orange/30 to-transparent z-10" />
                )}
                <div className="font-oswald text-5xl font-bold text-gradient opacity-40 leading-none mb-4">{step.num}</div>
                <div className="font-oswald font-bold text-white text-base uppercase tracking-wide mb-1">{step.title}</div>
                <div className="text-white/35 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 px-5 sm:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 animate-on-scroll">
            <div>
              <div className="divider-orange mb-4" />
              <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Наши<br />Услуги</h2>
            </div>
            <p className="text-white/40 text-lg max-w-xs lg:text-right leading-relaxed">
              Полный спектр транспортных услуг для частных лиц и бизнеса
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-premium rounded-[24px] p-7 animate-on-scroll" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="icon-box">
                    <Icon name={s.icon} size={22} className="text-brand-orange" fallback="Package" />
                  </div>
                  <span className="label-tag">{s.tag}</span>
                </div>
                <h3 className="font-oswald text-xl font-bold text-white uppercase mb-2 tracking-wide">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="font-oswald font-bold text-gradient text-lg">{s.price}</span>
                  <a href="#order" className="flex items-center gap-1.5 text-white/40 hover:text-brand-orange text-sm transition-colors group">
                    Заказать <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-28 px-5 sm:px-8 bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Калькулятор</h2>
            <p className="text-white/40 text-lg">Рассчитайте стоимость вашей перевозки онлайн</p>
          </div>

          <div className="bg-[#111111] border border-white/6 rounded-[32px] overflow-hidden animate-on-scroll">
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              {/* Controls */}
              <div className="p-8 sm:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-white/5">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-[0.14em] font-semibold mb-4 block">Тип транспорта</label>
                  <div className="space-y-2.5">
                    {[
                      { val: "gazelle", label: "Газель Стандарт", price: "1 200 ₽/ч", icon: "Truck" },
                      { val: "gazelle-big", label: "Газель ГАЗ", price: "1 800 ₽/ч", icon: "Package" },
                      { val: "none", label: "Только грузчики", price: "по числу", icon: "Users" },
                    ].map((opt) => (
                      <button key={opt.val} onClick={() => setCalcData({ ...calcData, service: opt.val })}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-[14px] border transition-all text-left ${
                          calcData.service === opt.val
                            ? "border-brand-orange/50 bg-[#FF6B00]/8 text-white"
                            : "border-white/6 text-white/40 hover:border-white/15 hover:text-white/60"
                        }`}>
                        <Icon name={opt.icon} size={18} className={calcData.service === opt.val ? "text-brand-orange" : "text-white/20"} fallback="Package" />
                        <span className="font-medium flex-1">{opt.label}</span>
                        <span className={`font-oswald font-bold text-sm ${calcData.service === opt.val ? "text-brand-orange" : "text-white/20"}`}>{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-white/50 text-xs uppercase tracking-[0.14em] font-semibold">Время работы</label>
                      <span className="text-brand-orange font-oswald font-bold">{calcData.hours} ч</span>
                    </div>
                    <input type="range" min={1} max={12} value={calcData.hours}
                      onChange={(e) => setCalcData({ ...calcData, hours: +e.target.value })}
                      className="w-full accent-[#FF6B00] h-1.5" />
                    <div className="flex justify-between text-xs text-white/20 mt-2"><span>1 ч</span><span>12 ч</span></div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-white/50 text-xs uppercase tracking-[0.14em] font-semibold">Грузчики</label>
                      <span className="text-brand-orange font-oswald font-bold">{calcData.movers} чел.</span>
                    </div>
                    <input type="range" min={0} max={6} value={calcData.movers}
                      onChange={(e) => setCalcData({ ...calcData, movers: +e.target.value })}
                      className="w-full accent-[#FF6B00] h-1.5" />
                    <div className="flex justify-between text-xs text-white/20 mt-2"><span>0</span><span>6 чел</span></div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-white/50 text-xs uppercase tracking-[0.14em] font-semibold">Пробег за МКАД</label>
                      <span className="text-brand-orange font-oswald font-bold">{calcData.distance} км</span>
                    </div>
                    <input type="range" min={0} max={200} step={5} value={calcData.distance}
                      onChange={(e) => setCalcData({ ...calcData, distance: +e.target.value })}
                      className="w-full accent-[#FF6B00] h-1.5" />
                    <div className="flex justify-between text-xs text-white/20 mt-2"><span>В городе</span><span>200 км</span></div>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="text-white/30 text-xs uppercase tracking-[0.14em] font-semibold mb-4">Итоговая стоимость</div>
                <div className="font-oswald text-[clamp(42px,8vw,72px)] font-bold text-gradient leading-none mb-2">
                  {calcPrice().toLocaleString("ru-RU")} ₽
                </div>
                <div className="text-white/25 text-sm mb-10">Примерно · Точная цена после звонка</div>

                <div className="space-y-3 mb-8">
                  {[
                    { label: "Транспорт", val: calcData.service === "gazelle" ? "Газель Стандарт" : calcData.service === "gazelle-big" ? "Газель ГАЗ" : "Без авто" },
                    { label: "Время", val: `${calcData.hours} ч` },
                    { label: "Грузчики", val: `${calcData.movers} чел.` },
                    { label: "Пробег МО", val: calcData.distance > 0 ? `${calcData.distance} км` : "Москва" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-white/30">{item.label}</span>
                      <span className="text-white/70 font-medium">{item.val}</span>
                    </div>
                  ))}
                </div>

                <a href="#order" className="btn-orange w-full py-4 rounded-2xl text-white font-oswald text-base text-center">
                  Заказать за эту цену
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICES ── */}
      <section id="prices" className="py-28 px-5 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Тарифы</h2>
            <p className="text-white/40 text-lg">Честные цены без скрытых платежей</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PRICES.map((p, i) => (
              <div key={i} className={`relative rounded-[28px] p-8 animate-on-scroll transition-all ${
                p.popular
                  ? "bg-gradient-to-br from-[#1a0d00] via-[#130900] to-[#0e0a06] border border-[#FF6B00]/40 shadow-[0_0_60px_rgba(255,107,0,0.15),inset_0_1px_0_rgba(255,107,0,0.15)]"
                  : "card-premium"
              }`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF8C38] text-white text-xs font-oswald font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-[0_4px_20px_rgba(255,107,0,0.4)]">
                    Популярный
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-oswald text-xl font-bold text-white/70 uppercase tracking-wide mb-4">{p.name}</h3>
                  <div className="flex items-end gap-2">
                    <span className="font-oswald text-4xl font-bold text-gradient">{p.price}</span>
                    <span className="text-white/30 text-sm mb-1.5">{p.unit}</span>
                  </div>
                </div>

                <div className="line-sep mb-6" />

                <ul className="space-y-3.5 mb-8">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-white/55 text-sm">
                      <div className="w-5 h-5 bg-[#FF6B00]/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={11} className="text-brand-orange" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#order" className={`block text-center py-3.5 px-6 rounded-2xl font-oswald font-bold uppercase tracking-wide transition-all text-sm ${
                  p.popular ? "btn-orange text-white" : "btn-outline"
                }`}>
                  Заказать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-28 px-5 sm:px-8 bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 animate-on-scroll">
            <div>
              <div className="divider-orange mb-4" />
              <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Почему<br />выбирают нас</h2>
            </div>
            <p className="text-white/40 text-lg max-w-xs lg:text-right">
              6 причин доверить перевозку<br />ГрузовозПРО
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="card-glass rounded-[24px] p-7 flex gap-5 animate-on-scroll group" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="icon-box group-hover:bg-[#FF6B00]/20 group-hover:border-[#FF6B00]/30 transition-colors">
                  <Icon name={a.icon} size={22} className="text-brand-orange" fallback="Star" />
                </div>
                <div>
                  <h3 className="font-oswald font-bold text-white text-base uppercase tracking-wide mb-1.5">{a.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-28 px-5 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Наша Работа</h2>
            <p className="text-white/40 text-lg">Как мы работаем — в фотографиях</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { img: LOADING_IMAGE, tag: "Погрузка", title: "Газель ГАЗ" },
              { img: MOVERS_IMAGE, tag: "Переезд", title: "Грузчики" },
              { img: WORKERS_IMAGE, tag: "Стройка", title: "Разнорабочие" },
            ].map((item, i) => (
              <div key={i} className={`relative rounded-[24px] overflow-hidden border border-white/6 group cursor-pointer animate-on-scroll ${i === 1 ? "md:mt-8" : ""}`}
                style={{ height: "340px", transitionDelay: `${i * 0.1}s` }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" style={{ transitionDuration: "700ms" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-[#080808]/20 to-transparent" />
                <div className="absolute inset-0 bg-[#FF6B00]/0 group-hover:bg-[#FF6B00]/5 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6">
                  <span className="label-tag mb-2 inline-flex">{item.tag}</span>
                  <div className="font-oswald font-bold text-white text-xl mt-1">{item.title}</div>
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Icon name="Expand" size={16} className="text-white" fallback="ZoomIn" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-28 px-5 sm:px-8 bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Отзывы</h2>
            <p className="text-white/40 text-lg">Более 1200 выполненных заказов</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-premium rounded-[24px] p-6 animate-on-scroll flex flex-col" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <StarRating rating={r.rating} />
                  <span className="label-tag text-[10px]">{r.job}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">«{r.text}»</p>
                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <div>
                    <div className="font-oswald font-bold text-white text-sm">{r.name}</div>
                    <div className="text-white/25 text-xs mt-0.5">{r.date}</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/5 rounded-full flex items-center justify-center border border-[#FF6B00]/20">
                    <span className="text-brand-orange text-xs font-oswald font-bold">{r.name[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section id="order" className="py-28 px-5 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Оставить Заявку</h2>
            <p className="text-white/40 text-lg">Перезвоним в течение 5 минут</p>
          </div>

          {formSent ? (
            <div className="text-center py-20 animate-on-scroll">
              <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                <Icon name="CheckCircle" size={44} className="text-green-400" />
              </div>
              <h3 className="font-oswald text-4xl font-bold text-white mb-3 uppercase">Заявка принята!</h3>
              <p className="text-white/40 text-lg mb-8">Наш менеджер свяжется с вами в течение 5 минут.</p>
              <button onClick={() => setFormSent(false)} className="text-brand-orange hover:text-[#FF8C38] text-sm transition-colors underline underline-offset-4">
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="bg-[#0f0f0f] border border-white/6 rounded-[32px] p-8 sm:p-10 space-y-5 animate-on-scroll">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Ваше имя *</label>
                  <input type="text" required placeholder="Иван Иванов" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-premium" />
                </div>
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Телефон *</label>
                  <input type="tel" required placeholder="+7 (___) ___-__-__" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-premium" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Откуда</label>
                  <input type="text" placeholder="Адрес забора" value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="input-premium" />
                </div>
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Куда</label>
                  <input type="text" placeholder="Адрес доставки" value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="input-premium" />
                </div>
              </div>

              <div>
                <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Дата и время</label>
                <input type="datetime-local" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-premium" style={{ colorScheme: "dark" }} />
              </div>

              <div>
                <label className="text-white/35 text-xs uppercase tracking-[0.14em] font-semibold mb-2.5 block">Комментарий</label>
                <textarea rows={3} placeholder="Что нужно перевезти, этаж, наличие лифта..." value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="input-premium resize-none" />
              </div>

              <button type="submit" className="btn-orange w-full py-5 rounded-2xl text-white font-oswald text-lg">
                Отправить заявку
              </button>
              <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-28 px-5 sm:px-8 bg-[#0c0c0c] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-5xl sm:text-6xl text-white mb-3">Контакты</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (900) 123-45-67", sub: "Звонки 24/7", href: "tel:+79001234567" },
              { icon: "MessageCircle", title: "WhatsApp", value: "Написать в WhatsApp", sub: "Быстрый ответ", href: "https://wa.me/79001234567" },
              { icon: "MapPin", title: "Район работы", value: "Москва и МО", sub: "Межгород по договору", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="card-glass rounded-[24px] p-7 flex gap-5 animate-on-scroll group"
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="icon-box-lg group-hover:bg-[#FF6B00]/20 transition-colors">
                  <Icon name={c.icon} size={26} className="text-brand-orange" fallback="Phone" />
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-[0.14em] font-semibold mb-2">{c.title}</div>
                  <div className="font-oswald font-bold text-white text-xl leading-tight">{c.value}</div>
                  <div className="text-white/35 text-sm mt-1">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080808] border-t border-white/5 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B00] to-[#FF8C38] rounded-xl flex items-center justify-center">
                <Icon name="Truck" size={18} className="text-white" />
              </div>
              <span className="font-oswald font-bold text-xl text-white tracking-wider">
                ГРУЗОВОЗ<span className="text-gradient">ПРО</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              {NAV_LINKS.slice(0, 4).map((l) => (
                <a key={l.href} href={l.href} className="text-white/25 hover:text-white/60 text-sm transition-colors hidden sm:block">{l.label}</a>
              ))}
            </div>

            <a href="tel:+79001234567" className="text-white/60 hover:text-white font-medium transition-colors text-sm">
              +7 (900) 123-45-67
            </a>
          </div>

          <div className="line-sep mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm text-center">
              © 2025 ГрузовозПРО. Грузоперевозки на газели, грузчики и разнорабочие в Москве.
            </p>
            <div className="flex items-center gap-2 text-white/15 text-xs">
              <Icon name="Shield" size={12} className="text-white/20" />
              Политика конфиденциальности
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
