// Admin Dashboard JavaScript with Dummy Data

// Authentication
const AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'tecnospark2024'
};

// Generate dummy data if none exists
function generateDummyData() {
    const existingData = localStorage.getItem('tecnoSparkRegistrations');
    
    // Only generate if no data exists
    if (!existingData || JSON.parse(existingData).length === 0) {
        const colleges = [
            'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
            'NIT Trichy', 'NIT Warangal', 'BITS Pilani', 'VIT Vellore', 'SRM University',
            'Delhi University', 'Anna University', 'Manipal University', 'Amity University',
            'Jadavpur University', 'NSIT Delhi', 'DTU Delhi', 'IIIT Hyderabad',
            'PES University', 'RV College of Engineering'
        ];
        
        const departments = [
            'Computer Science', 'Information Technology', 'Electronics', 'Electrical',
            'Mechanical', 'Civil', 'Software Engineering', 'Data Science', 'AI & ML',
            'Cyber Security'
        ];
        
        const firstNames = [
            'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Pranav', 'Krishna',
            'Shaurya', 'Ayan', 'Ishaan', 'Ananya', 'Pari', 'Aanya', 'Avni', 'Diya',
            'Ishita', 'Prisha', 'Kavya', 'Sara', 'Rahul', 'Rohan', 'Amit', 'Priya',
            'Sneha', 'Divya', 'Neha', 'Riya', 'Aryan', 'Dev'
        ];
        
        const lastNames = [
            'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Reddy', 'Rao', 'Gupta',
            'Jain', 'Agarwal', 'Mehta', 'Nair', 'Pillai', 'Pandey', 'Mishra',
            'Chatterjee', 'Roy', 'Das', 'Bose', 'Ghosh'
        ];
        
        const dummyRegistrations = [];
        const currentDate = new Date();
        
        // Generate 150 dummy registrations
        for (let i = 0; i < 150; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const fullName = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@gmail.com`;
            const phone = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
            
            const college = colleges[Math.floor(Math.random() * colleges.length)];
            const year = Math.floor(Math.random() * 4) + 1;
            const department = departments[Math.floor(Math.random() * departments.length)];
            
            // Random events selection (1-3 events)
            const eventOptions = ['debugger-die', 'crack-me', 'code-me'];
            const numEvents = Math.floor(Math.random() * 3) + 1;
            const events = [];
            const selectedIndices = new Set();
            
            while (selectedIndices.size < numEvents) {
                selectedIndices.add(Math.floor(Math.random() * 3));
            }
            
            selectedIndices.forEach(index => {
                events.push(eventOptions[index]);
            });
            
            const paymentMethods = ['upi', 'card', 'netbanking', 'wallet'];
            const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
            
            // Generate registration date within last 30 days
            const daysAgo = Math.floor(Math.random() * 30);
            const regDate = new Date(currentDate);
            regDate.setDate(regDate.getDate() - daysAgo);
            regDate.setHours(Math.floor(Math.random() * 24));
            regDate.setMinutes(Math.floor(Math.random() * 60));
            
            const registration = {
                registrationId: `TS2024${String(10000 + i).padStart(5, '0')}`,
                fullName: fullName,
                email: email,
                phone: phone,
                college: college,
                year: year.toString(),
                department: department,
                events: events,
                paymentMethod: paymentMethod,
                totalAmount: events.length * 200,
                timestamp: regDate.toISOString()
            };
            
            dummyRegistrations.push(registration);
        }
        
        // Sort by timestamp (most recent first)
        dummyRegistrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Save to localStorage
        localStorage.setItem('tecnoSparkRegistrations', JSON.stringify(dummyRegistrations));
        
        console.log('🎯 Generated 150 dummy registrations');
        return dummyRegistrations;
    }
    
    return JSON.parse(existingData);
}

// Check authentication
function checkAuth() {
    // Generate dummy data first
    generateDummyData();
    
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
        showLoginScreen();
    } else {
        showDashboard();
        loadDashboardData();
    }
}

// Login functionality
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginBtn = e.target.querySelector('.login-btn');
    
    // Show loading
    loginBtn.classList.add('loading');
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check credentials
    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminUser', username);
        
        // Fade out login screen
        const loginContainer = document.getElementById('loginContainer');
        loginContainer.style.opacity = '0';
        
        setTimeout(() => {
            showDashboard();
            loadDashboardData();
            showSampleNotifications();
        }, 500);
    } else {
        loginBtn.classList.remove('loading');
        showNotification('Invalid credentials! Please try again.', 'error');
        
        // Shake animation
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
});

// Show/Hide screens
function showLoginScreen() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
}

// Logout functionality
function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminUser');
    location.reload();
}

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.dataset.section + 'Section';
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            
            // Update page title
            updatePageTitle(item.querySelector('span').textContent);
            
            // Load section specific data
            if (sectionId === 'paymentsSection') {
                updatePaymentTransactions();
            }
        }
    });
});

function updatePageTitle(title) {
    document.getElementById('pageTitle').textContent = title + ' Overview';
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar on mobile when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Load Dashboard Data
async function loadDashboardData() {
    // Get registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    
    // Update stats
    updateDashboardStats(registrations);
    
    // Update charts
    updateCharts(registrations);
    
    // Update activity timeline
    updateActivityTimeline(registrations);
    
    // Update registrations table
    updateRegistrationsTable(registrations);
    
    // Update event stats
    updateEventStats(registrations);
    
    // Update analytics
    updateAnalytics(registrations);
    
    // Update payment transactions
    updatePaymentTransactions();
    
    // Create mini chart
    setTimeout(createMiniChart, 500);
    
    // Populate filters
    populateCollegeFilter(registrations);
}

// Update Dashboard Stats
function updateDashboardStats(registrations) {
    // Total registrations
    document.getElementById('totalRegistrations').textContent = registrations.length;
    document.getElementById('regCount').textContent = registrations.length;
    
    // Total revenue
    const totalRevenue = registrations.reduce((sum, reg) => sum + (reg.totalAmount || 0), 0);
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString();
    
    // Total colleges
    const colleges = [...new Set(registrations.map(reg => reg.college))];
    document.getElementById('totalColleges').textContent = colleges.length;
    
    // Top colleges
    const collegeCount = {};
    registrations.forEach(reg => {
        collegeCount[reg.college] = (collegeCount[reg.college] || 0) + 1;
    });
    
    const topColleges = Object.entries(collegeCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([college, count]) => `${college} (${count})`)
        .join('<br>');
    
    document.getElementById('topColleges').innerHTML = topColleges || 'No data yet';
}

// Charts
let registrationChart, eventChart, collegeChart, revenueChart, yearChart;

function updateCharts(registrations) {
    // Registration trend chart
    const ctx1 = document.getElementById('registrationChart').getContext('2d');
    if (registrationChart) registrationChart.destroy();
    
    const last7Days = getLast7DaysData(registrations);
    
    registrationChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: last7Days.labels,
            datasets: [{
                label: 'Registrations',
                data: last7Days.data,
                borderColor: '#00F5FF',
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#00F5FF',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#B8B8B8'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#B8B8B8'
                    }
                }
            }
        }
    });

    // Event distribution chart
    const ctx2 = document.getElementById('eventChart').getContext('2d');
    if (eventChart) eventChart.destroy();
    
    const eventData = getEventDistribution(registrations);
    
    eventChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Debugger Die', 'Crack Me', 'Code Me'],
            datasets: [{
                data: eventData,
                backgroundColor: ['#FF3366', '#00FF88', '#3366FF'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#B8B8B8',
                        padding: 20
                    }
                }
            }
        }
    });
}

// Get last 7 days data
function getLast7DaysData(registrations) {
    const days = [];
    const counts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        days.push(date.toLocaleDateString('en', { weekday: 'short' }));
        
        const count = registrations.filter(reg => {
            const regDate = new Date(reg.timestamp).toISOString().split('T')[0];
            return regDate === dateStr;
        }).length;
        
        counts.push(count);
    }
    
    return { labels: days, data: counts };
}

// Get event distribution
function getEventDistribution(registrations) {
    const eventCounts = {
        'debugger-die': 0,
        'crack-me': 0,
        'code-me': 0
    };
    
    registrations.forEach(reg => {
        if (reg.events) {
            reg.events.forEach(event => {
                if (eventCounts.hasOwnProperty(event)) {
                    eventCounts[event]++;
                }
            });
        }
    });
    
    return Object.values(eventCounts);
}

// Update Activity Timeline
function updateActivityTimeline(registrations) {
    const timeline = document.getElementById('activityTimeline');
    timeline.innerHTML = '';
    
    // Get recent 5 registrations
    const recentRegs = registrations.slice(0, 5);
    
    recentRegs.forEach(reg => {
        const time = new Date(reg.timestamp).toLocaleString();
        const activityItem = `
            <div class="activity-item">
                <div class="activity-icon registration">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">New Registration</div>
                    <div class="activity-description">${reg.fullName} from ${reg.college}</div>
                </div>
                <div class="activity-time">${formatTimeAgo(new Date(reg.timestamp))}</div>
            </div>
        `;
        timeline.innerHTML += activityItem;
    });
    
    if (recentRegs.length === 0) {
        timeline.innerHTML = '<p style="text-align: center; color: #666;">No recent activity</p>';
    }
}

// Format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

// Update Registrations Table
let currentPage = 1;
const recordsPerPage = 10;
let filteredRegistrations = [];

function updateRegistrationsTable(registrations) {
    filteredRegistrations = registrations;
    displayRegistrations();
}

function displayRegistrations() {
    const tbody = document.getElementById('registrationsBody');
    tbody.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedRegs = filteredRegistrations.slice(startIndex, endIndex);
    
    // Display records
    paginatedRegs.forEach(reg => {
        const row = `
            <tr>
                <td>${reg.registrationId}</td>
                <td>${reg.fullName}</td>
                <td>${reg.email}</td>
                <td>${reg.phone || 'N/A'}</td>
                <td>${reg.college}</td>
                <td>${reg.year}</td>
                <td>${reg.department}</td>
                <td>
                    ${reg.events.map(event => {
                        const eventName = event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        const className = event.includes('debugger') ? 'debugger' : 
                                        event.includes('crack') ? 'crack' : 'code';
                        return `<span class="event-badge ${className}">${eventName}</span>`;
                    }).join(' ')}
                </td>
                <td>₹${reg.totalAmount}</td>
                <td>
                    <span class="payment-badge ${reg.paymentMethod}">
                        <i class="fas fa-${getPaymentIcon(reg.paymentMethod)}"></i>
                        ${reg.paymentMethod.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(reg.timestamp).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-icon" onclick="viewRegistration('${reg.registrationId}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-icon" onclick="editRegistration('${reg.registrationId}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-icon" onclick="deleteRegistration('${reg.registrationId}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update pagination info
    updatePagination();
}

function getPaymentIcon(method) {
    const icons = {
        'upi': 'mobile-alt',
        'card': 'credit-card',
        'netbanking': 'university',
        'wallet': 'wallet'
    };
    return icons[method] || 'money-bill';
}

function updatePagination() {
    const totalPages = Math.ceil(filteredRegistrations.length / recordsPerPage);
    
    // Update info
    document.getElementById('showingFrom').textContent = Math.min(((currentPage - 1) * recordsPerPage) + 1, filteredRegistrations.length);
    document.getElementById('showingTo').textContent = Math.min(currentPage * recordsPerPage, filteredRegistrations.length);
    document.getElementById('totalRecords').textContent = filteredRegistrations.length;
    
    // Update page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => goToPage(i);
            pageNumbers.appendChild(pageBtn);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.padding = '0 10px';
            pageNumbers.appendChild(dots);
        }
    }
    
    // Update prev/next buttons
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
}

function goToPage(page) {
    currentPage = page;
    displayRegistrations();
}

// Pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayRegistrations();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredRegistrations.length / recordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayRegistrations();
    }
});

