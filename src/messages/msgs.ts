export const MSG_TOKEN_REQ = "El token es requerido";
export const MSG_TOKEN_INVALID = "El token no es valido";
export const MSG_CONNECTION_SUCCES = "Conexión exitosa a la bd";
export const MSG_CONNECTION_FAILED = "Error al conectarse a la bd";
export const MSG_RUN_ON_PORT = "Aplicación ejecutandose en el puerto";

export const MSG_GET_ALL = "Obteniendo los detalles";
export const MSG_CREATE = "Registro creado";
export const MSG_UPDATE = "Registro actualizado";
export const MSG_DELETE = "Registro eliminado";

export const MSG_USER_CREATED = "Usuario registrado";
export const MSG_USER_UPDATED = "Usuario actualizado";
export const MSG_USER_DELETED = "Usuario eliminado";
export const MSG_GET_USER = "Obteniendo detalles del usuario";
export const MSG_USER_ALL = "Obteniendo los usuarios";

export const MSG_ERR_SERV = (error: any) =>
	error.message ? error.message : "¡Error, contacte al administrador!";

export const MSG_ERR_UPDATE = (error: any) =>
	error.message ? error.message : "¡Error al actualizar!";

export const MSG_ERR_GET = (error: string) =>
	error ? error : "¡Error al actualizar!";

export const MSG_VALIDATION_ID_MONGO = "No es un mongoid valido";

export const MSG_VALIDATION_MDW_NAME = "El nombre es requerido";
export const MSG_VALIDATION_MDW_EMAIL = "El correo es requerido";
export const MSG_VALIDATION_MDW_PASSWORD = "La contraseña es requerida";
export const MSG_VALIDATION_MDW_EXIST_EMAIL = "Ingresa otro correo";
export const MSG_VALIDATION_MDW_ROLE = "El role es requerido";

export const MSG_NOT_EXIST_ENTITY = "El registro no existe";
export const MSG_NOT_PERMISSION = "Acción no permitida";

export const PFS_ID: string = "el identificador";
export const MSG_TXT_ERR: Function = (error: any): string =>
	error.message ? error.message : "¡Error, contacte al administrador!";

export const MSG_UPDATE_IMG = "¡Imagen cargada!";
export const MSG_NOT_VALID_FILE = "Este archivo no es valido para cargar";
export const MSG_NOT_FILES = "No se enviarón archivos.";
