import { VALIDATION } from './constants';

export const validateEmail = (email: string): string | null => {
    if (!email) {
        return 'Email обязателен';
    }
    if (!VALIDATION.EMAIL_REGEX.test(email)) {
        return 'Некорректный email';
    }
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) {
        return 'Пароль обязателен';
    }
    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        return `Пароль должен содержать минимум ${VALIDATION.PASSWORD_MIN_LENGTH} символов`;
    }
    return null;
};

export const validateName = (name: string): string | null => {
    if (!name) {
        return 'Имя обязательно';
    }
    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
        return `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`;
    }
    return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) {
        return 'Подтверждение пароля обязательно';
    }
    if (password !== confirmPassword) {
        return 'Пароли не совпадают';
    }
    return null;
};

export const validateLoginForm = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateRegisterForm = (name: string, email: string, password: string, confirmPassword: string) => {
    const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    
    const nameError = validateName(name);
    if (nameError) errors.name = nameError;
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
