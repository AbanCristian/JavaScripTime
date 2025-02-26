document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const postForm = document.getElementById('post-form');
    const logoutBtn = document.getElementById('logout-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    const loginData = document.getElementById('login-container');
    const registerData = document.getElementById('register-container');
    const postData = document.getElementById('post-container');
    const postList = document.getElementById('post-list');

    // Usuario administrador por defecto
    const adminUser = { username: 'admin', password: 'admin123' };

    // Recuperar usuarios desde localStorage
    const getUsers = () => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.find(u => u.username === adminUser.username)) {
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
        return users;
    };
    
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

    // Mostrar contenedores
    const showPostContainer = () => {
        loginData.classList.add('d-none');
        registerData.classList.add('d-none');
        postData.classList.remove('d-none');
    };
    
    const showLoginContainer = () => {
        loginData.classList.remove('d-none');
        registerData.classList.add('d-none');
        postData.classList.add('d-none');
    };

    const showRegisterContainer = () => {
        loginData.classList.add('d-none');
        registerData.classList.remove('d-none');
        postData.classList.add('d-none');
    };
    
    if (localStorage.getItem('loggedIn')) {
        showPostContainer();
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        let users = getUsers();
        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedIn', username);
            showPostContainer();
        } else {
            alert('Credenciales incorrectas.');
        }

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();

        if (!newUsername || !newPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        let users = getUsers();
        if (users.find(u => u.username === newUsername)) {
            alert('El usuario ya existe.');
            return;
        }

        users.push({ username: newUsername, password: newPassword });
        saveUsers(users);
        alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
        showLoginContainer();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        showLoginContainer();
    });

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newPostText = document.getElementById('post-text').value;
        if (newPostText.trim() === "") return;

        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = newPostText;
        postList.prepend(item);

        document.getElementById('post-text').value = '';
    });

    showRegisterBtn.addEventListener('click', showRegisterContainer);
    showLoginBtn.addEventListener('click', showLoginContainer);
});