// Search functionality
const regSearch = document.getElementById('regSearch');
regSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    
    filteredRegistrations = registrations.filter(reg => {
        return reg.fullName.toLowerCase().includes(searchTerm) ||
               reg.email.toLowerCase().includes(searchTerm) ||
               reg.college.toLowerCase().includes(searchTerm) ||
               reg.registrationId.toLowerCase().includes(searchTerm);
    });
    
    currentPage = 1;
    displayRegistrations();
});

// Filter functionality
const eventFilter = document.getElementById('eventFilter');
const collegeFilter = document.getElementById('collegeFilter');
const paymentFilter = document.getElementById('paymentFilter');

// Populate college filter
function populateCollegeFilter(registrations) {
    const colleges = [...new Set(registrations.map(reg => reg.college))];
    collegeFilter.innerHTML = '<option value="">All Colleges</option>';
    colleges.forEach(college => {
        collegeFilter.innerHTML += `<option value="${college}">${college}</option>`;
    });
}

// Apply filters
function applyFilters() {
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    
    filteredRegistrations = registrations.filter(reg => {
        const eventMatch = !eventFilter.value || reg.events.includes(eventFilter.value);
        const collegeMatch = !collegeFilter.value || reg.college === collegeFilter.value;
        const paymentMatch = !paymentFilter.value || reg.paymentMethod === paymentFilter.value;
        
        return eventMatch && collegeMatch && paymentMatch;
    });
    
    currentPage = 1;
    displayRegistrations();
}

