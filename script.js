// Smart Water Management - Shared Script

// Determine API base URL (can be overridden by setting window.API_BASE in HTML)
function getApiBase() {
  return (typeof window !== 'undefined' && window.API_BASE) ? window.API_BASE : 'http://localhost:5000';
}

// Highlight active nav link based on current page
(function highlightActiveNav() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  const links = document.querySelectorAll('nav li a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if ((file === '' && href.endsWith('index.html')) || file === href) {
      a.classList.add('active');
    }
    // Also consider root path mapping to index.html
    if ((file === '' || file === '/') && href.endsWith('index.html')) {
      a.classList.add('active');
    }
  });
})();

// Tanker Marketplace: handle Book Now buttons
(function tankerBooking() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-btn');
    if (!btn) return;
    e.preventDefault();
    alert('Tanker booked successfully!');
  });
})();

// Fetch and render consumption table
async function fetchAndRenderConsumptionTable() {
  const table = document.getElementById('consumption-table');
  if (!table) return; // Not on consumption page

  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  // Clear existing rows
  tbody.innerHTML = '';

  try {
    const resp = await fetch(`${getApiBase()}/api/consumption/user123`);
    if (!resp.ok) {
      console.error('Failed to fetch consumption logs:', resp.status);
      return;
    }
    const data = await resp.json();
    // Sort by date desc (newest first)
    const sorted = (Array.isArray(data) ? data : []).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 2;
      td.textContent = 'No consumption logs yet.';
      td.className = 'muted';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    for (const item of sorted) {
      const tr = document.createElement('tr');
      const dateCell = document.createElement('td');
      const litersCell = document.createElement('td');

      const d = new Date(item.date);
      // Format DD/MM/YYYY
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      dateCell.textContent = `${dd}/${mm}/${yyyy}`;

      litersCell.textContent = `${item.litersUsed} L`;

      tr.appendChild(dateCell);
      tr.appendChild(litersCell);
      tbody.appendChild(tr);
    }
  } catch (err) {
    console.error('Error fetching consumption logs:', err);
  }
}

// Consumption Tracking: handle form submission
(function consumptionForm() {
  const form = document.getElementById('consumption-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = form.querySelector('input[name="date"]').value;
    const litersVal = form.querySelector('input[name="liters"]').value;
    if (!date || !litersVal) {
      alert('Please enter both date and liters used.');
      return;
    }

    const liters = Number.parseFloat(litersVal);
    if (!Number.isFinite(liters) || liters < 0) {
      alert('Liters used must be a non-negative number.');
      return;
    }

    const payload = {
      date, // expects YYYY-MM-DD
      litersUsed: liters,
      userId: 'user123',
    };

    try {
      const resp = await fetch(`${getApiBase()}/api/consumption`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errBody = await resp.json().catch(() => ({}));
        const msg = errBody?.message || `Request failed with status ${resp.status}`;
        alert(`Failed to save reading: ${msg}`);
        return;
      }

      await resp.json();
      alert(`Reading saved!\nDate: ${date}\nLiters used: ${liters}`);
      form.reset();
      // Refresh table after successful save
      fetchAndRenderConsumptionTable();
    } catch (err) {
      console.error('Error submitting consumption reading:', err);
      alert('Unable to reach the server. Please ensure the backend is running.');
    }
  });
})();

// On page load, render the table if present
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderConsumptionTable();
});

// Login: handle placeholder submission (no backend integration yet)
(function loginHandler() {
  const form = document.getElementById('login-form');
  if (!form) return;
  const pwdInput = form.querySelector('#password');
  const showPwd = form.querySelector('#show-password');

  if (showPwd && pwdInput) {
    showPwd.addEventListener('change', () => {
      pwdInput.type = showPwd.checked ? 'text' : 'password';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idInput = form.querySelector('#identifier');
    const identifier = (idInput?.value || '').trim();
    const password = (pwdInput?.value || '').trim();

    if (!identifier || !password) {
      alert('Please fill in all fields');
      return;
    }

    alert(`Logged in as ${identifier}`);
    form.reset();
  });
})();
