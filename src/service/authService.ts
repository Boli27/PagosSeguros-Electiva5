// Simulación de base de datos local
let users: any[] = [];

export const registerUser = (name: string, email: string, password: string) => {
  const exists = users.find(u => u.email === email);

  if (exists) {
    return { ok: false, message: "El correo ya está registrado" };
  }

  if (email.trim().length < 4) {
    return { ok: false, message: "El correo debe tener al menos 4 caracteres" };
  }

  if (name.trim().length < 4) {
    return { ok: false, message: "El nombre debe tener al menos 4 caracteres" };
  }

  if (password.trim().length < 6) {
    return { ok: false, message: "la contraseña debe tener al menos 6 caracteres" };
  }
  const newUser = { id: Date.now(), name, email , password };
  users.push(newUser);

  return { ok: true, message: "Usuario registrado", user: newUser , usuarios: users};
};

export const loginUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email.toLowerCase() && u.password === password);

  if (!user) {
    return { ok: false, message: "Correo o contraseña incorrectos" };
  }

  return { ok: true, message: "Inicio de sesión exitoso", user };
};
