// بيانات وهمية للحلاقين
const barbers = [
    {
        id: 1,
        name: "أحمد محمود",
        phone: "01012345678",
        photo: "images/barber1.jpg",
        rating: 4.8,
        location: "وسط البلد",
        services: ["قص شعر", "حلاقة", "تهذيب اللحية"],
        available: true,
        lat: 30.0444,
        lng: 31.2357
    },
    {
        id: 2,
        name: "محمد علي",
        phone: "01087654321",
        photo: "images/barber2.jpg",
        rating: 4.5,
        location: "المعادي",
        services: ["قص شعر", "صبغة"],
        available: true,
        lat: 29.9668,
        lng: 31.2501
    },
    {
        id: 3,
        name: "خالد حسن",
        phone: "01055556666",
        photo: "images/barber3.jpg",
        rating: 4.9,
        location: "مدينة نصر",
        services: ["قص شعر", "حلاقة", "مساج"],
        available: false,
        lat: 30.0500,
        lng: 31.3300
    }
];

// بيانات وهمية للعملاء في الانتظار
let waitingClients = [
    {
        id: 101,
        name: "عمر سعيد",
        phone: "01011112222",
        service: "قص شعر",
        time: "10:30 ص",
        status: "waiting"
    },
    {
        id: 102,
        name: "محمود عبدالله",
        phone: "01022223333",
        service: "حلاقة",
        time: "11:00 ص",
        status: "waiting"
    }
];

// متغيرات DOM
const clientLoginBtn = document.getElementById('clientLogin');
const barberLoginBtn = document.getElementById('barberLogin');
const loginModal = document.getElementById('loginModal');
const modalTitle = document.getElementById('modalTitle');
const loginForm = document.getElementById('loginForm');
const phoneInput = document.getElementById('phone');
const otpGroup = document.getElementById('otpGroup');
const photoGroup = document.getElementById('photoGroup');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.querySelector('.close');
const locationSearch = document.getElementById('locationSearch');
const findBarbersBtn = document.getElementById('findBarbers');
const barbersListSection = document.getElementById('barbersList');
const barbersGrid = document.getElementById('barbersGrid');

// حالات التطبيق
let isBarberLogin = false;
let currentUser = null;
let selectedBarber = null;

// مصفوفة لتخزين كود التحقق
const otpCodes = {};

// تهيئة خرائط جوجل
let map;
let service;
let autocomplete;

function initMap() {
    // إنشاء عنصر الخريطة
    const mapElement = document.createElement('div');
    mapElement.id = 'map';
    mapElement.style.height = '300px';
    mapElement.style.marginTop = '20px';
    document.querySelector('.hero').appendChild(mapElement);
    
    // تحديد موقع القاهرة كموقع افتراضي
    const cairo = { lat: 30.0444, lng: 31.2357 };
    map = new google.maps.Map(mapElement, {
        center: cairo,
        zoom: 12
    });
    
    // إضافة علامات للحلاقين
    barbers.forEach(barber => {
        if (barber.available) {
            new google.maps.Marker({
                position: { lat: barber.lat, lng: barber.lng },
                map: map,
                title: barber.name
            });
        }
    });
    
    // تهيئة خدمة الأماكن
    service = new google.maps.places.PlacesService(map);
    
    // تهيئة الإكمال التلقائي
    autocomplete = new google.maps.places.Autocomplete(locationSearch);
}

