import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMAGE = "https://cdn.poehali.dev/projects/4a003fd6-c86a-4f2a-a535-e6526bf3cbbb/files/d893ec01-a636-4b21-b925-c79414bf9c69.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Цены", href: "#prices" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Truck", title: "Газель Стандарт", desc: "Перевозка небольших грузов, мебели, техники. Грузоподъёмность до 1.5 тонны.", tag: "до 1.5 т" },
  { icon: "Package", title: "Газель ГАЗ", desc: "Крупногабаритные грузы, переезды квартир и офисов. Грузоподъёмность до 3 тонн.", tag: "до 3 т" },
  { icon: "Users", title: "Грузчики", desc: "Профессиональные грузчики для погрузки, разгрузки и переноса любых грузов.", tag: "2–6 чел" },
  { icon: "Wrench", title: "Разнорабочие", desc: "Помощь с демонтажом, сборкой мебели, уборкой строительного мусора.", tag: "любые задачи" },
  { icon: "Home", title: "Переезды", desc: "Квартирные и офисные переезды под ключ: упаковка, перевозка, расстановка.", tag: "под ключ" },
  { icon: "Building2", title: "Стройматериалы", desc: "Доставка кирпича, плитки, сыпучих грузов и строительного инструмента.", tag: "тяжёлые грузы" },
];

const PRICES = [
  {
    name: "Газель Стандарт",
    price: "от 1 200 ₽/час",
    features: ["Кузов 3×1.8×1.8 м", "До 1.5 тонны", "Водитель в комплекте", "Работа в городе и МО"],
    popular: false,
  },
  {
    name: "Газель ГАЗ",
    price: "от 1 800 ₽/час",
    features: ["Кузов 4.2×2×2 м", "До 3 тонн", "Водитель в комплекте", "Межгород + МКД"],
    popular: true,
  },
  {
    name: "Грузчики",
    price: "от 400 ₽/час",
    features: ["Минимум 2 человека", "Подъём на этаж включён", "Опытные специалисты", "Бережная работа"],
    popular: false,
  },
];

const ADVANTAGES = [
  { icon: "Clock", title: "Подача за 40 минут", desc: "Быстро реагируем на заявки и подаём машину в течение 40 минут после подтверждения." },
  { icon: "Shield", title: "Страхование груза", desc: "Все перевозки застрахованы. Несём ответственность за сохранность вашего имущества." },
  { icon: "BadgeCheck", title: "Опытная команда", desc: "Водители с опытом от 5 лет, трезвые и вежливые. Работаем без нареканий." },
  { icon: "Banknote", title: "Честные цены", desc: "Никаких скрытых доплат. Цена по счётчику — платите только за фактическое время." },
  { icon: "Phone", title: "Работаем 24/7", desc: "Принимаем заказы круглосуточно, в том числе в выходные и праздники." },
  { icon: "MapPin", title: "Вся Россия", desc: "Работаем по городу, Московской области и выполняем межгородние перевозки." },
];

const REVIEWS = [
  { name: "Алексей М.", rating: 5, text: "Отличная компания! Переезжали из 3-комнатной квартиры. Всё сделали чётко, быстро, без повреждений. Рекомендую!", date: "15 марта 2025" },
  { name: "Ольга К.", rating: 5, text: "Заказывала газель для перевозки мебели. Ребята приехали вовремя, помогли разобрать шкаф и собрать на новом месте.", date: "2 февраля 2025" },
  { name: "Дмитрий Р.", rating: 5, text: "Использую эту компанию уже 3 года для доставки стройматериалов. Надёжные, пунктуальные. Цены адекватные.", date: "20 января 2025" },
  { name: "Марина В.", rating: 4, text: "Хорошая работа. Грузчики старательные, аккуратные. Немного опоздали, но предупредили заранее.", date: "10 декабря 2024" },
];

