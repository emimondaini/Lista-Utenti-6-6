// Funzione per recuperare gli utenti dall'API
const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  };
  
  // Funzione per mostrare gli utenti nella tabella
  const displayUsers = (users) => {
    const usersTableBody = document.getElementById('users-table-body');
    usersTableBody.innerHTML = ''; // Svuota la tabella
  
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>${user.company.name}</td>
      `;
      usersTableBody.appendChild(row);
    });
  };
  
  // Funzione per filtrare gli utenti
  const filterUsers = (users, filterOption, searchText) => {
    return users.filter(user => {
      return user[filterOption].toLowerCase().includes(searchText.toLowerCase());
    });
  };
  
  // Funzione di inizializzazione
  const init = async () => {
    let users = await fetchUsers();
    displayUsers(users);
  
    const filterOption = document.getElementById('filter-option');
    const searchInput = document.getElementById('search-input');
  
    searchInput.addEventListener('input', () => {
      const filteredUsers = filterUsers(users, filterOption.value, searchInput.value);
      displayUsers(filteredUsers);
    });
  
    filterOption.addEventListener('change', () => {
      const filteredUsers = filterUsers(users, filterOption.value, searchInput.value);
      displayUsers(filteredUsers);
    });
  };
  
  document.addEventListener('DOMContentLoaded', init);
  