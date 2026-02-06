document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlitter();
    initAuth();
    initPackages();
    initContact();
});

// --- NAVIGATION ---
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === target) s.classList.add('active');
            });
        });
    });
}

// --- GLITTER EFFECT ---
function initGlitter() {
    const container = document.getElementById('glitter-container');
    const colors = ['#d4af37', '#f9e27d', '#aa8a2e', '#ffffff'];

    setInterval(() => {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        glitter.style.width = `${size}px`;
        glitter.style.height = `${size}px`;
        glitter.style.left = `${left}%`;
        glitter.style.top = `${top}%`;
        glitter.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        glitter.style.animationDelay = `${Math.random() * 1.5}s`;

        container.appendChild(glitter);

        setTimeout(() => {
            glitter.remove();
        }, 1500);
    }, 100);
}

// --- AUTHENTICATION ---
let currentUser = JSON.parse(localStorage.getItem('travelVipUser')) || null;

function initAuth() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = authModal.querySelector('.close-modal');
    const loginContainer = document.getElementById('login-form-container');
    const registerContainer = document.getElementById('register-form-container');
    const toRegister = document.getElementById('to-register');
    const toLogin = document.getElementById('to-login');

    const updateAuthUI = () => {
        const profile = document.getElementById('user-profile');
        const usernameDisp = document.getElementById('username-display');

        if (currentUser) {
            loginBtn.classList.add('hidden');
            registerBtn.classList.add('hidden');
            profile.classList.remove('hidden');
            usernameDisp.textContent = `שלום, ${currentUser.name}`;
            usernameDisp.classList.add('gold-text');
        } else {
            loginBtn.classList.remove('hidden');
            registerBtn.classList.remove('hidden');
            profile.classList.add('hidden');
        }
    };

    updateAuthUI();

    loginBtn.onclick = () => {
        authModal.classList.remove('hidden');
        setTimeout(() => authModal.classList.add('visible'), 10);
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    };

    registerBtn.onclick = () => {
        authModal.classList.remove('hidden');
        setTimeout(() => authModal.classList.add('visible'), 10);
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    };

    const closeModalFunc = (modal) => {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 400); // Wait for transition
    };

    closeModal.onclick = () => closeModalFunc(authModal);

    toRegister.onclick = (e) => {
        e.preventDefault();
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    };

    toLogin.onclick = (e) => {
        e.preventDefault();
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    };

    // Registration Logic
    document.getElementById('register-form').onsubmit = (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input');
        const newUser = {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            isPremium: false
        };

        let users = JSON.parse(localStorage.getItem('allTravelVipUsers')) || [];
        if (users.find(u => u.email === newUser.email)) {
            alert('משתמש עם אימייל זה כבר קיים');
            return;
        }

        users.push(newUser);
        localStorage.setItem('allTravelVipUsers', JSON.stringify(users));
        currentUser = newUser;
        localStorage.setItem('travelVipUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeModalFunc(authModal);
        alert('נרשמת בהצלחה!');
    };

    // Login Logic
    document.getElementById('login-form').onsubmit = (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input');
        const email = inputs[0].value;
        const password = inputs[1].value;

        let users = JSON.parse(localStorage.getItem('allTravelVipUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = user;
            localStorage.setItem('travelVipUser', JSON.stringify(currentUser));
            updateAuthUI();
            closeModalFunc(authModal);
        } else {
            alert('אימייל או סיסמה שגויים');
        }
    };

    document.getElementById('logout-btn').onclick = () => {
        currentUser = null;
        localStorage.removeItem('travelVipUser');
        updateAuthUI();
        location.reload(); // Refresh to reset state cleanly
    };
}

// --- PACKAGES ---
const packages = [
    {
        id: 1,
        title: "חבילת ירושלים המלכותית",
        description: "סיור VIP בעיר העתיקה כולל אירוח במלון קינג דיוויד ומדריך צמוד.",
        itinerary: "יום 1: העיר העתיקה והכותל. יום 2: טעימות בשוק מחנה יהודה. יום 3: ביקור ביד ושם ומוזיאון ישראל.",
        guide: "יוסי כהן - מומחה לארכיאולוגיה והיסטוריה ירושלמית",
        price: 2500,
        image: "https://media3.reshet.tv/image/upload/t_grid-item-large/v1716989059/uploads/2024/904077691.webp",
        type: "REGULAR"
    },
    {
        id: 2,
        title: "חבילת המדבר היוקרתית",
        description: "חווית גלאמפינג במצפה רמון, טיסה פרטית מעל המכתש וארוחת שף תחת הכוכבים.",
        itinerary: "יום 1: טיסת מסוק למצפה רמון. יום 2: טיול ג'יפים פרטי. יום 3: ספא במלון בראשית.",
        guide: "דנה לוי - מומחית לטיולי מדבר והרפתקאות יוקרה",
        price: 8500,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        type: "PREMIUM"
    },
    {
        id: 3,
        title: "תל אביב - החיים הטובים",
        description: "פנטהאוז על הים, שופינג עם סטייליסט אישי וסעודה במסעדות מישלן.",
        itinerary: "יום 1: סיור גלריות בנווה צדק. יום 2: הפלגה ביאכטה פרטית. יום 3: סיבוב קולינרי בשוק לוינסקי.",
        guide: "רון אברהם - מוביל דעת קהל ומומחה ללייף סטייל תל אביבי",
        price: 5200,
        image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=1200&auto=format&fit=crop",
        type: "REGULAR"
    },
    {
        id: 4,
        title: "חבילת יאכטה אילת VIP",
        description: "הפלגה פרטית בים האדום, צלילה עם דולפינים ושירות באטלר אישי על הסיפון.",
        itinerary: "יום 1: קבלת פנים על היאכטה. יום 2: צלילה בריף הדולפינים. יום 3: ארוחת גורמה מול השקיעה.",
        guide: "עמית סלע - רב חובל ומומחה לצלילה ופעילות ימית",
        price: 12000,
        image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1200&auto=format&fit=crop",
        type: "PREMIUM"
    },
    {
        id: 5,
        title: "סיור יקבים ונופים בגליל",
        description: "חוויה קולינרית בגליל העליון: ביקור ביקבי בוטיק, סדנת גבינות ולינה בצימר מפואר.",
        itinerary: "יום 1: סיור בשלושה יקבי בוטיק. יום 2: סדנת גבינות בחוות בודדים. יום 3: טיול סוסים בשקיעה.",
        guide: "מיכל גולן - סומלייה ומומחית לקולינריה גלילית",
        price: 4500,
        image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop",
        type: "REGULAR"
    },
    {
        id: 6,
        title: "ים המלח - התחדשות מלכותית",
        description: "חופשת ספא יוקרתית הנמוך בעולם. כולל טיפולי בוץ פרטיים וגישה לחוף בלעדי.",
        itinerary: "יום 1: ציפה בים המלח בחוף פרטי. יום 2: יום ספא מלא במלון הרודס. יום 3: סיור זריחה במצדה.",
        guide: "יונתן רז - מומחה לאזור ים המלח ומדבר יהודה",
        price: 6800,
        image: "https://images.unsplash.com/photo-1551041777-ed07fa68f804?q=80&w=1200&auto=format&fit=crop",
        type: "PREMIUM"
    },
    {
        id: 7,
        title: "קיסריה - היסטוריה על המים",
        description: "סיור בנמל העתיק, משחק גולף במועדון האקסקלוסיבי וארוחת ערב מול העתיקות.",
        itinerary: "יום 1: סיור מודרך בנמל ובתיאטרון. יום 2: בוקר גולף בקיסריה. יום 3: גלריות אמנים בעיר העתיקה.",
        guide: "שרה לוי - ארכיאולוגית ומדריכה מוסמכת",
        price: 3900,
        image: "https://images.unsplash.com/photo-1627471017300-85f09908d0e5?q=80&w=1200&auto=format&fit=crop",
        type: "REGULAR"
    },
    {
        id: 8,
        title: "חיפה - בין הר לים",
        description: "סיור בגנים הבהאיים, אירוח במלונות בוטיק במושבה הגרמנית ותצפית פנורמית מהכרמל.",
        itinerary: "יום 1: סיור VIP בגנים הבהאיים. יום 2: סיור קולינרי בוואדי ניסנאס. יום 3: תצפית סטלה מאריס ורכבל.",
        guide: "אילן שפירא - מורה דרך מומחה להיסטוריה חיפאית",
        price: 3200,
        image: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?q=80&w=1200&auto=format&fit=crop",
        type: "REGULAR"
    }
];

function initPackages() {
    renderPackages();

    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const people = document.getElementById('people-count').value;

        if (!startDate || !endDate) {
            alert('אנא בחר תאריכי יציאה וחזרה');
            return;
        }

        // Simulating filtering based on dates (all packages are "available" in this demo if dates are selected)
        renderPackages(true);
    });
}