eventFilter.addEventListener('change', applyFilters);
collegeFilter.addEventListener('change', applyFilters);
paymentFilter.addEventListener('change', applyFilters);

// View Registration Details
function viewRegistration(regId) {
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    const registration = registrations.find(reg => reg.registrationId === regId);
    
    if (registration) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="detail-group">
                <div class="detail-label">Registration ID</div>
                <div class="detail-value">${registration.registrationId}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${registration.fullName}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Email</div>
                <div class="detail-value">${registration.email}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Phone</div>
                <div class="detail-value">${registration.phone || 'N/A'}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">College</div>
                <div class="detail-value">${registration.college}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Year & Department</div>
                <div class="detail-value">${registration.year} Year - ${registration.department}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Events</div>
                <div class="detail-value">
                    ${registration.events.map(event => {
                        const eventName = event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return `<span class="event-badge ${event.includes('debugger') ? 'debugger' : event.includes('crack') ? 'crack' : 'code'}">${eventName}</span>`;
                    }).join(' ')}
                </div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Total Amount</div>
                <div class="detail-value" style="color: #00F5FF; font-size: 1.5rem;">₹${registration.totalAmount}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Payment Method</div>
                <div class="detail-value">${registration.paymentMethod.toUpperCase()}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Registration Date</div>
                <div class="detail-value">${new Date(registration.timestamp).toLocaleString()}</div>
            </div>
        `;
        
        document.getElementById('viewModal').classList.add('active');
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Edit Registration (placeholder)
function editRegistration(regId) {
    showNotification('Edit functionality coming soon!', 'info');
}

// Delete Registration
function deleteRegistration(regId) {
    if (confirm('Are you sure you want to delete this registration?')) {
        let registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
        registrations = registrations.filter(reg => reg.registrationId !== regId);
        localStorage.setItem('tecnoSparkRegistrations', JSON.stringify(registrations));
        
        showNotification('Registration deleted successfully', 'success');
        loadDashboardData();
    }
}

// Export functions
function exportToCSV() {
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    
    // CSV headers
    const headers = ['Registration ID', 'Name', 'Email', 'Phone', 'College', 'Year', 'Department', 'Events', 'Amount', 'Payment Method', 'Date'];
    
    // CSV data
    const csvData = registrations.map(reg => [
        reg.registrationId,
        reg.fullName,
        reg.email,
        reg.phone || 'N/A',
        reg.college,
        reg.year,
        reg.department,
        reg.events.join('; '),
        reg.totalAmount,
        reg.paymentMethod,
        new Date(reg.timestamp).toLocaleString()
    ]);
    
    // Create CSV string
    let csv = headers.join(',') + '\n';
    csvData.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TecnoSpark_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('CSV exported successfully', 'success');
}

function exportToPDF() {
    showNotification('PDF export coming soon!', 'info');
}

function printRegistrations() {
    window.print();
}

// Update Event Stats
function updateEventStats(registrations) {
    const eventCounts = {
        'debugger-die': 0,
        'crack-me': 0,
        'code-me': 0
    };
    
    registrations.forEach(reg => {
        if (reg.events) {
            reg.events.forEach(event => {
                if (eventCounts.hasOwnProperty(event)) {
                    eventCounts[event]++;
                }
            });
        }
    });
    
    // Update counts
    document.getElementById('debuggerCount').textContent = eventCounts['debugger-die'];
    document.getElementById('crackCount').textContent = eventCounts['crack-me'];
    document.getElementById('codeCount').textContent = eventCounts['code-me'];
    
    // Update revenues
    document.getElementById('debuggerRevenue').textContent = (eventCounts['debugger-die'] * 200).toLocaleString();
    document.getElementById('crackRevenue').textContent = (eventCounts['crack-me'] * 200).toLocaleString();
    document.getElementById('codeRevenue').textContent = (eventCounts['code-me'] * 200).toLocaleString();
}

// Update Analytics
function updateAnalytics(registrations) {
    // College chart
    const ctx3 = document.getElementById('collegeChart');
    if (ctx3) {
        const collegeCtx = ctx3.getContext('2d');
        if (collegeChart) collegeChart.destroy();
        
        const collegeData = getTopCollegesData(registrations);
        
        collegeChart = new Chart(collegeCtx, {
            type: 'bar',
            data: {
                labels: collegeData.labels.slice(0, 5),
                datasets: [{
                    label: 'Students',
                    data: collegeData.data.slice(0, 5),
                    backgroundColor: '#00F5FF',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#B8B8B8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#B8B8B8'
                        }
                    }
                }
            }
        });
    }
    
    // Payment methods
    updatePaymentStats(registrations);
    
    // Department distribution
    updateDepartmentList(registrations);
    
    // Revenue chart
    const ctx4 = document.getElementById('revenueChart');
    if (ctx4) {
        const revenueCtx = ctx4.getContext('2d');
        if (revenueChart) revenueChart.destroy();
        
        const revenueData = getDailyRevenueData(registrations);
        
        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: revenueData.labels,
                datasets: [{
                    label: 'Revenue (₹)',
                    data: revenueData.data,
                    borderColor: '#00FF88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#00FF88',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#B8B8B8',
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#B8B8B8'
                        }
                    }
                }
            }
        });
    }
    
    // Year-wise distribution
    const ctx5 = document.getElementById('yearChart');
    if (ctx5) {
        const yearCtx = ctx5.getContext('2d');
        if (yearChart) yearChart.destroy();
        
        const yearData = getYearWiseData(registrations);
        
        yearChart = new Chart(yearCtx, {
            type: 'pie',
            data: {
                labels: yearData.labels,
                datasets: [{
                    data: yearData.data,
                    backgroundColor: ['#FF3366', '#00FF88', '#3366FF', '#FFB800', '#7B2FFF'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#B8B8B8',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// Get top colleges data
function getTopCollegesData(registrations) {
    const collegeCount = {};
    registrations.forEach(reg => {
        collegeCount[reg.college] = (collegeCount[reg.college] || 0) + 1;
    });
    
    const sorted = Object.entries(collegeCount).sort((a, b) => b[1] - a[1]);
    
    return {
        labels: sorted.map(([college]) => college),
        data: sorted.map(([, count]) => count)
    };
}

// Update payment stats
function updatePaymentStats(registrations) {
    const paymentMethods = {};
    registrations.forEach(reg => {
        paymentMethods[reg.paymentMethod] = (paymentMethods[reg.paymentMethod] || 0) + 1;
    });
    
    const paymentStats = document.getElementById('paymentStats');
    if (paymentStats) {
        paymentStats.innerHTML = '';
        
        Object.entries(paymentMethods).forEach(([method, count]) => {
            const percentage = ((count / registrations.length) * 100).toFixed(1);
            paymentStats.innerHTML += `
                <div class="payment-stat-item">
                    <h4>${method.toUpperCase()}</h4>
                    <div class="value">${count}</div>
                    <div class="percentage">${percentage}%</div>
                </div>
            `;
        });
    }
}

// Update department list
function updateDepartmentList(registrations) {
    const deptCount = {};
    registrations.forEach(reg => {
        deptCount[reg.department] = (deptCount[reg.department] || 0) + 1;
    });
    
    const sortedDepts = Object.entries(deptCount).sort((a, b) => b[1] - a[1]);
    
    const deptList = document.getElementById('departmentList');
    if (deptList) {
        deptList.innerHTML = '';
        
        sortedDepts.forEach(([dept, count]) => {
            deptList.innerHTML += `
                <div class="department-item">
                    <span class="department-name">${dept}</span>
                    <span class="department-count">${count}</span>
                </div>
            `;
        });
    }
}

// Get daily revenue data
function getDailyRevenueData(registrations) {
    const revenueByDate = {};
    
    registrations.forEach(reg => {
        const date = new Date(reg.timestamp).toISOString().split('T')[0];
        revenueByDate[date] = (revenueByDate[date] || 0) + reg.totalAmount;
    });
    
    const sorted = Object.entries(revenueByDate).sort((a, b) => a[0].localeCompare(b[0]));
    
    return {
        labels: sorted.map(([date]) => new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' })),
        data: sorted.map(([, revenue]) => revenue)
    };
}

// Get year-wise data
function getYearWiseData(registrations) {
    const yearCount = {};
    registrations.forEach(reg => {
                const year = `${reg.year}${reg.year === '1' ? 'st' : reg.year === '2' ? 'nd' : reg.year === '3' ? 'rd' : 'th'} Year`;
        yearCount[year] = (yearCount[year] || 0) + 1;
    });
    
    return {
        labels: Object.keys(yearCount),
        data: Object.values(yearCount)
    };
}

// Generate dummy transactions
function generateDummyTransactions() {
    const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
    const transactions = [];
    
    registrations.forEach((reg, index) => {
        const status = Math.random() > 0.95 ? 'pending' : Math.random() > 0.02 ? 'completed' : 'refunded';
        
        const transaction = {
            transactionId: `TXN${Date.now()}${index}`,
            registrationId: reg.registrationId,
            name: reg.fullName,
            amount: reg.totalAmount,
            method: reg.paymentMethod,
            status: status,
            date: reg.timestamp
        };
        
        transactions.push(transaction);
    });
    
    return transactions;
}

// Update payment transactions
function updatePaymentTransactions() {
    const transactions = generateDummyTransactions();
    const tbody = document.getElementById('transactionsBody');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        // Show last 10 transactions
        transactions.slice(0, 10).forEach(txn => {
            const statusClass = txn.status === 'completed' ? 'success' : 
                              txn.status === 'pending' ? 'warning' : 'danger';
            
            const row = `
                <tr>
                    <td>${txn.transactionId}</td>
                    <td>${txn.registrationId}</td>
                    <td>${txn.name}</td>
                    <td>₹${txn.amount}</td>
                    <td>
                        <span class="payment-badge ${txn.method}">
                            <i class="fas fa-${getPaymentIcon(txn.method)}"></i>
                            ${txn.method.toUpperCase()}
                        </span>
                    </td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${txn.status.toUpperCase()}
                        </span>
                    </td>
                    <td>${new Date(txn.date).toLocaleDateString()}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-icon" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${txn.status === 'pending' ? 
                                '<button class="action-icon" title="Process"><i class="fas fa-check"></i></button>' : 
                                ''}
                        </div>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
        
        // Update payment summary
        const completed = transactions.filter(t => t.status === 'completed');
        const pending = transactions.filter(t => t.status === 'pending');
        const refunded = transactions.filter(t => t.status === 'refunded');
        
        const totalCollected = document.getElementById('totalCollected');
        const pendingAmount = document.getElementById('pendingAmount');
        const refundedAmount = document.getElementById('refundedAmount');
        
        if (totalCollected) totalCollected.textContent = completed.reduce((sum, t) => sum + t.amount, 0).toLocaleString();
        if (pendingAmount) pendingAmount.textContent = pending.reduce((sum, t) => sum + t.amount, 0).toLocaleString();
        if (refundedAmount) refundedAmount.textContent = refunded.reduce((sum, t) => sum + t.amount, 0).toLocaleString();
    }
}

