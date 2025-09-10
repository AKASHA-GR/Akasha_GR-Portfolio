// Modern JavaScript for enhanced interactivity
document.addEventListener('DOMContentLoaded', function () {
	// Loading animation
	const loading = document.getElementById('loading');
	setTimeout(() => {
		loading.classList.add('hidden');
	}, 1200);

	// Intersection Observer for scroll animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate');
			}
		});
	}, observerOptions);

	// Observe all sections
	document.querySelectorAll('.section').forEach(section => {
		observer.observe(section);
	});

	// Smooth scroll for navigation
	document.querySelectorAll('nav a').forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Dynamic navigation highlight
	window.addEventListener('scroll', () => {
		const sections = document.querySelectorAll('.section');
		const navLinks = document.querySelectorAll('nav a');

		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 140;
			if (window.pageYOffset >= sectionTop) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach(link => {
			const href = link.getAttribute('href');
			if (href === `#${current}`) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	});

	// Initialize highlight on load
	window.dispatchEvent(new Event('scroll'));

	// Theme: initial load from system or saved preference
	const root = document.documentElement;
	const themeToggle = document.getElementById('themeToggle');
	const savedTheme = localStorage.getItem('theme');
	const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		const isDark = theme === 'dark';
		themeToggle.setAttribute('aria-pressed', String(isDark));
		themeToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
	}
	applyTheme(initialTheme);
	themeToggle.addEventListener('click', () => {
		const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		applyTheme(current);
		localStorage.setItem('theme', current);
	});

	// EmailJS setup (replace with your EmailJS public key, service ID, and template ID)
	if (window.emailjs) {
		emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });
		const form = document.getElementById('contactForm');
		const submitBtn = document.getElementById('contactSubmit');
		const statusEl = document.getElementById('formStatus');

		function setStatus(message, isError = false) {
			statusEl.textContent = message;
			statusEl.style.color = isError ? '#fecaca' : '#e0e7ff';
		}

		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const message = document.getElementById('message').value.trim();

			if (!name || !email || !message) {
				setStatus('Please complete all fields.', true);
				return;
			}

			const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
			if (!emailOk) {
				setStatus('Please enter a valid email address.', true);
				return;
			}

			submitBtn.disabled = true;
			submitBtn.textContent = 'Sending...';
			setStatus('');

			try {
				const serviceID = 'YOUR_SERVICE_ID';
				const templateID = 'YOUR_TEMPLATE_ID';
				await emailjs.send(serviceID, templateID, {
					from_name: name,
					reply_to: email,
					message: message
				});
				setStatus('Thank you! Your message has been sent.');
				form.reset();
			} catch (err) {
				setStatus('Sorry, failed to send. Please try again later.', true);
			} finally {
				submitBtn.disabled = false;
				submitBtn.textContent = 'Send';
			}
		});
	}

	// Simple modal logic
	function openModal(modal) {
		if (!modal) return;
		modal.classList.add('open');
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	}

	function closeModal(modal) {
		if (!modal) return;
		modal.classList.remove('open');
		modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	}

	document.querySelectorAll('[data-modal-target]').forEach(btn => {
		btn.addEventListener('click', () => {
			const target = btn.getAttribute('data-modal-target');
			const modal = document.querySelector(target);
			openModal(modal);
		});
	});

	document.querySelectorAll('[data-modal-close]').forEach(btn => {
		btn.addEventListener('click', () => {
			closeModal(btn.closest('.modal'));
		});
	});

	document.querySelectorAll('.modal').forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (e.target.classList.contains('modal-overlay')) {
				closeModal(modal);
			}
		});
		modal.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeModal(modal);
		});
	});
});


