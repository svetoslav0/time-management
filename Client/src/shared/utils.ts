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
        case 'projectName':
            return 'Project Name'
        case 'pricePerHour':
            return 'Price Per Hour'
        default:
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}