// عرض الحلاقين
function displayBarbers() {
    barbersGrid.innerHTML = '';
    
    barbers.forEach(barber => {
        if (barber.available) {
            const barberCard = document.createElement('div');
            barberCard.className = 'barber-card';
            
            // صورة الحلاق
            const barberImg = document.createElement('div');
            barberImg.className = 'barber-img';
            barberImg.style.backgroundImage = `url(${barber.photo})`;
            
            // معلومات الحلاق
            const barberInfo = document.createElement('div');
            barberInfo.className = 'barber-info';
            
            const barberName = document.createElement('h3');
            barberName.className = 'barber-name';
            barberName.textContent = barber.name;
            
            const barberRating = document.createElement('div');
            barberRating.className = 'barber-rating';
            barberRating.innerHTML = `${barber.rating} <i class="fas fa-star"></i>`;
            
            const barberLocation = document.createElement('div');
            barberLocation.className = 'barber-location';
            barberLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${barber.location}`;
            
            const servicesList = document.createElement('div');
            servicesList.className = 'services-list';
            servicesList.textContent = `الخدمات: ${barber.services.join('، ')}`;
            
            const bookBtn = document.createElement('button');
            bookBtn.className = 'book-btn';
            bookBtn.textContent = 'احجز الآن';
            bookBtn.addEventListener('click', () => {
                selectedBarber = barber;
                startBookingProcess();
            });
            
            barberInfo.appendChild(barberName);
            barberInfo.appendChild(barberRating);
            barberInfo.appendChild(barberLocation);
            barberInfo.appendChild(servicesList);
            barberInfo.appendChild(bookBtn);
            
            barberCard.appendChild(barberImg);
            barberCard.appendChild(barberInfo);
            
            barbersGrid.appendChild(barberCard);
        }
    });
    
    barbersListSection.style.display = 'block';
}

// بدء عملية الحجز
function startBookingProcess() {
    // هنا يمكنك إضافة منطق الحجز
    alert(`تم اختيار الحلاق ${selectedBarber.name}. سيتم تحويلك لصفحة الحجز.`);
    
    // في تطبيق حقيقي، هنا سننقل المستخدم لصفحة الحجز
    // window.location.href = `booking.html?barber=${selectedBarber.id}`;
}

// تسجيل الدخول للعميل
clientLoginBtn.addEventListener('click', () => {
    isBarberLogin = false;
    modalTitle.textContent = 'دخول العميل';
    photoGroup.style.display = 'none';
    loginModal.style.display = 'block';
});

// تسجيل الدخول للحلاق
barberLoginBtn.addEventListener('click', () => {
    isBarberLogin = true;
    modalTitle.textContent = 'دخول الحلاق';
    photoGroup.style.display = 'block';
    loginModal.style.display = 'block';
});

// إغلاق المودال
closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// عند النقر خارج المودال
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// معالجة تسجيل الدخول
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const phone = phoneInput.value;
    
    if (!otpGroup.style.display || otpGroup.style.display === 'none') {
        // إرسال كود التحقق (في تطبيق حقيقي، نرسله عبر SMS)
        const otp = Math.floor(1000 + Math.random() * 9000);
        otpCodes[phone] = otp.toString();
        
        alert(`تم إرسال كود التحقق إلى ${phone}. الكود هو: ${otp}`);
        
        otpGroup.style.display = 'block';
        loginBtn.textContent = 'تأكيد';
    } else {
        // التحقق من كود التحقق
        const otp = document.getElementById('otp').value;
        
        if (otp === otpCodes[phone]) {
            alert('تم تسجيل الدخول بنجاح!');
            loginModal.style.display = 'none';
            
            // حفظ بيانات المستخدم
            currentUser = {
                phone,
                isBarber: isBarberLogin,
                photo: isBarberLogin ? document.getElementById('photo').files[0] : null
            };
            
            // إذا كان حلاقاً، نعرض لوحة التحكم
            if (isBarberLogin) {
                showBarberDashboard();
            }
        } else {
            alert('كود التحقق غير صحيح!');
        }
    }
});

// البحث عن الحلاقين
findBarbersBtn.addEventListener('click', () => {
    if (locationSearch.value) {
        displayBarbers();
    } else {
        alert('الرجاء إدخال موقع للبحث');
    }
});

// عرض لوحة تحكم الحلاق
function showBarberDashboard() {
    document.querySelector('main').style.display = 'none';
    
    const dashboard = document.createElement('div');
    dashboard.className = 'barber-dashboard container';
    dashboard.innerHTML = `
        <h2>مرحباً ${currentUser.phone}</h2>
        
        <div class="waiting-list">
            <h3>قائمة الانتظار</h3>
            <div id="clientsList"></div>
        </div>
    `;
    
    document.body.appendChild(dashboard);
    dashboard.style.display = 'block';
    
    updateWaitingList();
}

// تحديث قائمة الانتظار للحلاق
function updateWaitingList() {
    const clientsList = document.getElementById('clientsList');
    if (!clientsList) return;
    
    clientsList.innerHTML = '';
    
    waitingClients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        
        const clientInfo = document.createElement('div');
        clientInfo.className = 'client-info';
        
        const clientName = document.createElement('h4');
        clientName.textContent = client.name;
        
        const clientService = document.createElement('p');
        clientService.textContent = `الخدمة: ${client.service} - ${client.time}`;
        
        clientInfo.appendChild(clientName);
        clientInfo.appendChild(clientService);
        
        const clientActions = document.createElement('div');
        clientActions.className = 'client-actions';
        
        const startBtn = document.createElement('button');
        startBtn.textContent = 'بدء الخدمة';
        startBtn.addEventListener('click', () => {
            client.status = 'in-progress';
            updateWaitingList();
        });
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'إنهاء';
        completeBtn.addEventListener('click', () => {
            waitingClients = waitingClients.filter(c => c.id !== client.id);
            updateWaitingList();
        });
        
        clientActions.appendChild(startBtn);
        clientActions.appendChild(completeBtn);
        
        clientCard.appendChild(clientInfo);
        clientCard.appendChild(clientActions);
        
        clientsList.appendChild(clientCard);
    });
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // في تطبيق حقيقي، نتحقق إذا كان المستخدم مسجلاً دخولاً
    initMap();
});