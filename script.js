// Global Variables
let currentMonth = 2; // March (0-indexed)
let currentYear = 2025;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    setupNavigation();
    setupAnimations();
    setupProductFilters();
    setupCalendar();
    setupCounters();
    setupFormValidation();
    setupScrollEffects();
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Animation Setup
function setupAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('aos-animate');
        });
    }, observerOptions);
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// Product Filter Setup
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// Calendar Setup
function setupCalendar() {
    if (document.getElementById('calendar-days')) {
        updateCalendarHeader();
        generateCalendar(currentMonth, currentYear);
    }
}

function updateCalendarHeader() {
    const monthNames = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];
    const calendarHeader = document.querySelector('.calendar-header h2');
    if (calendarHeader) {
        calendarHeader.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
}

function generateCalendar(month, year) {
    const calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) return;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const eventDates = [10,15,20,25,30];
    
    calendarDays.innerHTML = '';
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        if (eventDates.includes(day)) {
            dayElement.classList.add('event');
            dayElement.addEventListener('click', () => showEventDetails(`event-${day}`));
        }
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        calendarDays.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    else if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    updateCalendarHeader();
    generateCalendar(currentMonth, currentYear);
}

// Event Details
function showEventDetails(eventId) {
    const eventDetails = {
        'spring-launch': { title: 'Spring Collection 2025 Launch', date: 'March 15, 2025', time: '7:00 PM - 10:00 PM', location: 'Grand Palais, Paris', description: 'Join us for the exclusive launch of our Spring 2025 Collection. Experience an evening of haute couture, featuring our latest designs that blend timeless elegance with contemporary innovation.', tickets: 'Invitation Only' },
        'vip-preview': { title: 'Exclusive VIP Preview',     date: 'March 10, 2025', time: '6:00 PM - 9:00 PM',  location: 'Élégance Noir Flagship Store', description: 'An intimate preview for our most valued clients with personal styling and champagne reception.', tickets: 'VIP Members Only' },
        'fashion-week': { title: 'Fashion Week Paris',        date: 'April 2-8, 2025', time: 'Various Times',      location: 'Various Venues, Paris',    description: 'Showcasing our latest haute couture at Paris Fashion Week.', tickets: 'Industry Professionals' },
        'design-workshop': { title: 'Fashion Design Workshop', date: 'March 20, 2025', time: '2:00 PM - 6:00 PM',  location: 'Élégance Noir Atelier',     description: 'Hands-on workshop covering sketching, fabric selection, and construction basics.', tickets: 'Registration Required' },
        'charity-gala': { title: 'Charity Fashion Gala',       date: 'March 25, 2025', time: '7:30 PM - 11:00 PM', location: 'Hotel Plaza Athénée',      description: 'An elegant evening supporting sustainable fashion initiatives.', tickets: 'Tickets Available' },
        'trunk-show': { title: 'Private Trunk Show',          date: 'March 30, 2025', time: '11:00 AM - 4:00 PM',  location: 'Private Showroom',         description: 'Discover our complete collection in an intimate setting.', tickets: 'By Appointment' },
        'event-10': { title: 'Exclusive VIP Preview',         date: 'March 10, 2025', time: '6:00 PM - 9:00 PM',  location: 'Élégance Noir Flagship Store', description: 'VIP preview of Spring Collection.', tickets: 'VIP Members Only' },
        'event-15': { title: 'Spring Collection Launch',      date: 'March 15, 2025', time: '7:00 PM - 10:00 PM', location: 'Grand Palais, Paris',        description: 'Official launch event.', tickets: 'Invitation Only' },
        'event-20': { title: 'Fashion Design Workshop',       date: 'March 20, 2025', time: '2:00 PM - 6:00 PM',  location: 'Élégance Noir Atelier',     description: 'Hands-on design workshop.', tickets: 'Registration Required' },
        'event-25': { title: 'Charity Fashion Gala',         date: 'March 25, 2025', time: '7:30 PM - 11:00 PM', location: 'Hotel Plaza Athénée',      description: 'Sustainable fashion gala.', tickets: 'Tickets Available' },
        'event-30': { title: 'Private Trunk Show',           date: 'March 30, 2025', time: '11:00 AM - 4:00 PM',  location: 'Private Showroom',         description: 'Exclusive trunk show.', tickets: 'By Appointment' }
    };
    const event = eventDetails[eventId];
    if (event) {
        showNotification(`${event.title}\n\n📅 ${event.date}\n🕒 ${event.time}\n📍 ${event.location}\n\n${event.description}\n\n🎫 ${event.tickets}`, 'info');
    } else {
        showNotification('Event details coming soon!', 'info');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const existing = document.querySelectorAll('.notification'); existing.forEach(n => n.remove());
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `position:fixed;top:20px;right:20px;background:${type==='success'?'#144e2cff':type==='error'?'#862f25ff':'#1a1a1a'};color:#fff;padding:1rem 2rem;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10000;white-space:pre-line;animation:slideIn 0.3s ease;`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.animation='slideOut 0.3s ease'; setTimeout(()=>notification.remove(),300); }, 5000);
    notification.addEventListener('click', () => { notification.style.animation='slideOut 0.3s ease'; setTimeout(()=>notification.remove(),300); });
}

