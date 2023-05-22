export const MSG_CONNECTION_SUCCES = "Conexión exitosa a la bd";
export const MSG_CONNECTION_FAILED = "Error al conectarse a la bd";
export const MSG_RUN_ON_PORT = "Aplicación ejecutandose en el puerto";

export const MSG_USER_CREATED = "Usuario registrado";
export const MSG_USER_ALL = "Obteniendo los usuarios";

export const MSG_ERR_SERV = (error: any) =>
	error.message ? error.message : "¡Error, contacte al administrador!";

export const MSG_VALIDATION_MDW_NAME = "El nombre es requerido";
export const MSG_VALIDATION_MDW_EMAIL = "El correo es requerido";
export const MSG_VALIDATION_MDW_PASSWORD = "La contraseña es requerida";
export const MSG_VALIDATION_MDW_EXIST_EMAIL = "Ingresa otro correo";
