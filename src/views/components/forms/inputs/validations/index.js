export const whitespacesValidation = value => !!value.trim() || 'No se permiten espacios en blanco';
export const aCharacterValidation = value => value.length > 0 || 'No se permiten espacios en blanco';
export const maskInputEmptyValidation = value => (/^[_-]+$/.test(value) ? 'Campo obligatorio' : true);

export const emailRegexPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const phoneRegexPattern = /^[0-9]{8}$/;

export const dniRegexPattern = /^[0-9]{9}$/;