const STEPS = [
  { num: "01", title: "Оставьте заявку", desc: "Заполните форму или позвоните нам" },
  { num: "02", title: "Рассчитаем цену", desc: "Уточним детали и назовём стоимость" },
  { num: "03", title: "Подача машины", desc: "Газель приедет в удобное время" },
  { num: "04", title: "Готово!", desc: "Груз доставлен, оплата по факту" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-brand-orange text-lg" : "text-gray-700 text-lg"}>★</span>
      ))}
    </div>
  );
}

export default function Index() {
  useScrollAnimation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", from: "", to: "", date: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [calcData, setCalcData] = useState({ service: "gazelle", hours: 3, movers: 0, distance: 0 });

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
    <div className="min-h-screen bg-brand-dark font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={18} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-xl text-white tracking-wider">
              ГРУЗОВОЗ<span className="text-brand-orange">ПРО</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-medium uppercase tracking-wide">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+79001234567" className="hidden sm:flex items-center gap-2 text-brand-orange font-oswald font-semibold tracking-wide hover:text-[#FF8C38] transition-colors">
              <Icon name="Phone" size={16} />
              +7 (900) 123-45-67
            </a>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#1A1A1A] border-t border-white/5 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-brand-orange py-2 font-oswald uppercase tracking-wide border-b border-white/5">
                {l.label}
              </a>
            ))}
            <a href="tel:+79001234567" className="text-brand-orange font-oswald font-bold text-lg mt-2">
              +7 (900) 123-45-67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-grid">
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,107,0,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div style={{ animation: 'fade-in 0.7s ease-out forwards' }}>
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-brand-orange text-sm font-medium">Работаем 24/7 · Быстрая подача</span>
            </div>

            <h1 className="font-oswald font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 uppercase">
              Газели<br />
              <span className="text-gradient">и Грузчики</span><br />
              в Москве
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              Перевозки на газелях ГАЗ, профессиональные грузчики и разнорабочие. Подача за 40 минут. Работаем без выходных.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#order" className="btn-orange px-8 py-4 rounded-xl text-white font-oswald text-lg">
                Заказать перевозку
              </a>
              <a href="#calculator" className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-oswald text-lg hover:border-brand-orange hover:text-brand-orange transition-all">
                <Icon name="Calculator" size={20} />
                Рассчитать цену
              </a>
            </div>

            <div className="flex flex-wrap gap-8">
              {[{ num: "1 200+", label: "выполненных заказов" }, { num: "5 лет", label: "на рынке" }, { num: "40 мин", label: "подача машины" }].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-brand-orange">{s.num}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" style={{ animation: 'fade-in 0.7s ease-out 0.3s forwards', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/20 to-transparent rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-[#FF6B00]/20 shadow-2xl">
              <img src={TRUCK_IMAGE} alt="Газель ГрузовозПРО" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-[#1A1A1A] border border-[#FF6B00]/30 rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-xl flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-white font-oswald font-bold">Подача 40 мин</div>
                  <div className="text-gray-500 text-xs">Гарантируем</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#1A1A1A] border border-[#FF6B00]/30 rounded-2xl p-4 shadow-xl" style={{ animation: 'float 3s ease-in-out 1.5s infinite' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-green-400" />
                </div>
                <div>
                  <div className="text-white font-oswald font-bold">Страховка</div>
                  <div className="text-gray-500 text-xs">на весь груз</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 bg-[#1A1A1A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-4 animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="font-oswald text-4xl font-bold text-[#FF6B00]/30 leading-none">{step.num}</div>
                <div>
                  <div className="font-oswald font-bold text-white text-base uppercase">{step.title}</div>
                  <div className="text-gray-500 text-sm mt-1">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Наши Услуги</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Полный спектр транспортных услуг для частных лиц и бизнеса</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-dark rounded-2xl p-6 animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FF6B00]/15 rounded-xl flex items-center justify-center">
                    <Icon name={s.icon} size={24} className="text-brand-orange" fallback="Package" />
                  </div>
                  <span className="text-xs font-medium text-brand-orange bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3 py-1 rounded-full">{s.tag}</span>
                </div>
                <h3 className="font-oswald text-xl font-bold text-white uppercase mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-4 sm:px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Калькулятор Стоимости</h2>
            <p className="text-gray-400 text-lg">Рассчитайте примерную стоимость вашей перевозки</p>
          </div>

          <div className="bg-[#252525] border border-white/10 rounded-3xl p-8 animate-on-scroll">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block uppercase tracking-wide">Тип транспорта</label>
                  <div className="space-y-3">
                    {[
                      { val: "gazelle", label: "Газель Стандарт", price: "1 200 ₽/ч" },
                      { val: "gazelle-big", label: "Газель ГАЗ", price: "1 800 ₽/ч" },
                      { val: "none", label: "Только грузчики", price: "0 ₽" },
                    ].map((opt) => (
                      <button key={opt.val} onClick={() => setCalcData({ ...calcData, service: opt.val })}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                          calcData.service === opt.val
                            ? "border-brand-orange bg-[#FF6B00]/10 text-white"
                            : "border-white/10 text-gray-400 hover:border-white/30"
                        }`}>
                        <span className="font-medium">{opt.label}</span>
                        <span className={`text-sm font-oswald ${calcData.service === opt.val ? "text-brand-orange" : "text-gray-500"}`}>{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block uppercase tracking-wide">
                    Часы работы: <span className="text-brand-orange">{calcData.hours} ч</span>
                  </label>
                  <input type="range" min={1} max={12} value={calcData.hours}
                    onChange={(e) => setCalcData({ ...calcData, hours: +e.target.value })}
                    className="w-full accent-[#FF6B00]" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1 ч</span><span>12 ч</span></div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block uppercase tracking-wide">
                    Грузчики: <span className="text-brand-orange">{calcData.movers} чел.</span>
                  </label>
                  <input type="range" min={0} max={6} value={calcData.movers}
                    onChange={(e) => setCalcData({ ...calcData, movers: +e.target.value })}
                    className="w-full accent-[#FF6B00]" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1"><span>0</span><span>6 чел</span></div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block uppercase tracking-wide">
                    Пробег за МКАД: <span className="text-brand-orange">{calcData.distance} км</span>
                  </label>
                  <input type="range" min={0} max={200} step={5} value={calcData.distance}
                    onChange={(e) => setCalcData({ ...calcData, distance: +e.target.value })}
                    className="w-full accent-[#FF6B00]" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1"><span>В городе</span><span>200 км</span></div>
                </div>

                <div className="bg-[#0D0D0D] border border-[#FF6B00]/30 rounded-2xl p-6 text-center">
                  <div className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Примерная стоимость</div>
                  <div className="font-oswald text-4xl font-bold text-gradient">{calcPrice().toLocaleString("ru-RU")} ₽</div>
                  <div className="text-gray-500 text-xs mt-2">Точная цена — после уточнения деталей</div>
                  <a href="#order" className="btn-orange mt-4 inline-block px-6 py-3 rounded-xl text-white text-sm">
                    Заказать за эту цену
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Тарифы</h2>
            <p className="text-gray-400 text-lg">Честные цены без скрытых платежей</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PRICES.map((p, i) => (
              <div key={i} className={`relative rounded-3xl p-8 animate-on-scroll border transition-all ${
                p.popular
                  ? "bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/5 border-[#FF6B00]/50 shadow-[0_0_40px_rgba(255,107,0,0.2)]"
                  : "card-dark"
              }`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-sm font-oswald font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                    Популярный
                  </div>
                )}
                <h3 className="font-oswald text-2xl font-bold text-white uppercase mb-2">{p.name}</h3>
                <div className="font-oswald text-3xl font-bold text-gradient mb-6">{p.price}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#order" className={`block text-center py-3 px-6 rounded-xl font-oswald font-bold uppercase tracking-wide transition-all ${
                  p.popular ? "btn-orange text-white" : "border border-white/20 text-white hover:border-brand-orange hover:text-brand-orange"
                }`}>
                  Заказать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 px-4 sm:px-6 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Наши Преимущества</h2>
            <p className="text-gray-400 text-lg">Почему клиенты выбирают ГрузовозПРО</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="card-dark rounded-2xl p-6 flex gap-5 animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-[#FF6B00]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={a.icon} size={24} className="text-brand-orange" fallback="Star" />
                </div>
                <div>
                  <h3 className="font-oswald font-bold text-white text-lg uppercase mb-1">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Отзывы Клиентов</h2>
            <p className="text-gray-400 text-lg">Более 1200 выполненных заказов</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-dark rounded-2xl p-6 animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <StarRating rating={r.rating} />
                <p className="text-gray-300 text-sm leading-relaxed mt-3 mb-4">"{r.text}"</p>
                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <span className="font-oswald font-bold text-white">{r.name}</span>
                  <span className="text-gray-600 text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-24 px-4 sm:px-6 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Оставить Заявку</h2>
            <p className="text-gray-400 text-lg">Перезвоним в течение 5 минут</p>
          </div>

          {formSent ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-green-400" />
              </div>
              <h3 className="font-oswald text-3xl font-bold text-white mb-3 uppercase">Заявка принята!</h3>
              <p className="text-gray-400 text-lg">Наш менеджер свяжется с вами в течение 5 минут.</p>
              <button onClick={() => setFormSent(false)} className="mt-6 text-brand-orange hover:underline text-sm">
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="card-dark rounded-3xl p-8 space-y-5 animate-on-scroll">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Ваше имя *</label>
                  <input type="text" required placeholder="Иван Иванов" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-orange focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Телефон *</label>
                  <input type="tel" required placeholder="+7 (___) ___-__-__" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-orange focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Откуда</label>
                  <input type="text" placeholder="Адрес забора" value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-orange focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Куда</label>
                  <input type="text" placeholder="Адрес доставки" value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-orange focus:outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Дата и время</label>
                <input type="datetime-local" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-orange focus:outline-none transition-colors"
                  style={{ colorScheme: 'dark' }} />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wide mb-2 block">Комментарий</label>
                <textarea rows={3} placeholder="Опишите что нужно перевезти, этаж, наличие лифта..." value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-orange focus:outline-none transition-colors resize-none" />
              </div>

              <button type="submit" className="btn-orange w-full py-4 rounded-xl text-white font-oswald text-lg">
                Отправить заявку
              </button>
              <p className="text-gray-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="divider-orange mx-auto mb-4" />
            <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">Контакты</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (900) 123-45-67", sub: "Звонки 24/7", href: "tel:+79001234567" },
              { icon: "MessageCircle", title: "WhatsApp", value: "Написать в WhatsApp", sub: "Быстрый ответ", href: "https://wa.me/79001234567" },
              { icon: "MapPin", title: "Район работы", value: "Москва и МО", sub: "Межгород по договору", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="card-dark rounded-2xl p-6 flex gap-5 animate-on-scroll group" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-[#FF6B00]/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B00]/30 transition-colors">
                  <Icon name={c.icon} size={24} className="text-brand-orange" fallback="Phone" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">{c.title}</div>
                  <div className="font-oswald font-bold text-white text-lg">{c.value}</div>
                  <div className="text-gray-500 text-sm">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] border-t border-white/5 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-orange rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg text-white tracking-wider">
              ГРУЗОВОЗ<span className="text-brand-orange">ПРО</span>
            </span>
          </div>
          <div className="text-gray-600 text-sm text-center">
            © 2025 ГрузовозПРО. Грузоперевозки на газели, грузчики и разнорабочие в Москве.
          </div>
          <a href="tel:+79001234567" className="font-oswald font-bold text-brand-orange hover:text-[#FF8C38] transition-colors">
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>

      {/* STICKY CALL BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="tel:+79001234567" className="btn-orange animate-pulse-glow flex items-center gap-2 px-5 py-3 rounded-full text-white font-oswald font-bold shadow-2xl">
          <Icon name="Phone" size={18} />
          Позвонить
        </a>
      </div>
    </div>
  );
}
