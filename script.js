document.addEventListener('DOMContentLoaded', () => {
    const getUsersBtn = document.getElementById('getUsersBtn');
    const userGrid = document.getElementById('userGrid');
    const pagination = document.getElementById('pagination');
  
    const itemsPerPage = 6;
    let currentPage = 1;
  
    const fetchUsers = async (page) => {
      try {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await response.json();
        displayUsers(data.data);
        displayPagination(data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const displayUsers = (users) => {
      userGrid.innerHTML = '';
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
          <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
          <p>${user.first_name} ${user.last_name}</p>
          <p>Email: ${user.email}</p>
        `;
        userGrid.appendChild(userCard);
      });
    };
  
    const displayPagination = (totalPages) => {
      pagination.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = currentPage === i ? 'active' : '';
        button.addEventListener('click', () => {
          currentPage = i;
          fetchUsers(currentPage);
        });
        pagination.appendChild(button);
      }
    };
  
    getUsersBtn.addEventListener('click', () => {
      fetchUsers(currentPage);
    });
  });
  