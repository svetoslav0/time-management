export function capitalizeAndFormat(string: string) {
    switch (string) {
        case 'username':
            return 'Username';
        case 'lastName':
            return 'Last Name';
        case 'firstName':
            return 'First Name';
        case 'password':
            return 'Password';
        case 'rePassword':
            return 'Repeat Password';
        default:
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}
