
// تفعيل قائمة الموبايل
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// إغلاق القائمة عند النقر على الروابط
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navMenu.classList.remove('active');
    if (navToggle) {
      navToggle.classList.remove('active');
    }
  });
});

// تأثير الشريط عند التمرير
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// تأثير ظهور العناصر عند التمرير
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// إضافة تأثير للعناصر
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.glass-card, .project-item, .contact-item, .skill-item');
  
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // أنميشن العنوان الرئيسي
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }
});

// تأثير الماوس على البطاقات
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// بيانات المشاريع
const projectsData = {
  1: {
    title: 'تصميم لوجو احترافي',
    category: 'تصميم لوجوهات',
    tools: 'Adobe Illustrator, Photoshop',
    description: 'تصميم لوجو مميز واحترافي يعبر عن هوية البراند بشكل فريد. استخدمت أحدث تقنيات التصميم عشان أعمل لوجو بسيط وقوي وسهل يتحفظ.',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/0099ff?text=Logo+Main',
      'https://via.placeholder.com/400x300/1a1a1a/00ccff?text=Logo+Variation+1',
      'https://via.placeholder.com/400x300/1a1a1a/0099ff?text=Logo+Variation+2',
      'https://via.placeholder.com/400x300/1a1a1a/00ccff?text=Logo+Mockup'
    ]
  },
  2: {
    title: 'هوية بصرية متكاملة',
    category: 'الهوية البصرية',
    tools: 'Adobe Illustrator, InDesign',
    description: 'عملت هوية بصرية متكاملة فيها اللوجو والكروت والأوراق الرسمية والمواد التسويقية. عملت نظام بصري متناسق يعكس قيم البراند.',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/00ccff?text=Brand+Identity',
      'https://via.placeholder.com/400x300/1a1a1a/0099ff?text=Business+Cards',
      'https://via.placeholder.com/400x300/1a1a1a/00ccff?text=Letterhead',
      'https://via.placeholder.com/400x300/1a1a1a/0099ff?text=Stationery'
    ]
  },
  3: {
    title: 'تصميم بوستر إعلاني',
    category: 'تصميم المطبوعات',
    tools: 'Photoshop, Illustrator',
    description: 'بوستر إعلاني جذاب ومؤثر يستهدف الجمهور المطلوب بأسلوب إبداعي. ركزت على الألوان والخطوط عشان أجذب الانتباه وأوصل الرسالة بفعالية.',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/0099ff?text=Poster+Design',
      'https://via.placeholder.com/400x300/1a1a1a/00ccff?text=Close+Up',
      'https://via.placeholder.com/400x300/1a1a1a/0099ff?text=Mockup+1',
      'https://via.placeholder.com/400x300/1a1a1a/00ccff?text=Mockup+2'
    ]
  }
};

// فتح modal عند الضغط على مشروع
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close-modal');
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    const projectId = ((index % 3) + 1);
    const project = projectsData[projectId];
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalTools').textContent = project.tools;
    document.getElementById('modalDescription').textContent = project.description;
    
    const mainImage = document.getElementById('modalMainImage');
    mainImage.src = project.images[0];
    
    const thumbnails = document.getElementById('modalThumbnails');
    thumbnails.innerHTML = '';
    project.images.forEach((img, i) => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.alt = `صورة ${i + 1}`;
      thumb.addEventListener('click', function() {
        mainImage.src = img;
      });
      thumbnails.appendChild(thumb);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// إغلاق modal
closeBtn.addEventListener('click', function() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