// Create mini chart for stats card
function createMiniChart() {
    const ctx = document.getElementById('regMiniChart');
    if (ctx) {
        const miniCtx = ctx.getContext('2d');
        new Chart(miniCtx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }
}

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', () => {
    showNotification('Refreshing data...', 'info');
    
    // Add rotation animation
    const icon = document.querySelector('#refreshBtn i');
    icon.style.animation = 'spin 1s linear';
    
    setTimeout(() => {
        loadDashboardData();
        icon.style.animation = '';
        showNotification('Data refreshed successfully', 'success');
    }, 1000);
});

// Fullscreen toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Show sample notifications
function showSampleNotifications() {
    setTimeout(() => {
        showNotification('New registration from IIT Delhi!', 'info');
    }, 3000);
    
    setTimeout(() => {
        showNotification('Payment confirmed for TS202410145', 'success');
    }, 8000);
}

// Add notification and status badge styles
const additionalStyles = `
    .admin-notification {
        position: fixed;
        top: 20px;
        right: -400px;
        background: #1A1A1A;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transition: right 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .admin-notification.show {
        right: 20px;
    }
    
    .admin-notification.success {
        border-color: #00FF88;
    }
    
    .admin-notification.success i {
        color: #00FF88;
    }
    
    .admin-notification.error {
        border-color: #FF3366;
    }
    
    .admin-notification.error i {
        color: #FF3366;
    }
    
    .admin-notification.info {
        border-color: #00F5FF;
    }
    
    .admin-notification.info i {
        color: #00F5FF;
    }
    
    .admin-notification i {
        font-size: 1.2rem;
    }
    
    .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .status-badge.success {
        background: rgba(0, 255, 136, 0.2);
        color: #00FF88;
    }
    
    .status-badge.warning {
        background: rgba(255, 184, 0, 0.2);
        color: #FFB800;
    }
    
    .status-badge.danger {
        background: rgba(255, 51, 102, 0.2);
        color: #FF3366;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Global search functionality
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            // Search across all data
            const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
            const results = registrations.filter(reg => 
                reg.fullName.toLowerCase().includes(searchTerm) ||
                reg.email.toLowerCase().includes(searchTerm) ||
                reg.registrationId.toLowerCase().includes(searchTerm)
            );
            
            if (results.length > 0) {
                showNotification(`Found ${results.length} results for "${searchTerm}"`, 'info');
            }
        }
    });
}

// Chart filter functionality
document.querySelectorAll('.chart-filter').forEach(filter => {
    filter.addEventListener('change', function() {
        const period = this.value;
        showNotification(`Chart updated to show ${period}`, 'info');
        // In a real application, you would update the chart data here
    });
});

// Chart toggle buttons
document.querySelectorAll('.chart-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.chart-toggle').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const chartType = this.dataset.chart;
        showNotification(`Switching to ${chartType} chart`, 'info');
    });
});

// Settings functionality
document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const section = item.getAttribute('href').substring(1);
        showNotification(`Showing ${section} settings`, 'info');
    });
});

// Event management buttons
document.querySelectorAll('.management-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.querySelector('span').textContent;
        showNotification(`${action} feature coming soon!`, 'info');
    });
});

// Date range picker
const applyDateBtn = document.querySelector('.apply-date');
if (applyDateBtn) {
    applyDateBtn.addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (startDate && endDate) {
            showNotification(`Analytics updated for ${startDate} to ${endDate}`, 'success');
            // In a real application, you would filter data here
        }
    });
}

// Export functions for global use
window.viewRegistration = viewRegistration;
window.editRegistration = editRegistration;
window.deleteRegistration = deleteRegistration;
window.closeModal = closeModal;
window.logout = logout;
window.toggleFullscreen = toggleFullscreen;
window.exportToCSV = exportToCSV;
window.exportToPDF = exportToPDF;
window.printRegistrations = printRegistrations;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Initialize date range picker with default values
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0];
    
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) startDateInput.value = thirtyDaysAgo;
    if (endDateInput) endDateInput.value = today;
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearch') || document.getElementById('regSearch');
            if (searchInput) searchInput.focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Auto-refresh every 5 minutes
    setInterval(() => {
        if (sessionStorage.getItem('adminAuthenticated')) {
            loadDashboardData();
            showNotification('Data auto-refreshed', 'info');
        }
    }, 300000);
    
    console.log('🛡️ Tecno Spark Admin Dashboard Loaded');
    console.log('📊 Dashboard initialized with dummy data');
    console.log('🔐 Login credentials - Username: admin, Password: tecnospark2024');
});

// Performance monitoring
const performanceData = {
    loadTime: performance.now(),
    apiCalls: 0,
    chartRenders: 0
};

// Log performance metrics
window.addEventListener('load', () => {
    performanceData.totalLoadTime = performance.now() - performanceData.loadTime;
    console.log(`⚡ Dashboard loaded in ${performanceData.totalLoadTime.toFixed(2)}ms`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Dashboard Error:', e);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Session timeout warning
let sessionTimeout;
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        if (sessionStorage.getItem('adminAuthenticated')) {
            showNotification('Your session will expire in 5 minutes', 'warning');
            
            setTimeout(() => {
                logout();
                showNotification('Session expired. Please login again.', 'error');
            }, 300000);
        }
    }, 1500000); // 25 minutes
}

// Reset timeout on user activity
['click', 'mousemove', 'keypress'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout);
});

resetSessionTimeout();