function renderPackages(filtered = false) {
    const grid = document.getElementById('packages-grid');
    grid.innerHTML = '';

    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = `package-card ${pkg.type === 'PREMIUM' ? 'package-premium' : ''}`;

        card.innerHTML = `
            <div class="package-image">
                <img src="${pkg.image}" alt="${pkg.title}" 
                     onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop'">
            </div>
            <div class="package-content">
                ${pkg.type === 'PREMIUM' ? '<span class="premium-badge">PREMIUM EXCLUSIVE</span>' : ''}
                <h3 class="gold-text">${pkg.title}</h3>
                <p>${pkg.description}</p>
                <p class="price">מחיר: ₪${pkg.price.toLocaleString()}</p>
                <button class="btn-gold" onclick="openBooking(${pkg.id})">הזמן עכשיו</button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (filtered) {
        const msg = document.createElement('div');
        msg.style.cssText = "grid-column: 1/-1; text-align: center; color: var(--gold); font-weight: bold; margin-bottom: 20px;";
        msg.textContent = "מציג חבילות זמינות לתאריכים שנבחרו:";
        grid.prepend(msg);
    }
}

function openBooking(id) {
    const pkg = packages.find(p => p.id === id);
    const modal = document.getElementById('booking-modal');
    const title = document.getElementById('booking-title');
    const details = document.getElementById('booking-details');
    const tripInfo = document.getElementById('trip-info');
    const tripDesc = document.getElementById('trip-description');
    const guideInfo = document.getElementById('guide-info');
    const paymentWarning = document.getElementById('payment-warning');
    const paymentPrompt = document.getElementById('payment-prompt');
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const people = document.getElementById('people-count').value;

    if (!currentUser) {
        alert('אנא התחבר כדי להזמין טיול');
        document.getElementById('login-btn').click();
        return;
    }

    title.textContent = pkg.title;
    details.innerHTML = `
        <p><strong>תאריכים:</strong> ${startDate || 'לא נבחר'} עד ${endDate || 'לא נבחר'}</p>
        <p><strong>כמות אנשים:</strong> ${people}</p>
        <p><strong>סה"כ לתשלום:</strong> <span class="gold-text">₪${(pkg.price * people).toLocaleString()}</span></p>
    `;

    tripInfo.classList.remove('hidden');
    tripDesc.textContent = pkg.itinerary;
    guideInfo.textContent = pkg.guide;

    if (pkg.type === 'PREMIUM') {
        paymentWarning.classList.remove('hidden');
        paymentPrompt.classList.remove('hidden');
    } else {
        paymentWarning.classList.add('hidden');
        paymentPrompt.classList.remove('hidden'); // Show payment for regular too as requested "system tahlum"
    }

    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);

    modal.querySelector('.close-modal').onclick = () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 400);
    };
}

function confirmBooking() {
    alert('הזמנתך התקבלה בהצלחה! ניצור איתך קשר בהקדם.');
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 400);
}

// --- CONTACT FORM ---
function initContact() {
    const form = document.getElementById('contact-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, textarea');
        const data = {
            name: inputs[0].value,
            email: inputs[1].value,
            message: inputs[2].value
        };

        console.log('Contact form submitted:', data);
        alert('תודה, הפרטים התקבלו. נחזור אליך בהקדם!');
        form.reset();
    };

    // Legal Modals Triggers
    const privacyBtn = document.querySelector('.legal-link:nth-child(1)');
    const termsBtn = document.querySelector('.legal-link:nth-child(2)');
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');

    const openLegal = (modal) => {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('visible'), 10);
    };

    const closeLegal = (modal) => {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 400);
    };

    privacyBtn.onclick = (e) => {
        e.preventDefault();
        openLegal(privacyModal);
    };

    termsBtn.onclick = (e) => {
        e.preventDefault();
        openLegal(termsModal);
    };

    [privacyModal, termsModal].forEach(modal => {
        modal.querySelector('.close-modal').onclick = () => closeLegal(modal);
    });
}


