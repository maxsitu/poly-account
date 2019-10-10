import User from '../../entity/User';

const rootValue = {
    user() {
        return new User(
            'user-0',
            'username0',
            'user0@email.com',
            '001-002-0003',
            'User',
            null,
            'Zero',
        );
    },
    users() {
        return [
            new User(
                'user-0',
                'username0',
                'user0@email.com',
                '001-002-0003',
                'User0',
                null,
                'Zero',
            ),
            new User(
                'user-1',
                'username1',
                'user1@email.com',
                '001-002-0004',
                'User1',
                null,
                'One',
            ),
        ];
    },
    createUser(): User {
        return new User(
            'user-0',
            'username0',
            'user0@email.com',
            '001-002-0003',
            'User',
            null,
            'Zero',
        );
    },
};

export {
    rootValue as default,
};
