export async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Error al conectar con la API');
    return await response.json();
}