// Counter Animation
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target/100;
        let current = 0;
        const update = () => {
            current < target ? (current+=increment, counter.textContent=Math.ceil(current), setTimeout(update,20))
                              : counter.textContent=target;
        };
        update();
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); } });
    }, { threshold:0.5 });
    counters.forEach(c => observer.observe(c));
}

// Form Validation
function setupFormValidation() {
    document.querySelectorAll('.contact-form').forEach(form => {
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearErrors);
        });
        form.addEventListener('submit', form.classList.contains('newsletter-form') ? subscribeNewsletter : submitInquiry);
    });
}
function validateField({target:field}) {
    const value=field.value.trim(); field.classList.remove('error');
    if (field.required && !value) return showFieldError(field,'This field is required');
    if (field.type==='email' && value) {
        const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Phone number regex
        if (!re.test(value)) return showFieldError(field,'Please enter a valid email address');
    }
    if (field.type==='tel' && value) {
        const re=/^[\+]?[1-9][\d]{0,15}$/;
        if (!re.test(value.replace(/\s/g,''))) return showFieldError(field,'Please enter a valid phone number');
    }
}
function showFieldError(field,msg) {
    field.classList.add('error');
    const err=field.parentNode.querySelector('.error-message'); if (err) err.remove();
    const div=document.createElement('div'); div.className='error-message'; div.textContent=msg;
    div.style.cssText='color:#e74c3c;font-size:.8rem;margin-top:.25rem';
    field.parentNode.appendChild(div);
}
function clearErrors({target:field}) {
    field.classList.remove('error');
    const err=field.parentNode.querySelector('.error-message'); if (err) err.remove();
}

function submitInquiry(e) {
    e.preventDefault(); let valid=true;
    e.target.querySelectorAll('input,select,textarea').forEach(input=>{ if (input.required && !input.value.trim()) valid=false; });
    if (valid) { showNotification('Thank you for your inquiry! We will get back to you within 24 hours.','success'); e.target.reset(); }
    else showNotification('Please correct the errors in the form.','error');
}
function subscribeNewsletter(e) {
    e.preventDefault(); const email=e.target.querySelector('input[type="email"]').value;
    if (email) { showNotification('Thank you for subscribing to our newsletter!','success'); e.target.reset(); }
}

// Scroll Effects
function setupScrollEffects() {
    let last=0; const nav=document.querySelector('.navbar');
    window.addEventListener('scroll',()=>{
        const st=window.pageYOffset||document.documentElement.scrollTop;
        nav.style.transform=st>last&&st>100?'translateY(-100%)':'translateY(0)'; last=st;
    });
}

// Timeline Animation
function animateTimeline() {
    const items=document.querySelectorAll('.timeline-item');
    const obs=new IntersectionObserver((entries)=>{
        entries.forEach((entry,i)=>{
            if(entry.isIntersecting) setTimeout(()=>{
                entry.target.style.opacity='1';
                entry.target.style.transform='translateX(0)';
            }, i*200);
        });
    },{threshold:0.5});
    items.forEach(item=>{
        item.style.opacity='0';
        item.style.transform='translateX(-50px)';
        item.style.transition='all 0.6s ease';
        obs.observe(item);
    });
}

document.addEventListener('DOMContentLoaded',()=>setTimeout(animateTimeline,500));

// Expose for navigation buttons
window.changeMonth = changeMonth;

// CSS Animations
const style=document.createElement('style');
style.textContent=`@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}.navbar{transition:transform .3s ease}.form-group input.error,.form-group select.error,.form-group textarea.error{border-color:#e74c3c;box-shadow:0 0 5px rgba(231,76,60,.3)}.product-card{transition:all .3s ease}`;
document.head.appendChild(style);
